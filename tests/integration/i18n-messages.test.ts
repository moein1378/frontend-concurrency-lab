import { describe, expect, it } from 'vitest'
import { messages } from '../../apps/lab/src/i18n/messages'

function leafKeys(value: object, prefix = ''): string[] {
  return Object.entries(value).flatMap(([key, entry]) => {
    const path = prefix ? `${prefix}.${key}` : key
    return typeof entry === 'string' ? [path] : leafKeys(entry, path)
  })
}

describe('visitor-facing translations', () => {
  it('keeps English and Persian message contracts complete and aligned', () => {
    expect(leafKeys(messages.fa).sort()).toEqual(leafKeys(messages.en).sort())
  })

  it('does not expose empty translated content', () => {
    const translatedValues = JSON.stringify(messages.fa)
    expect(translatedValues).not.toContain('""')
    expect(translatedValues).toMatch(/[\u0600-\u06ff]/)
  })
})
