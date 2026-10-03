# macOS

## Prerequisites

Install Git, Node.js 22.12 or newer, and Xcode Command Line Tools. Open Terminal in the project directory.

## Run from source

```sh
npm ci
npm run dev
```

This opens the desktop app. Keep Terminal open while using it; press `Control+C` to stop the development server and app.

## Build and install

Build on macOS to create the DMG:

```sh
npm run typecheck
npm run build
```

Open `release/0.1.0/Encrypted Backups-Mac-0.1.0-Installer.dmg`, then drag the app into Applications. The app is not signed or notarized yet, so macOS may block the first launch with a security warning.

## Current limitations

The GUI currently supports selecting source folders, but does not create or restore backups. Do not rely on this version to protect data.
