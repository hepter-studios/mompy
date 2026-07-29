param(
  [string]$Version = "0.1.2",
  [string]$InstallDirectory = (Join-Path $env:TEMP "Mompy-Installer-Smoke")
)

$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

$ProjectRoot = Split-Path -Parent $PSScriptRoot
$SetupExe = Join-Path $ProjectRoot "dist\MompySetup-v$Version.exe"
$InstalledExe = Join-Path $InstallDirectory "Mompy.exe"
$Uninstaller = Join-Path $InstallDirectory "unins000.exe"

if (-not (Test-Path -LiteralPath $SetupExe)) {
  throw "Installer not found: $SetupExe"
}

$resolvedInstallDirectory = [System.IO.Path]::GetFullPath($InstallDirectory)
$resolvedTemp = [System.IO.Path]::GetFullPath($env:TEMP)
if (-not $resolvedInstallDirectory.StartsWith($resolvedTemp, [System.StringComparison]::OrdinalIgnoreCase)) {
  throw "Smoke test install directory must stay inside TEMP: $resolvedInstallDirectory"
}

if (Test-Path -LiteralPath $resolvedInstallDirectory) {
  Remove-Item -LiteralPath $resolvedInstallDirectory -Recurse -Force
}

$installArguments = @(
  "/VERYSILENT",
  "/SUPPRESSMSGBOXES",
  "/NORESTART",
  "/NOCANCEL",
  "/NOICONS",
  "/DIR=$resolvedInstallDirectory"
)

for ($installAttempt = 1; $installAttempt -le 2; $installAttempt++) {
  $install = Start-Process -FilePath $SetupExe -ArgumentList $installArguments -Wait -PassThru
  if ($install.ExitCode -ne 0) {
    throw "Silent installation attempt $installAttempt failed with exit code $($install.ExitCode)."
  }
}

if (-not (Test-Path -LiteralPath $InstalledExe)) {
  throw "Installed executable was not found: $InstalledExe"
}

if (-not (Test-Path -LiteralPath $Uninstaller)) {
  throw "Uninstaller was not found: $Uninstaller"
}

$check = Start-Process -FilePath $InstalledExe -ArgumentList "--check" -Wait -PassThru
if ($check.ExitCode -ne 0) {
  throw "Installed Mompy backend check failed with exit code $($check.ExitCode)."
}

$uninstall = Start-Process -FilePath $Uninstaller -ArgumentList @(
  "/VERYSILENT",
  "/SUPPRESSMSGBOXES",
  "/NORESTART"
) -Wait -PassThru

if ($uninstall.ExitCode -ne 0) {
  throw "Silent uninstall failed with exit code $($uninstall.ExitCode)."
}

if (Test-Path -LiteralPath $InstalledExe) {
  throw "Mompy.exe remained after uninstall: $InstalledExe"
}

Write-Host "Installer smoke test passed: install, in-place update, app check, and uninstall."
