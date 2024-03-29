import get from '../get'
import { OObject } from '../types'

describe('get', (): void => {
  test('should get the value relative to the path specified', (): void => {
    const obj = {
      a: 1,
      b: 2
    }

    expect(get(obj, 'a')).toBe(1)
    expect(get(obj, 'b')).toBe(2)
  })

  test('should use dot notation for fetching deep object values', (): void => {
    const obj = {
      a: {
        b: {
          c: {
            d: 1
          }
        }
      }
    }

    expect(get(obj, 'a.b.c.d')).toBe(1)
  })

  test('should return the default value if the path doesn\'t exist in the object', (): void => {
    const obj = {
      b: {}
    }

    expect(get(obj, 'a', 'default')).toBe('default')
    expect(get(obj, 'a.b.c', 'default')).toBe('default')
    expect(get(obj, 'a')).toBeUndefined()
  })

  test('should throw TypeError for invalid arguments', (): void => {
    const invalidObj: unknown = 'testing'
    const invalidPath: unknown = 1

    expect((): any => get(invalidObj as OObject, 'test'))
      .toThrow(new TypeError('Expected Object, got string testing'))
    expect((): any => get({}, invalidPath as string))
      .toThrow(new TypeError('Expected String, got number 1'))
  })
})
