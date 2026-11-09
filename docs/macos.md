# macOS

These steps assume that you have Visual Studio Code already installed.

## 1. Install Node.js

1. Download the current Node.js LTS macOS Installer (`.pkg`) from [nodejs.org](https://nodejs.org/en/download).
2. Run the installer.
3. Install Xcode Command Line Tools if prompted, or run `xcode-select --install` in Terminal to install them. They provide Git and the tools needed to build native dependencies.
4. Close and reopen Terminal and Visual Studio Code so they pick up the updated `PATH`.
5. In Terminal, verify Node.js and npm are available:

```sh
node --version
npm --version
```

Node.js must be version 22.12 or newer.

## 2. Get the project

In Terminal, move to the directory where you want to keep the project, clone it, and enter the new directory:

```sh
cd ~
mkdir -p github
cd github
git clone git@github.com:Scott-Kaplan/encrypted_backups.git
```

## 3. Install dependencies

In Terminal, confirm you are at the project root, then install the locked dependencies and start the app:

```sh
cd ~/github/encrypted_backups
npm ci
npm run dev
```

The Encrypted Backups window should open. Keep the Terminal window open while using the development app. Press `Control+C` in Terminal to stop it.
