<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import {
  Archive,
  ArrowUpRight,
  Check,
  ChevronRight,
  CircleAlert,
  Clock3,
  Folder,
  FolderPlus,
  HardDrive,
  House,
  LaptopMinimal,
  LockKeyhole,
  RotateCcw,
  Settings2,
  ShieldCheck,
  Trash2,
} from '@lucide/vue'

type Section = 'overview' | 'backup-sets' | 'restore'

const activeSection = ref<Section>('overview')
const selectedFolders = ref<string[]>([])
const pickerBusy = ref(false)
const pickerError = ref('')
const appVersionLabel = ref('')

onMounted(async () => {
  try {
    const appInfo = await window.encryptedBackups.getAppInfo()
    const platformName = {
      win32: 'Windows',
      darwin: 'Mac',
      linux: 'Ubuntu',
    }[appInfo.platform]

    appVersionLabel.value = `${platformName ?? 'Desktop'} app version: ${appInfo.version}`
  } catch {
    appVersionLabel.value = 'Desktop app version unavailable'
  }
})

const pageTitle = computed(() => ({
  overview: 'Overview',
  'backup-sets': 'Backup sets',
  restore: 'Restore',
})[activeSection.value])

function folderLabel(path: string) {
  const segments = path.split(/[\\/]/).filter(Boolean)
  return segments[segments.length - 1] ?? path
}

async function addSourceFolders() {
  pickerBusy.value = true
  pickerError.value = ''

  try {
    const folders = await window.encryptedBackups.selectSourceFolders()
    selectedFolders.value = [...new Set([...selectedFolders.value, ...folders])]
  } catch {
    pickerError.value = 'The folder picker could not be opened.'
  } finally {
    pickerBusy.value = false
  }
}

function removeFolder(path: string) {
  selectedFolders.value = selectedFolders.value.filter((folder) => folder !== path)
}
</script>

<template>
  <div class="app-shell">
    <aside class="sidebar">
      <div class="brand-lockup">
        <div class="brand-mark"><ShieldCheck :size="20" :stroke-width="2.2" /></div>
        <span>Encrypted<br />Backups</span>
      </div>

      <div class="device-switcher">
        <div class="device-icon"><LaptopMinimal :size="17" /></div>
        <div class="device-copy">
          <strong>This computer</strong>
          <span>Not configured</span>
        </div>
        <ChevronRight :size="15" class="muted-icon" />
      </div>

      <div class="nav-label">Workspace</div>
      <nav class="primary-nav" aria-label="Workspace">
        <button
          class="nav-item"
          :class="{ selected: activeSection === 'overview' }"
          :aria-current="activeSection === 'overview' ? 'page' : undefined"
          @click="activeSection = 'overview'"
        >
          <House :size="17" />
          <span>Overview</span>
        </button>
        <button
          class="nav-item"
          :class="{ selected: activeSection === 'backup-sets' }"
          :aria-current="activeSection === 'backup-sets' ? 'page' : undefined"
          @click="activeSection = 'backup-sets'"
        >
          <Archive :size="17" />
          <span>Backup sets</span>
          <span class="nav-count">0</span>
        </button>
        <button
          class="nav-item"
          :class="{ selected: activeSection === 'restore' }"
          :aria-current="activeSection === 'restore' ? 'page' : undefined"
          @click="activeSection = 'restore'"
        >
          <RotateCcw :size="17" />
          <span>Restore</span>
        </button>
      </nav>

      <div class="sidebar-bottom">
        <div class="security-note">
          <div class="security-icon"><LockKeyhole :size="16" /></div>
          <div>
            <strong>Private by design</strong>
            <span>Encryption setup required</span>
          </div>
        </div>
        <button class="nav-item settings-item" type="button" disabled>
          <Settings2 :size="17" />
          <span>Settings</span>
        </button>
        <div class="sidebar-footnote">Personal backup workspace</div>
      </div>
    </aside>

    <main class="main-content">
      <header class="topbar">
        <div class="breadcrumbs"><span>Workspace</span><ChevronRight :size="14" /><strong>{{ pageTitle }}</strong></div>
        <div class="topbar-actions">
          <span class="status-pill"><span class="status-dot"></span> Setup needed</span>
          <button class="icon-button" type="button" aria-label="Security status" title="Security status">
            <LockKeyhole :size="17" />
          </button>
        </div>
      </header>

      <div class="page-wrap">
        <template v-if="activeSection === 'overview'">
          <section class="welcome-band">
            <div class="welcome-copy">
              <div class="eyebrow"><span class="eyebrow-mark"></span> YOUR BACKUP WORKSPACE</div>
              <h1>Keep what matters,<br /><span>within reach.</span></h1>
              <p>Start by choosing the folders you want to protect.</p>
              <button class="primary-button" type="button" :disabled="pickerBusy" @click="addSourceFolders">
                <FolderPlus v-if="!pickerBusy" :size="17" />
                <span v-else class="button-spinner"></span>
                {{ pickerBusy ? 'Opening folders…' : 'Choose folders' }}
                <ArrowUpRight v-if="!pickerBusy" :size="15" />
              </button>
            </div>
            <div class="welcome-illustration" aria-hidden="true">
              <div class="orbit orbit-outer"></div>
              <div class="orbit orbit-inner"></div>
              <div class="shield-plate"><ShieldCheck :size="68" :stroke-width="1.35" /></div>
              <div class="orbit-node node-one"><Folder :size="17" /></div>
              <div class="orbit-node node-two"><LockKeyhole :size="16" /></div>
              <div class="orbit-node node-three"><Check :size="16" /></div>
              <div class="spark spark-one"></div>
              <div class="spark spark-two"></div>
            </div>
            <div class="welcome-index">01 <span>/ 04</span></div>
          </section>

          <section class="summary-row" aria-label="Backup summary">
            <article class="summary-item">
              <div class="summary-icon icon-green"><Folder :size="17" /></div>
              <div><span class="summary-label">Protected folders</span><strong>{{ selectedFolders.length }}</strong></div>
              <span class="summary-trail">Selected</span>
            </article>
            <article class="summary-item">
              <div class="summary-icon icon-orange"><Archive :size="17" /></div>
              <div><span class="summary-label">Backup snapshots</span><strong>0</strong></div>
              <span class="summary-trail">No history</span>
            </article>
            <article class="summary-item">
              <div class="summary-icon icon-blue"><Clock3 :size="17" /></div>
              <div><span class="summary-label">Next scheduled run</span><strong class="summary-value">Not scheduled</strong></div>
              <span class="summary-trail">After setup</span>
            </article>
          </section>

          <div class="section-grid">
            <section class="panel sources-panel">
              <div class="panel-heading">
                <div>
                  <div class="section-kicker">STEP 01</div>
                  <h2>Folders to protect</h2>
                </div>
                <button class="subtle-button" type="button" :disabled="pickerBusy" @click="addSourceFolders">
                  <FolderPlus :size="16" /> Add folder
                </button>
              </div>

              <div v-if="selectedFolders.length" class="folder-list">
                <div v-for="folder in selectedFolders" :key="folder" class="folder-row">
                  <div class="folder-row-icon"><Folder :size="17" /></div>
                  <div class="folder-row-copy">
                    <strong>{{ folderLabel(folder) }}</strong>
                    <span>{{ folder }}</span>
                  </div>
                  <span class="included-label"><Check :size="13" /> Included</span>
                  <button
                    class="remove-button"
                    type="button"
                    :aria-label="`Remove ${folderLabel(folder)}`"
                    title="Remove folder"
                    @click="removeFolder(folder)"
                  >
                    <Trash2 :size="15" />
                  </button>
                </div>
              </div>
              <div v-else class="empty-sources">
                <div class="empty-folder-icon"><FolderPlus :size="21" /></div>
                <div>
                  <strong>No folders selected</strong>
                  <span>Choose one or more folders to begin.</span>
                </div>
                <button class="round-arrow" type="button" aria-label="Choose folders" title="Choose folders" :disabled="pickerBusy" @click="addSourceFolders">
                  <ChevronRight :size="17" />
                </button>
              </div>
              <p v-if="pickerError" class="inline-error" role="alert">{{ pickerError }}</p>
            </section>

            <section class="panel destination-panel">
              <div class="panel-heading">
                <div>
                  <div class="section-kicker">STEP 02</div>
                  <h2>Off-site destination</h2>
                </div>
                <div class="panel-step">02</div>
              </div>
              <div class="destination-empty">
                <div class="destination-icon"><HardDrive :size="19" /></div>
                <div>
                  <strong>SFTP server</strong>
                  <span>Waiting for connection setup</span>
                </div>
                <CircleAlert :size="16" class="warning-icon" />
              </div>
              <div class="panel-footnote">
                <LockKeyhole :size="14" />
                <span>Files stay on this device until encryption is configured.</span>
              </div>
            </section>
          </div>

          <section class="history-section">
            <div class="history-heading">
              <div>
                <div class="section-kicker">ACTIVITY</div>
                <h2>Recent backups</h2>
              </div>
              <button class="text-button" type="button" disabled>View history <ArrowUpRight :size="14" /></button>
            </div>
            <div class="history-empty">
              <div class="history-empty-icon"><Archive :size="18" /></div>
              <span>No backup runs yet</span>
              <span class="history-empty-tail">Recent activity will appear here</span>
            </div>
          </section>
        </template>

        <section v-else class="empty-page">
          <div class="empty-page-icon">
            <Archive v-if="activeSection === 'backup-sets'" :size="22" />
            <RotateCcw v-else :size="22" />
          </div>
          <div class="section-kicker">{{ activeSection === 'backup-sets' ? 'BACKUP SETS' : 'RESTORE' }}</div>
          <h1>{{ activeSection === 'backup-sets' ? 'No backup sets yet' : 'Nothing to restore yet' }}</h1>
          <p>{{ activeSection === 'backup-sets' ? 'Your configured backup sets will appear here.' : 'Completed backups will be available to browse and restore here.' }}</p>
          <button class="text-link" type="button" @click="activeSection = 'overview'">Back to overview <ChevronRight :size="15" /></button>
        </section>
      </div>

      <footer class="app-footer">
        <span class="footer-version">{{ appVersionLabel }}</span>
        <span><span class="footer-dot"></span> Ready on this device</span>
      </footer>
    </main>
  </div>
</template>
