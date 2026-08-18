import { readFile, readdir } from 'node:fs/promises'
import { extname, join } from 'node:path'

const roots = ['apps', 'packages', 'tests']
const forbidden = [/\bany\b/, /console\.(log|debug)\(/, /@ts-ignore/, /TODO|FIXME/]
const files = []

async function collect(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name)
    if (entry.isDirectory()) await collect(path)
    else if (['.ts', '.vue'].includes(extname(entry.name))) files.push(path)
  }
}

for (const root of roots) await collect(root)
for (const file of files) {
  const source = await readFile(file, 'utf8')
  for (const pattern of forbidden) {
    if (pattern.test(source)) throw new Error(`${file} violates source policy ${pattern}`)
  }
}

console.log(`Source policy lint passed for ${files.length} files.`)
