# macOS

These steps assume that you have Visual Studio Code already installed.

## 1. Install Node.js

1. Download the current Node.js LTS macOS Installer (`.pkg`) from [nodejs.org](https://nodejs.org/en/download).
2. Run the installer.
3. Close all terminals in Visual Studio Code and open a new one, so it picks up the updated `PATH`.
4. Execute these commands to verify Node.js and npm are available:

```sh
node --version
npm --version
```

Node.js must be version 22.12 or newer.

## 2. Get the project

In the terminal, move to the directory where you want to keep the project, clone it, and enter the new directory:

```sh
cd ~
mkdir -p github
cd github
git clone git@github.com:Scott-Kaplan/encrypted_backups.git
```

## 3. Install dependencies

In the terminal, confirm you are at the project root, then install the locked dependencies and start the app:

```sh
cd ~/github/encrypted_backups
npm ci
npm run dev
```

The Encrypted Backups window should open. Keep the terminal window open while using the development app. Press `Control+C` in the terminal to stop it.
