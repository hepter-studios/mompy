"""Windows installer for Mompy.

This script is packaged with PyInstaller as a single setup executable. It embeds
the portable Mompy zip, extracts it into the current user's local programs
folder, creates shortcuts and registers a per-user uninstall entry.
"""

from __future__ import annotations

import argparse
import ctypes
import os
import shutil
import subprocess
import sys
import textwrap
import winreg
import zipfile
from pathlib import Path


APP_NAME = "Mompy"
APP_VERSION = "0.1.1"
PUBLISHER = "Hepter Studio"
REPO_URL = "https://github.com/hepter-studios/mompy"
SUPPORT_URL = "https://github.com/hepter-studios/mompy/issues"
PAYLOAD_NAME = "Mompy-windows-x64.zip"


def bundle_root() -> Path:
    if getattr(sys, "frozen", False) and hasattr(sys, "_MEIPASS"):
        return Path(sys._MEIPASS)
    return Path(__file__).resolve().parents[1]


def default_install_dir() -> Path:
    local_app_data = os.environ.get("LOCALAPPDATA") or str(Path.home() / "AppData" / "Local")
    return Path(local_app_data) / "Programs" / APP_NAME


def start_menu_dir() -> Path:
    app_data = os.environ.get("APPDATA") or str(Path.home() / "AppData" / "Roaming")
    return Path(app_data) / "Microsoft" / "Windows" / "Start Menu" / "Programs" / APP_NAME


def desktop_dir() -> Path:
    return Path(os.environ.get("USERPROFILE", str(Path.home()))) / "Desktop"


def payload_zip() -> Path:
    candidates = [
        bundle_root() / "payload" / PAYLOAD_NAME,
        bundle_root() / "dist" / PAYLOAD_NAME,
    ]
    for candidate in candidates:
        if candidate.exists():
            return candidate
    raise FileNotFoundError(f"Could not find installer payload: {PAYLOAD_NAME}")


def message(title: str, body: str, silent: bool = False) -> None:
    if silent:
        return
    ctypes.windll.user32.MessageBoxW(None, body, title, 0x40)


def fail(title: str, body: str, silent: bool = False) -> None:
    if not silent:
        ctypes.windll.user32.MessageBoxW(None, body, title, 0x10)
    raise SystemExit(1)


def run_powershell(script: str) -> None:
    completed = subprocess.run(
        [
            "powershell",
            "-NoProfile",
            "-ExecutionPolicy",
            "Bypass",
            "-Command",
            script,
        ],
        check=False,
        capture_output=True,
        text=True,
    )
    if completed.returncode != 0:
        raise RuntimeError(completed.stderr.strip() or completed.stdout.strip())


def ps_quote(value: Path | str) -> str:
    text = str(value)
    return "'" + text.replace("'", "''") + "'"


def create_shortcut(
    shortcut_path: Path,
    target_path: Path | str,
    working_dir: Path,
    icon_path: Path,
    arguments: str = "",
) -> None:
    shortcut_path.parent.mkdir(parents=True, exist_ok=True)
    script = f"""
    $shell = New-Object -ComObject WScript.Shell
    $shortcut = $shell.CreateShortcut({ps_quote(shortcut_path)})
    $shortcut.TargetPath = {ps_quote(target_path)}
    $shortcut.Arguments = {ps_quote(arguments)}
    $shortcut.WorkingDirectory = {ps_quote(working_dir)}
    $shortcut.IconLocation = {ps_quote(str(icon_path) + ',0')}
    $shortcut.Save()
    """
    run_powershell(script)


def write_uninstaller(install_dir: Path) -> Path:
    uninstall_script = install_dir / "uninstall_mompy.ps1"
    script = f"""
    $ErrorActionPreference = "SilentlyContinue"
    $installDir = {ps_quote(install_dir)}
    $startMenuDir = {ps_quote(start_menu_dir())}
    $desktopShortcut = {ps_quote(desktop_dir() / (APP_NAME + ".lnk"))}
    $uninstallKey = "HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Mompy"

    Remove-Item -LiteralPath $desktopShortcut -Force
    Remove-Item -LiteralPath $startMenuDir -Recurse -Force
    Remove-Item -LiteralPath $uninstallKey -Recurse -Force
    Remove-Item -LiteralPath $installDir -Recurse -Force
    """
    uninstall_script.write_text(textwrap.dedent(script).strip() + "\n", encoding="utf-8")
    return uninstall_script


def register_uninstall(install_dir: Path, exe_path: Path, uninstall_script: Path) -> None:
    key_path = r"Software\Microsoft\Windows\CurrentVersion\Uninstall\Mompy"
    uninstall_command = (
        f'powershell.exe -NoProfile -ExecutionPolicy Bypass -File "{uninstall_script}"'
    )
    with winreg.CreateKey(winreg.HKEY_CURRENT_USER, key_path) as key:
        winreg.SetValueEx(key, "DisplayName", 0, winreg.REG_SZ, APP_NAME)
        winreg.SetValueEx(key, "DisplayVersion", 0, winreg.REG_SZ, APP_VERSION)
        winreg.SetValueEx(key, "Publisher", 0, winreg.REG_SZ, PUBLISHER)
        winreg.SetValueEx(key, "InstallLocation", 0, winreg.REG_SZ, str(install_dir))
        winreg.SetValueEx(key, "DisplayIcon", 0, winreg.REG_SZ, str(exe_path))
        winreg.SetValueEx(key, "UninstallString", 0, winreg.REG_SZ, uninstall_command)
        winreg.SetValueEx(key, "QuietUninstallString", 0, winreg.REG_SZ, uninstall_command)
        winreg.SetValueEx(key, "URLInfoAbout", 0, winreg.REG_SZ, REPO_URL)
        winreg.SetValueEx(key, "HelpLink", 0, winreg.REG_SZ, SUPPORT_URL)
        winreg.SetValueEx(key, "NoModify", 0, winreg.REG_DWORD, 1)
        winreg.SetValueEx(key, "NoRepair", 0, winreg.REG_DWORD, 1)


def install(args: argparse.Namespace) -> int:
    install_dir = Path(args.install_dir).expanduser() if args.install_dir else default_install_dir()
    install_dir = install_dir.resolve()
    exe_path = install_dir / "Mompy.exe"

    try:
        source_zip = payload_zip()
        if install_dir.exists():
            shutil.rmtree(install_dir)
        install_dir.mkdir(parents=True, exist_ok=True)

        with zipfile.ZipFile(source_zip, "r") as archive:
            archive.extractall(install_dir)

        if not exe_path.exists():
            fail("Mompy Setup", f"Install failed: {exe_path} was not created.", args.silent)

        uninstall_script = write_uninstaller(install_dir)
        icon_path = exe_path

        create_shortcut(start_menu_dir() / f"{APP_NAME}.lnk", exe_path, install_dir, icon_path)
        create_shortcut(
            start_menu_dir() / f"Uninstall {APP_NAME}.lnk",
            "powershell.exe",
            install_dir,
            icon_path,
            f'-NoProfile -ExecutionPolicy Bypass -File "{uninstall_script}"',
        )

        if not args.no_desktop_shortcut:
            create_shortcut(desktop_dir() / f"{APP_NAME}.lnk", exe_path, install_dir, icon_path)

        register_uninstall(install_dir, exe_path, uninstall_script)
        (install_dir / "installed_version.txt").write_text(APP_VERSION + "\n", encoding="utf-8")

        if not args.no_launch:
            subprocess.Popen([str(exe_path)], cwd=str(install_dir))

        message(
            "Mompy Setup",
            f"Mompy {APP_VERSION} was installed successfully.\n\n{install_dir}",
            args.silent,
        )
        return 0
    except Exception as exc:  # pragma: no cover - installer guard
        fail("Mompy Setup", f"Install failed:\n\n{exc}", args.silent)
        return 1


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Install Mompy for the current Windows user.")
    parser.add_argument("--silent", action="store_true", help="Do not show message boxes.")
    parser.add_argument("--no-launch", action="store_true", help="Do not launch Mompy after installing.")
    parser.add_argument("--no-desktop-shortcut", action="store_true", help="Do not create a desktop shortcut.")
    parser.add_argument("--install-dir", help="Custom install directory.")
    return parser.parse_args()


if __name__ == "__main__":
    raise SystemExit(install(parse_args()))
