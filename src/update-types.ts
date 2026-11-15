export type UpdateStatus =
  | { state: 'disabled' | 'checking' | 'current' | 'installing' | 'error' }
  | { state: 'available'; version: string }
  | { state: 'downloading'; percent: number }