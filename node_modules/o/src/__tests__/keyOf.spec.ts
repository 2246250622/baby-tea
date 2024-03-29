import keyOf from '../keyOf'
import { OObject } from '../types'

describe('keyOf', (): void => {
  test('should return the key of the first value matched', (): void => {
    const obj = {
      a: 1,
      b: 2,
      c: 3
    }

    expect(keyOf(obj, 1)).toBe('a')
    expect(keyOf(obj, 2)).toBe('b')
    expect(keyOf(obj, 3)).toBe('c')
  })

  test('should return undefined if the value is not matched', (): void => {
    const obj = {
      a: 1
    }

    expect(keyOf(obj, 2)).toBeUndefined()
  })

  test('should throw TypeError for invalid arguments', (): void => {
    const invalidObj: unknown = 'testing'
    const invalidFollow: unknown = 'testing'

    expect((): string | undefined => keyOf(invalidObj as OObject, 'test'))
      .toThrow(new TypeError('Expected Object, got string testing'))
    expect((): string | undefined => keyOf({}, 'test', {
      follow: invalidFollow as boolean
    }))
      .toThrow(new TypeError('Expected Boolean, got string testing'))
  })
})
