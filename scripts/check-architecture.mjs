import { readFile, readdir } from 'node:fs/promises'
import { extname, join } from 'node:path'

const packageRoots = ['packages/concurrency-core/src', 'packages/scenario-engine/src', 'packages/timeline/src']
const forbidden = [/\bfrom\s+['"]vue['"]/, /apps\/lab/, /src\/[^'"]+['"]/]

async function collect(directory) {
  const files = []
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name)
    if (entry.isDirectory()) files.push(...await collect(path))
    else if (extname(entry.name) === '.ts') files.push(path)
  }
  return files
}

const files = (await Promise.all(packageRoots.map(collect))).flat()
for (const file of files) {
  const source = await readFile(file, 'utf8')
  for (const pattern of forbidden) {
    if (pattern.test(source)) throw new Error(`${file} violates architecture boundary ${pattern}`)
  }
}
console.log(`Architecture boundaries passed for ${files.length} files.`)
