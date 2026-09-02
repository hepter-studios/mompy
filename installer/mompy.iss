#ifndef AppVersion
  #define AppVersion "0.1.6"
#endif

#ifndef AppVersionNumeric
  #define AppVersionNumeric AppVersion + ".0"
#endif

#define AppName "Mompy"
#define AppPublisher "Hepter Studios"
#define AppExeName "Mompy.exe"
#define AppUrl "https://mompy.co"
#define AppRepositoryUrl "https://github.com/hepter-studios/mompy"

[Setup]
AppId={{4C87759E-8E62-4ECF-B04D-73C63F54EF74}
AppName={#AppName}
AppVersion={#AppVersion}
AppVerName={#AppName} {#AppVersion}
AppPublisher={#AppPublisher}
AppPublisherURL={#AppUrl}
AppSupportURL={#AppUrl}/#support
AppUpdatesURL={#AppRepositoryUrl}/releases
AppCopyright=Copyright (C) 2026 Hepter Studios
DefaultDirName={localappdata}\Programs\Mompy
DefaultGroupName=Mompy
DisableProgramGroupPage=yes
DisableWelcomePage=no
LicenseFile=..\LICENSE
OutputDir=..\dist
OutputBaseFilename=MompySetup-v{#AppVersion}
SetupIconFile=..\frontend\assets\mompy_idle.ico
WizardImageFile=assets\mompy-hepter-wizard.bmp
WizardSmallImageFile=assets\hepter-wizard-small.bmp
UninstallDisplayIcon={app}\{#AppExeName}
UninstallDisplayName={#AppName}
VersionInfoVersion={#AppVersionNumeric}
VersionInfoCompany={#AppPublisher}
VersionInfoDescription=Mompy Windows installer
VersionInfoProductName={#AppName}
VersionInfoProductVersion={#AppVersion}
VersionInfoCopyright=Copyright (C) 2026 Hepter Studios
PrivilegesRequired=lowest
ArchitecturesAllowed=x64compatible
CloseApplications=yes
RestartApplications=no
UsePreviousAppDir=yes
DirExistsWarning=auto
WizardStyle=modern
Compression=lzma2/max
SolidCompression=yes
SetupLogging=yes
ShowLanguageDialog=auto
MinVersion=10.0

[Languages]
Name: "english"; MessagesFile: "compiler:Default.isl"
Name: "brazilianportuguese"; MessagesFile: "compiler:Languages\BrazilianPortuguese.isl"

[Tasks]
Name: "desktopicon"; Description: "{cm:CreateDesktopIcon}"; GroupDescription: "{cm:AdditionalIcons}"; Flags: unchecked

[InstallDelete]
; Remove files created by the legacy Mompy installer without touching user data.
Type: files; Name: "{app}\uninstall_mompy.ps1"
Type: files; Name: "{userprograms}\Mompy\Uninstall Mompy.lnk"

[Files]
Source: "..\dist\Mompy\*"; DestDir: "{app}"; Flags: ignoreversion recursesubdirs createallsubdirs

[Icons]
Name: "{group}\Mompy"; Filename: "{app}\{#AppExeName}"; WorkingDir: "{app}"
Name: "{autodesktop}\Mompy"; Filename: "{app}\{#AppExeName}"; WorkingDir: "{app}"; Tasks: desktopicon

[Registry]
; The old Python installer used this key. Inno Setup owns a separate stable AppId key.
Root: HKCU; Subkey: "Software\Microsoft\Windows\CurrentVersion\Uninstall\Mompy"; Flags: deletekey

[Run]
Filename: "{app}\{#AppExeName}"; Description: "{cm:LaunchProgram,{#StringChange(AppName, '&', '&&')}}"; WorkingDir: "{app}"; Flags: nowait postinstall skipifsilent
