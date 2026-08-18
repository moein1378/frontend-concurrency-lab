#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'

const root = path.resolve(process.argv[2] || process.cwd())
const skillsRoot = path.join(root, '.agents/skills')

const errors = []
const warnings = []

function read(file) { return fs.readFileSync(file, 'utf8') }

function directSkillDirs() {
  return fs.readdirSync(skillsRoot, { withFileTypes: true })
    .filter(d => d.isDirectory() && !d.name.startsWith('_'))
    .map(d => path.join(skillsRoot, d.name))
}

const banned = [
  [/data-testid\s+only/i, 'universal data-testid-only rule'],
  [/every\s+(?:watcher|watchEffect).*?(?:manual|must).*stop/i, 'universal watcher stop rule'],
  [/(?:function|method).{0,30}>\s*10\s*lines/i, 'arbitrary 10-line refactor threshold'],
  [/jest-axe.{0,30}(?:required|mandatory|must)/i, 'mandatory jest-axe rule'],
  [/every\s+SSR\s+page.{0,40}(?:Web Vitals|performance)/i, 'universal SSR performance E2E rule'],
]

for (const dir of directSkillDirs()) {
  const skillFile = path.join(dir, 'SKILL.md')
  if (!fs.existsSync(skillFile)) {
    errors.push(`${path.relative(root, dir)}: missing SKILL.md`)
    continue
  }
  const text = read(skillFile)
  const fm = text.match(/^---\s*\n([\s\S]*?)\n---/)
  if (!fm) {
    errors.push(`${path.relative(root, skillFile)}: missing YAML frontmatter`)
    continue
  }
  const name = fm[1].match(/^name:\s*(.+)\s*$/m)?.[1]?.trim()
  const desc = fm[1].match(/^description:\s*(?:>\s*\n)?([\s\S]*?)(?=\n[A-Za-z_-]+:|\n?$)/m)?.[1]?.trim()
  const dirName = path.basename(dir)
  if (!name) errors.push(`${path.relative(root, skillFile)}: missing name`)
  if (name && name.replace(/^["']|["']$/g, '') !== dirName) errors.push(`${path.relative(root, skillFile)}: name does not match directory`)
  if (!/description:/m.test(fm[1])) errors.push(`${path.relative(root, skillFile)}: missing description`)
  if (text.split('\n').length > 500) warnings.push(`${path.relative(root, skillFile)}: SKILL.md exceeds 500 lines`)

  const refs = [...text.matchAll(/(?<![A-Za-z0-9_])((?:\.\.\/|references\/)[A-Za-z0-9_.\/-]+\.md)/g)].map(m => m[1])
  for (const ref of new Set(refs)) {
    const abs = path.resolve(dir, ref)
    if (!fs.existsSync(abs)) errors.push(`${path.relative(root, skillFile)}: missing reference ${ref}`)
  }
}

function walk(dir) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name)
    if (ent.isDirectory()) walk(p)
    else if (ent.isFile() && /\.(md|toml)$/.test(ent.name)) {
      const text = read(p)
      for (const [rx, label] of banned) {
        if (rx.test(text)) errors.push(`${path.relative(root, p)}: banned legacy policy detected: ${label}`)
      }
    }
  }
}
walk(skillsRoot)

console.log(JSON.stringify({
  skills: directSkillDirs().length,
  errors,
  warnings,
  ok: errors.length === 0,
}, null, 2))
process.exit(errors.length ? 1 : 0)
