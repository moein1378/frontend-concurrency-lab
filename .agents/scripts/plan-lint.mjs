#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'

const file = path.resolve(process.argv[2] || '')
if (!file || !fs.existsSync(file)) {
  console.error('Usage: node .agents/scripts/plan-lint.mjs .agents/plans/<plan>.md')
  process.exit(2)
}
const text = fs.readFileSync(file, 'utf8')
const required = [
  ['id', /^\s*id:\s*\S+/m],
  ['status', /^\s*status:\s*\S+/m],
  ['goal', /^\s*goal:\s*\S+/m],
  ['acceptance_criteria', /^\s*acceptance_criteria:\s*$/m],
  ['steps', /^\s*steps:\s*$/m],
  ['evidence', /^\s*evidence:\s*$/m],
]
const missing = required.filter(([, rx]) => !rx.test(text)).map(([name]) => name)
console.log(JSON.stringify({ file, ok: missing.length === 0, missing }, null, 2))
process.exit(missing.length ? 1 : 0)
