# Windows 11

These steps use **Git Bash** for every command. They assume Git Bash and Visual Studio Code are already installed.

## 1. Install Node.js

1. Download the current Node.js LTS Windows Installer (`.msi`) from [nodejs.org](https://nodejs.org/en/download).
2. Run the installer and keep the option to add Node.js to `PATH` enabled.
3. Close and reopen Git Bash and Visual Studio Code so they pick up the updated `PATH`.
4. In Git Bash, verify Node.js and npm are available:

```bash
node --version
npm --version
```

Node.js must be version 22.12 or newer.

## 2. Get the project

In Git Bash, move to the directory where you want to keep the project, clone it, and enter the new directory:

```bash
mkdir -p ~/source
cd ~/source
git clone https://github.com/Scott-Kaplan/encrypted_backups.git
cd encrypted_backups
```

## 3. Open the project in Visual Studio Code

From the project directory in Git Bash, run:

```bash
code .
```

If Git Bash reports that `code` is not found, open Visual Studio Code from the Start menu and choose **File > Open Folder**, then select the `encrypted_backups` directory. Continue running the commands below in Git Bash.

## 4. Install dependencies and launch the GUI

In Git Bash, confirm you are at the project root, then install the locked dependencies and start the app:

```bash
pwd
npm ci
npm run dev
```

The Encrypted Backups window should open. Keep the Git Bash window open while using the development app. Press `Ctrl+C` in Git Bash to stop it.

## 5. Build and install the Windows application (optional)

Stop the development app with `Ctrl+C`, then build the x64 Windows installer from the project root:

```bash
npm run typecheck
npm run build
```

The installer is created at:

```text
release/0.1.0/Encrypted Backups-Windows-0.1.0-Setup.exe
```

Launch the installer from Git Bash:

```bash
explorer.exe "$(cygpath -w 'release/0.1.0/Encrypted Backups-Windows-0.1.0-Setup.exe')"
```

Follow the installer prompts. The installer is not code-signed yet, so Windows SmartScreen may show a warning.

## Current limitations

The GUI currently supports selecting source folders, but does not create or restore backups. Encryption, SFTP, scheduling, and restore are not implemented. Do not rely on this version to protect data.
