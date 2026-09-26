/// <reference types="vite/client" />

export {}

declare global {
	interface Window {
		encryptedBackups: {
			selectSourceFolders(): Promise<string[]>
		}
	}
}
