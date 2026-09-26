# Encrypted Backups

A cross-platform desktop foundation for encrypted backups to an SFTP server you control. The intended targets are Ubuntu MATE 24.04, macOS, and Windows.

## Current status

This is an early application shell, not a finished backup product. The overview UI and native multi-folder picker work. Encryption, recovery-key setup, OS credential storage, SFTP connection and host-key verification, archive creation, scheduling, snapshot history, and restore are not implemented. Do not rely on this version to protect data.

The intended security model is client-side encryption with a passphrase for normal use and a separately stored recovery key. Scheduled runs are intended to retrieve the unlock secret from the operating system's secure credential store. Each backup run is intended to create an independently restorable archive. SFTP host keys must be explicitly trusted and changes must be surfaced to the user. These are requirements, not current guarantees.

## Development prerequisites

- Node.js 22 or newer and npm
- The operating-system build prerequisites documented by Electron Builder for the package target being built

## Run the desktop app

Install dependencies once, then launch the development GUI:

```sh
npm install
npm run dev
```

This starts Vite and Electron together and opens the Encrypted Backups window. Keep the terminal open while using the app; press `Ctrl+C` there to stop it. The current GUI supports selecting source folders, but does not yet create or restore backups.

Check TypeScript/Vue types and create a production build:

```sh
npm run typecheck
npm run build
```

`npm run build` creates the platform's distributable (AppImage on Linux, DMG on macOS, and NSIS installer on Windows). Cross-platform installers should be built on their target operating system or a documented CI image; a Linux build does not validate macOS or Windows packaging.

For a packaged application directory without a distributable installer, run `npm run build:app`.

## Security boundaries

Renderer code has no Node integration. Electron context isolation and sandboxing are enabled. The preload exposes a narrow, typed folder-picker operation; backup, encryption, secret storage, and SFTP capabilities must be implemented in the main process or an appropriately isolated native helper. Never pass passphrases, recovery keys, private keys, or unrestricted filesystem/network APIs into the renderer.

## Planned milestones

1. Configure and verify an SFTP endpoint, including first-use host-key confirmation.
2. Implement key derivation, authenticated encryption, recovery-key flow, and OS-backed secret storage.
3. Create independently restorable archives with metadata and robust interrupted-run handling.
4. Add background scheduling, retention controls, and cross-platform restore workflows.
5. Exercise security, recovery, packaging, and interoperability tests on Linux, macOS, and Windows.
