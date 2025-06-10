import { expect, test } from 'vitest'
import normalizeURL from './crawl'


test('normalizeURL strip protocol', () => {
  const input = 'https://example.com/path'
  const actual = normalizeURL(input)
  const expected = 'example.com/path'
  expect(actual).toEqual(expected)
})


test('normalizeURL strip protocol + lowercase', () => {
  const input = 'https://Example.com/path/'
  const actual = normalizeURL(input)
  const expected = 'example.com/path'
  expect(actual).toEqual(expected)
})
