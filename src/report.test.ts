import { expect, test } from 'vitest'
import  sortPages  from './report'

test('sortPages 2 pages', () => {
  const input = {
    'https://wagslane.dev': 1,
    'https://wagslane.dev/path': 3
  }
  const actual = sortPages(input)
  const expected = [['https://wagslane.dev/path', 3],
  ['https://wagslane.dev', 1]]
  
  expect(actual).toEqual(expected)
})

test('sortPages 5 pages', () => {
  const input = {
    'https://wagslane.dev': 1,
    'https://wagslane.dev/path': 3,
    'https://wagslane.dev/path2': 2,
    'https://wagslane.dev/apth3': 5,
    'https://wagslane.dev/path4': 4,
  }
  const actual = sortPages(input)
  const expected = [['https://wagslane.dev/apth3', 5], ['https://wagslane.dev/path4', 4], ['https://wagslane.dev/path', 3],
  ['https://wagslane.dev/path2', 2], ['https://wagslane.dev', 1]]
  
  expect(actual).toEqual(expected)
})
