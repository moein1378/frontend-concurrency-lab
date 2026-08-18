#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'
import { pathToFileURL } from 'node:url'

const [expectedArg, actualArg, diffArg, thresholdArg = '0.1', maxDiffRatioArg = '0'] = process.argv.slice(2)
if (!expectedArg || !actualArg || !diffArg) {
  console.error('Usage: node .agents/scripts/visual-diff.mjs expected.png actual.png diff.png [colorThreshold] [maxDiffRatio]')
  process.exit(2)
}

const cwd = process.cwd()
const requireFromProject = createRequire(path.join(cwd, 'package.json'))

async function load(name) {
  try {
    const resolved = requireFromProject.resolve(name)
    return await import(pathToFileURL(resolved).href)
  } catch {
    return null
  }
}

const pngjs = await load('pngjs')
const pm = await load('pixelmatch')
if (!pngjs || !pm) {
  console.error('Optional visual diff dependencies not found in the target project: pngjs + pixelmatch.')
  console.error('Use the repository\'s existing visual-regression tooling instead, or intentionally add these dependencies if the project approves.')
  process.exit(2)
}

const PNG = pngjs.PNG || pngjs.default?.PNG
const pixelmatch = pm.default || pm.pixelmatch || pm
const expected = PNG.sync.read(fs.readFileSync(path.resolve(expectedArg)))
const actual = PNG.sync.read(fs.readFileSync(path.resolve(actualArg)))

if (expected.width !== actual.width || expected.height !== actual.height) {
  console.error(JSON.stringify({
    result: 'dimension-mismatch',
    expected: [expected.width, expected.height],
    actual: [actual.width, actual.height],
  }, null, 2))
  process.exit(1)
}

const diff = new PNG({ width: expected.width, height: expected.height })
const threshold = Number(thresholdArg)
const maxDiffRatio = Number(maxDiffRatioArg)
const differingPixels = pixelmatch(
  expected.data,
  actual.data,
  diff.data,
  expected.width,
  expected.height,
  { threshold },
)
fs.writeFileSync(path.resolve(diffArg), PNG.sync.write(diff))
const total = expected.width * expected.height
const ratio = differingPixels / total
const pass = ratio <= maxDiffRatio

console.log(JSON.stringify({
  result: pass ? 'pass' : 'fail',
  differing_pixels: differingPixels,
  total_pixels: total,
  ratio,
  color_threshold: threshold,
  max_diff_ratio: maxDiffRatio,
  diff: path.resolve(diffArg),
}, null, 2))
process.exit(pass ? 0 : 1)
