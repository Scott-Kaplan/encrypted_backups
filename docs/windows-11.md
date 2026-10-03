# Windows 11

## Prerequisites

Install Git and Node.js 22.12 or newer. Open PowerShell in the project directory.

## Run from source

```powershell
npm ci
npm run dev
```

This opens the desktop app. Keep PowerShell open while using it; press `Ctrl+C` to stop the development server and app.

## Build and install

Build on Windows 11 to create the x64 installer:

```powershell
npm run typecheck
npm run build
```

Run `release\0.1.0\Encrypted Backups-Windows-0.1.0-Setup.exe` and follow the installer. The installer is not code-signed yet, so Windows SmartScreen may show a warning.

## Current limitations

The GUI currently supports selecting source folders, but does not create or restore backups. Do not rely on this version to protect data.
