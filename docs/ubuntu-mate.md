# Ubuntu MATE 24.04

## Prerequisites

Install Git and Node.js 22.12 or newer. Open a terminal in the project directory.

## Run from source

```sh
npm ci
npm run dev
```

This opens the desktop app. Keep the terminal open while using it; press `Ctrl+C` to stop the development server and app.

## Build and run

Build on Ubuntu to create the AppImage:

```sh
npm run typecheck
npm run build
chmod +x "release/0.1.0/Encrypted Backups-Linux-0.1.0.AppImage"
"./release/0.1.0/Encrypted Backups-Linux-0.1.0.AppImage"
```

If the AppImage reports that FUSE is unavailable, install the Ubuntu FUSE compatibility package (`libfuse2t64`) and try again.

## Current limitations

The GUI currently supports selecting source folders, but does not create or restore backups. Do not rely on this version to protect data.
