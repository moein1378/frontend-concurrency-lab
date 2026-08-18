#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import { execFileSync } from 'node:child_process'

const root = path.resolve(process.argv[2] || process.cwd())

const candidates = [
  'package.json',
  'pnpm-lock.yaml',
  'yarn.lock',
  'package-lock.json',
  'bun.lock',
  'bun.lockb',
  'pnpm-workspace.yaml',
  'nuxt.config.ts',
  'nuxt.config.js',
  'nuxt.config.mjs',
  'vite.config.ts',
  'vite.config.js',
  'vitest.config.ts',
  'vitest.config.mts',
  'vitest.config.js',
  'playwright.config.ts',
  'playwright.config.js',
  'tsconfig.json',
]

function sha256(file) {
  return crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex')
}

function readJson(file) {
  try { return JSON.parse(fs.readFileSync(file, 'utf8')) } catch { return null }
}

function versionOf(pkg, name) {
  return pkg?.dependencies?.[name]
    || pkg?.devDependencies?.[name]
    || pkg?.peerDependencies?.[name]
    || null
}

function gitCommit() {
  try {
    return execFileSync('git', ['-C', root, 'rev-parse', 'HEAD'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim()
  } catch {
    return null
  }
}

const files = []
for (const rel of candidates) {
  const abs = path.join(root, rel)
  if (fs.existsSync(abs) && fs.statSync(abs).isFile()) {
    files.push({ path: rel, sha256: sha256(abs) })
  }
}

const pkg = readJson(path.join(root, 'package.json'))
const lockfiles = files.map(x => x.path).filter(x => /(?:lock|pnpm-lock|yarn\.lock)/.test(x))
let packageManager = pkg?.packageManager || null
if (!packageManager) {
  if (lockfiles.includes('pnpm-lock.yaml')) packageManager = 'pnpm'
  else if (lockfiles.includes('yarn.lock')) packageManager = 'yarn'
  else if (lockfiles.includes('package-lock.json')) packageManager = 'npm'
  else if (lockfiles.includes('bun.lock') || lockfiles.includes('bun.lockb')) packageManager = 'bun'
}

const payload = {
  generated_at: new Date().toISOString(),
  root,
  git_commit: gitCommit(),
  package_manager: packageManager,
  versions: {
    vue: versionOf(pkg, 'vue'),
    nuxt: versionOf(pkg, 'nuxt'),
    vitest: versionOf(pkg, 'vitest'),
    vue_test_utils: versionOf(pkg, '@vue/test-utils'),
    nuxt_test_utils: versionOf(pkg, '@nuxt/test-utils'),
    playwright: versionOf(pkg, '@playwright/test'),
  },
  scripts: pkg?.scripts || {},
  files,
}

const stable = JSON.stringify({
  git_commit: payload.git_commit,
  package_manager: payload.package_manager,
  versions: payload.versions,
  files: payload.files,
})
payload.fingerprint = crypto.createHash('sha256').update(stable).digest('hex')

process.stdout.write(JSON.stringify(payload, null, 2) + '\n')
