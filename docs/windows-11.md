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
cd /c/
mkdir -p github
cd github
git clone git@github.com:Scott-Kaplan/encrypted_backups.git
```

## 4. Install dependencies

In Git Bash, confirm you are at the project root, then install the locked dependencies and start the app:

```bash
cd /c/github/encrypted_backups
npm ci #ci = clean then install
npm run dev
```

The Encrypted Backups window should open. Keep the Git Bash window open while using the development app. Press `Ctrl+C` in Git Bash to stop it.