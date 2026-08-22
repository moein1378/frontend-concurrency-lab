import { readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { gzipSync } from 'node:zlib'
import { readFileSync } from 'node:fs'
import process from 'node:process'

const assets = join(process.cwd(), 'apps/lab/dist/assets')
const jsFiles = readdirSync(assets).filter((file) => file.endsWith('.js'))
const rawBytes = jsFiles.reduce((sum, file) => sum + statSync(join(assets, file)).size, 0)
const gzipBytes = jsFiles.reduce((sum, file) => sum + gzipSync(readFileSync(join(assets, file))).byteLength, 0)
const gzipBudget = 200 * 1024
console.log(`Initial JavaScript: ${rawBytes} bytes raw, ${gzipBytes} bytes gzip (budget ${gzipBudget})`)
if (gzipBytes > gzipBudget) process.exitCode = 1
