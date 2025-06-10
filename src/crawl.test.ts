import { expect, test } from 'vitest'
import normalizeURL from './crawl'


test('normalizeURL strip protocol', () => {
  const input = 'https://example.com/path'
  const actual = normalizeURL(input)
  const expected = 'example.com/path'
  expect(actual).toEqual(expected)
})


test('normalizeURL strip trailing /', () => {
  const input = 'https://Example.com/path/'
  const actual = normalizeURL(input)
  const expected = 'example.com/path'
  expect(actual).toEqual(expected)
})


test('normalizeURL capitals', () => {
  const input = 'https://EXAMple.com/path'
  const actual = normalizeURL(input)
  const expected = 'example.com/path'
  expect(actual).toEqual(expected)
})


test('normalizeURL different protocol', () => {
  const input = 'http://example.com/path'
  const actual = normalizeURL(input)
  const expected = 'example.com/path'
  expect(actual).toEqual(expected)
})
