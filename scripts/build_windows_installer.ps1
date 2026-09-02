param(
  [switch]$SkipAppBuild,
  [switch]$LegacyInstaller,
  [string]$Version = "0.1.6"
)

$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

$ProjectRoot = Split-Path -Parent $PSScriptRoot
$Python = if ($env:PYTHON) { $env:PYTHON } else { "python" }
$PayloadZip = Join-Path $ProjectRoot "dist\Mompy-windows-x64.zip"
$AppDirectory = Join-Path $ProjectRoot "dist\Mompy"
$AppExe = Join-Path $AppDirectory "Mompy.exe"
$SetupName = "MompySetup-v$Version"
$SetupExe = Join-Path $ProjectRoot "dist\$SetupName.exe"
$IconPath = Join-Path $ProjectRoot "frontend\assets\mompy_idle.ico"
$SpecPath = Join-Path $ProjectRoot "$SetupName.spec"
$InstallerBuildPath = Join-Path $ProjectRoot "build\$SetupName"
$InstallerScript = Join-Path $ProjectRoot "installer\setup_windows.py"
$InnoScript = Join-Path $ProjectRoot "installer\mompy.iss"

function Find-InnoCompiler {
  $candidates = @()

  if ($env:INNO_SETUP_COMPILER) {
    $candidates += $env:INNO_SETUP_COMPILER
  }

  $command = Get-Command "ISCC.exe" -ErrorAction SilentlyContinue
  if ($command) {
    $candidates += $command.Source
  }

  if (${env:ProgramFiles(x86)}) {
    $candidates += (Join-Path ${env:ProgramFiles(x86)} "Inno Setup 6\ISCC.exe")
  }

  if ($env:ProgramFiles) {
    $candidates += (Join-Path $env:ProgramFiles "Inno Setup 6\ISCC.exe")
  }

  if ($env:LOCALAPPDATA) {
    $candidates += (Join-Path $env:LOCALAPPDATA "Programs\Inno Setup 6\ISCC.exe")
  }

  foreach ($candidate in $candidates) {
    if ($candidate -and (Test-Path -LiteralPath $candidate)) {
      return (Resolve-Path -LiteralPath $candidate).Path
    }
  }

  return $null
}

Push-Location $ProjectRoot
try {
  & $Python -m PyInstaller --version | Out-Null

  if (-not $SkipAppBuild -or -not (Test-Path $AppExe) -or -not (Test-Path $PayloadZip)) {
    powershell -NoProfile -ExecutionPolicy Bypass -File (Join-Path $ProjectRoot "scripts\build_windows.ps1") -Zip
  }

  if (-not (Test-Path $AppExe)) {
    throw "Missing Windows application: $AppExe"
  }

  if (-not (Test-Path $PayloadZip)) {
    throw "Missing payload zip: $PayloadZip"
  }

  if (Test-Path $SetupExe) { Remove-Item -LiteralPath $SetupExe -Force }

  if ($LegacyInstaller) {
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
  } else {
    $innoCompiler = Find-InnoCompiler
    if (-not $innoCompiler) {
      throw @"
Inno Setup 6 was not found. Install it from https://jrsoftware.org/isdl.php
or set INNO_SETUP_COMPILER to the full path of ISCC.exe.
Use -LegacyInstaller only when the previous Python installer is specifically required.
"@
    }

    $numericVersion = if ($Version -match '^\d+\.\d+\.\d+$') { "$Version.0" } else { $Version }
    & $innoCompiler "/DAppVersion=$Version" "/DAppVersionNumeric=$numericVersion" $InnoScript
    if ($LASTEXITCODE -ne 0) {
      throw "Inno Setup failed with exit code $LASTEXITCODE."
    }
  }

  if (-not (Test-Path $SetupExe)) {
    throw "Build finished, but installer was not found at $SetupExe"
  }

  $installerType = if ($LegacyInstaller) { "legacy Python" } else { "Inno Setup" }
  Write-Host "Installer created ($installerType): $SetupExe"
} finally {
  Pop-Location
}
