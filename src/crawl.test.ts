import { expect, test } from 'vitest'
import { normalizeURL, getURLsFromHTML } from './crawl'


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


test('getURLsFromHTML', () => {
  const inputHTML = `
  <html>
    <body>
      <a href "https://example.com/">
        Hello
      </a>
    </body>
  </html>
  `
  const inputbaseURL = "https://example.com"
  const actual = getURLsFromHTML(inputHTML, inputbaseURL)
  const expected = ["https://example.com/"]
  expect(actual).toEqual(expected)
})
