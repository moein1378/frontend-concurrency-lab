#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'

const root = path.resolve(process.argv[2] || process.cwd())
const dir = path.join(root, '.codex/agents')
const errors = []
const warnings = []
const names = new Map()
const validSandbox = new Set(['read-only', 'workspace-write', 'danger-full-access'])

if (!fs.existsSync(dir)) {
  console.log(JSON.stringify({ agents: 0, errors: ['.codex/agents missing'], warnings: [], ok: false }, null, 2))
  process.exit(1)
}

for (const file of fs.readdirSync(dir).filter(x => x.endsWith('.toml')).sort()) {
  const abs = path.join(dir, file)
  const text = fs.readFileSync(abs, 'utf8')
  const name = text.match(/^\s*name\s*=\s*"([^"]+)"/m)?.[1]
  const description = text.match(/^\s*description\s*=\s*"([^"]+)"/m)?.[1]
  const developer = /developer_instructions\s*=\s*"""/m.test(text)
  const sandbox = text.match(/^\s*sandbox_mode\s*=\s*"([^"]+)"/m)?.[1]

  if (!name) errors.push(`${file}: missing name`)
  if (!description) errors.push(`${file}: missing description`)
  if (!developer) errors.push(`${file}: missing developer_instructions`)
  if (name) {
    if (names.has(name)) errors.push(`${file}: duplicate agent name ${name} also in ${names.get(name)}`)
    names.set(name, file)
    const expected = file.replace(/\.toml$/, '').replaceAll('-', '_')
    if (name !== expected) warnings.push(`${file}: filename convention differs from agent name ${name}`)
  }
  if (sandbox && !validSandbox.has(sandbox)) warnings.push(`${file}: unrecognized sandbox_mode ${sandbox}`)
  if (!sandbox) warnings.push(`${file}: sandbox_mode inherits from parent`)
  if (description && description.length < 40) warnings.push(`${file}: description may be too vague for routing`)
}

console.log(JSON.stringify({
  agents: names.size,
  errors,
  warnings,
  ok: errors.length === 0,
}, null, 2))
process.exit(errors.length ? 1 : 0)
