import { spawnSync } from 'node:child_process'
import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('../', import.meta.url))
const revisions = await readFile(new URL('../src/revisions.ts', import.meta.url), 'utf8')
const versions = [...revisions.matchAll(/^\s*\/\/\s*(\d+\.\d+\.\d+)\b/gm)]
const version = versions.at(-1)?.[1]

if (!version || !/^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/.test(version)) {
  console.error('Add a valid full semantic version comment as the last version entry in src/revisions.ts.')
  process.exit(1)
}

if (!process.env.GH_TOKEN && !process.env.GITHUB_TOKEN) {
  console.error('Set GH_TOKEN or GITHUB_TOKEN before shipping a GitHub release.')
  process.exit(1)
}

const packagePath = new URL('../package.json', import.meta.url)
const lockPath = new URL('../package-lock.json', import.meta.url)
const packageJson = JSON.parse(await readFile(packagePath, 'utf8'))
const packageLock = JSON.parse(await readFile(lockPath, 'utf8'))

packageJson.version = version
packageLock.version = version
packageLock.packages[''].version = version

await writeFile(packagePath, `${JSON.stringify(packageJson, null, 2)}\n`)
await writeFile(lockPath, `${JSON.stringify(packageLock, null, 2)}\n`)

console.log(`Building and publishing stable release ${version}.`)
const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm'
const result = spawnSync(npmCommand, ['run', 'build', '--', '--publish', 'always'], {
  cwd: root,
  env: process.env,
  shell: process.platform === 'win32',
  stdio: 'inherit',
})

if (result.error) {
  console.error(`Could not start the release build: ${result.error.message}`)
  process.exitCode = 1
} else {
  process.exitCode = result.status ?? 1
}