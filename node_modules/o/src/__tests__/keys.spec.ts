import keys from '../keys'
import { OObject } from '../types'

describe('keys', (): void => {
  test('should return an array of the objects keys', (): void => {
    const obj = {
      a: 1,
      b: 2,
      c: 3
    }

    expect(keys(obj)).toHaveLength(3)
    expect(keys(obj)[0]).toBe('a')
    expect(keys(obj)[1]).toBe('b')
    expect(keys(obj)[2]).toBe('c')
  })

  test('should return deep object keys in dot notation if follow is true', (): void => {
    const obj = {
      a: 1,
      b: {
        c: 2
      }
    }

    expect(keys(obj, {
      follow: false
    })[1]).toBe('b')
    expect(keys(obj, {
      follow: true
    })[1]).toBe('b.c')
  })

  test('should throw TypeError for invalid arguments', (): void => {
    const invalidObj: unknown = 'testing'
    const invalidFollow: unknown = 'testing'

    expect((): string[] => keys(invalidObj as OObject))
      .toThrow(new TypeError('Expected Object, got string testing'))
    expect((): string[] => keys({}, {
      follow: invalidFollow as boolean
    }))
      .toThrow(new TypeError('Expected Boolean, got string testing'))
  })
})
