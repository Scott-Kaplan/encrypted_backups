/// <reference types="vite/client" />

export {}

declare global {
	interface Window {
		encryptedBackups: {
			selectSourceFolders(): Promise<string[]>
			getAppInfo(): Promise<{ platform: string; version: string }>
			getUpdateStatus(): Promise<import('./update-types').UpdateStatus>
			onUpdateStatus(callback: (status: import('./update-types').UpdateStatus) => void): () => void
			installUpdate(): Promise<void>
		}
	}
}
