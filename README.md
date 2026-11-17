# Encrypted Backups

> [!WARNING]
> **WORK IN PROGRESS: THIS APPLICATION IS INCOMPLETE AND IS NOT READY FOR REAL-WORLD USE.** Backup creation, encryption, SFTP transfer, scheduling, and restore are not implemented. Do not entrust important data to this application or rely on it to protect or recover files. Features may be missing, incomplete, or changed without notice.

A cross-platform desktop foundation for encrypted backups to an SFTP server you control. The intended targets are Ubuntu MATE 26.04, macOS, and Windows.

## Current status

This is an early application shell, not a finished backup product. The overview UI and native multi-folder picker work. Encryption, recovery-key setup, OS credential storage, SFTP connection and host-key verification, archive creation, scheduling, snapshot history, and restore are not implemented. Do not rely on this version to protect data.

Automatic updates use stable GitHub Releases from `Scott-Kaplan/encrypted_backups`. The repository must be public for installed apps to check for releases. macOS update checks are disabled by default; enable them only on a signed and notarized Mac release build with `MAC_AUTO_UPDATES_ENABLED=true npm run build`.

The intended security model is client-side encryption with a passphrase for normal use and a separately stored recovery key. Scheduled runs are intended to retrieve the unlock secret from the operating system's secure credential store. Each backup run is intended to create an independently restorable archive. SFTP host keys must be explicitly trusted and changes must be surfaced to the user. These are requirements, not current guarantees.

## Install and run

- [Windows 11](docs/windows-11.md)
- [Ubuntu MATE 26.04](docs/ubuntu-mate.md)
- [macOS](docs/macos.md)

Build each installer on its target operating system or a documented CI image; building on one platform does not validate installers for the others. `npm run build:app` creates a packaged application directory without a distributable installer.

## Publishing a tested release

Append a full semantic version and a short change summary to `src/revisions.ts`, then run `npm run dev` and test the app. When the version is approved, set `GH_TOKEN` in your environment and run `npm run ship`. The script synchronizes the package version from the last revision entry, builds the installer for the current operating system, and publishes it as a stable GitHub Release. Run it on each target operating system to add Windows, Mac, and Ubuntu artifacts to the same versioned release. The GitHub repository must be public for installed apps to access updates; never commit the token. On Mac, enable updater checks only for signed and notarized builds with `MAC_AUTO_UPDATES_ENABLED=true`.

## Security boundaries

Renderer code has no Node integration. Electron context isolation and sandboxing are enabled. The preload exposes a narrow, typed folder-picker operation; backup, encryption, secret storage, and SFTP capabilities must be implemented in the main process or an appropriately isolated native helper. Never pass passphrases, recovery keys, private keys, or unrestricted filesystem/network APIs into the renderer.

## Planned milestones

1. Configure and verify an SFTP endpoint, including first-use host-key confirmation.
2. Implement key derivation, authenticated encryption, recovery-key flow, and OS-backed secret storage.
3. Create independently restorable archives with metadata and robust interrupted-run handling.
4. Add background scheduling, retention controls, and cross-platform restore workflows.
5. Exercise security, recovery, packaging, and interoperability tests on Linux, macOS, and Windows.
