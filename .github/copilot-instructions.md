# Project instructions

- This is an Electron, Vue 3, TypeScript desktop application for Ubuntu MATE 24.04, macOS, and Windows.
- Keep the renderer untrusted: no Node integration, retain context isolation and sandboxing, and expose only narrow validated APIs through `electron/preload.ts`.
- Keep filesystem, SFTP, encryption, key derivation, scheduling, and OS credential-store access outside the renderer.
- The required security model is client-side authenticated encryption, a separately generated recovery key, and OS secure storage for unattended scheduled unlocks. Never imply these are implemented until they are.
- Use independently restorable archives per backup run, cross-platform restore, selected-folder backup including hidden files, timestamps/basic permissions, and symlink handling.
- Require explicit SFTP host-key trust on first connection and clearly warn on a changed host key.
- Preserve the established visual language and do not add unrelated browser-facing web features; this is a desktop app.
- Before claiming the app is ready for data protection, implement and test encryption, secret recovery, SFTP verification, atomic archive finalization, scheduling, and restore on all target operating systems.
- Validate changes with `npm run typecheck` and `npm run build` where applicable; review dependency advisories before updating dependencies.
