#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'

const root = path.resolve(process.argv[2] || process.cwd())
const context = path.resolve(process.argv[3] || path.join(root, '.agents/context/project.md'))
const fpScript = path.join(root, '.agents/scripts/project-fingerprint.mjs')

if (!fs.existsSync(fpScript)) {
  console.error('project-fingerprint.mjs not found')
  process.exit(2)
}
if (!fs.existsSync(context)) {
  console.log(JSON.stringify({ status: 'missing', context }, null, 2))
  process.exit(1)
}

const current = JSON.parse(execFileSync(process.execPath, [fpScript, root], { encoding: 'utf8' }))
const text = fs.readFileSync(context, 'utf8')
const m = text.match(/^\s*fingerprint:\s*["']?([a-f0-9]{64})["']?\s*$/mi)
if (!m) {
  console.log(JSON.stringify({ status: 'unknown', reason: 'no fingerprint in context', current: current.fingerprint }, null, 2))
  process.exit(1)
}

const stored = m[1]
const status = stored === current.fingerprint ? 'fresh' : 'stale'
console.log(JSON.stringify({ status, stored, current: current.fingerprint, context }, null, 2))
process.exit(status === 'fresh' ? 0 : 1)
