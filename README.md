# Encrypted Backups

A cross-platform desktop foundation for encrypted backups to an SFTP server you control. The intended targets are Ubuntu MATE 24.04, macOS, and Windows.

## Current status

This is an early application shell, not a finished backup product. The overview UI and native multi-folder picker work. Encryption, recovery-key setup, OS credential storage, SFTP connection and host-key verification, archive creation, scheduling, snapshot history, and restore are not implemented. Do not rely on this version to protect data.

The intended security model is client-side encryption with a passphrase for normal use and a separately stored recovery key. Scheduled runs are intended to retrieve the unlock secret from the operating system's secure credential store. Each backup run is intended to create an independently restorable archive. SFTP host keys must be explicitly trusted and changes must be surfaced to the user. These are requirements, not current guarantees.

## Windows 11

### Run from source

Install Git and Node.js 22.12 or newer, then open PowerShell in the project directory:

```powershell
npm ci
npm run dev
```

This opens the desktop app. Keep PowerShell open while using it; press `Ctrl+C` to stop the development server and app.

### Build and install

Build on Windows 11 to create the x64 installer:

```powershell
npm run typecheck
npm run build
```

Run `release\0.1.0\Encrypted Backups-Windows-0.1.0-Setup.exe` and follow the installer. The installer is not code-signed yet, so Windows SmartScreen may show a warning.

## Ubuntu MATE 24.04

### Run from source

Install Git and Node.js 22.12 or newer, then open a terminal in the project directory:

```sh
npm ci
npm run dev
```

This opens the desktop app. Keep the terminal open while using it; press `Ctrl+C` to stop the development server and app.

### Build and run

Build on Ubuntu to create the AppImage:

```sh
npm run typecheck
npm run build
chmod +x "release/0.1.0/Encrypted Backups-Linux-0.1.0.AppImage"
"./release/0.1.0/Encrypted Backups-Linux-0.1.0.AppImage"
```

If the AppImage reports that FUSE is unavailable, install the Ubuntu 24.04 FUSE compatibility package (`libfuse2t64`) and try again. The GUI currently supports selecting folders but does not create or restore backups.

## macOS

### Run from source

Install Git, Node.js 22.12 or newer, and Xcode Command Line Tools. Open Terminal in the project directory:

```sh
npm ci
npm run dev
```

This opens the desktop app. Keep Terminal open while using it; press `Control+C` to stop the development server and app.

### Build and install

Build on macOS to create the DMG:

```sh
npm run typecheck
npm run build
```

Open `release/0.1.0/Encrypted Backups-Mac-0.1.0-Installer.dmg`, then drag the app into Applications. The app is not signed or notarized yet, so macOS may block the first launch with a security warning.

## Current limitations

The current GUI supports selecting source folders, but it does not create or restore backups. Encryption, recovery-key setup, OS credential storage, SFTP connection and host-key verification, archive creation, scheduling, snapshot history, and restore are not implemented. Do not rely on this version to protect data.

Build each installer on its target operating system or a documented CI image; building on one platform does not validate installers for the others. `npm run build:app` creates a packaged application directory without a distributable installer.

## Security boundaries

Renderer code has no Node integration. Electron context isolation and sandboxing are enabled. The preload exposes a narrow, typed folder-picker operation; backup, encryption, secret storage, and SFTP capabilities must be implemented in the main process or an appropriately isolated native helper. Never pass passphrases, recovery keys, private keys, or unrestricted filesystem/network APIs into the renderer.

## Planned milestones

1. Configure and verify an SFTP endpoint, including first-use host-key confirmation.
2. Implement key derivation, authenticated encryption, recovery-key flow, and OS-backed secret storage.
3. Create independently restorable archives with metadata and robust interrupted-run handling.
4. Add background scheduling, retention controls, and cross-platform restore workflows.
5. Exercise security, recovery, packaging, and interoperability tests on Linux, macOS, and Windows.
