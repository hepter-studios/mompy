param(
  [switch]$SkipAppBuild
)

$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

$ProjectRoot = Split-Path -Parent $PSScriptRoot
$Python = if ($env:PYTHON) { $env:PYTHON } else { "python" }
$Version = "0.1.0"
$PayloadZip = Join-Path $ProjectRoot "dist\Mompy-windows-x64.zip"
$SetupName = "MompySetup-v$Version"
$SetupExe = Join-Path $ProjectRoot "dist\$SetupName.exe"
$IconPath = Join-Path $ProjectRoot "frontend\assets\mompy_idle.ico"
$SpecPath = Join-Path $ProjectRoot "$SetupName.spec"
$InstallerBuildPath = Join-Path $ProjectRoot "build\$SetupName"
$InstallerScript = Join-Path $ProjectRoot "installer\setup_windows.py"

Push-Location $ProjectRoot
try {
  & $Python -m PyInstaller --version | Out-Null

  if (-not $SkipAppBuild -or -not (Test-Path $PayloadZip)) {
    powershell -NoProfile -ExecutionPolicy Bypass -File (Join-Path $ProjectRoot "scripts\build_windows.ps1") -Zip
  }

  if (-not (Test-Path $PayloadZip)) {
    throw "Missing payload zip: $PayloadZip"
  }

  if (Test-Path $SetupExe) { Remove-Item -LiteralPath $SetupExe -Force }
  if (Test-Path $SpecPath) { Remove-Item -LiteralPath $SpecPath -Force }
  if (Test-Path $InstallerBuildPath) { Remove-Item -LiteralPath $InstallerBuildPath -Recurse -Force }

  $pyinstallerArgs = @(
    "--noconfirm",
    "--clean",
    "--onefile",
    "--windowed",
    "--name", $SetupName,
    "--icon", $IconPath,
    "--add-data", "dist\Mompy-windows-x64.zip;payload",
    $InstallerScript
  )

  & $Python -m PyInstaller @pyinstallerArgs

  if (-not (Test-Path $SetupExe)) {
    throw "Build finished, but installer was not found at $SetupExe"
  }

  Write-Host "Installer created: $SetupExe"
} finally {
  Pop-Location
}
