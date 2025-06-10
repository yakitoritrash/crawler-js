import { expect, test } from 'vitest'
import normalizeURL from './crawl'


test('normalizeURL', () => {
  const input = ''
  const actual = normalizeURL(input)
  const expected = ''
  expect(actual).toEqual(expected)
})
