import includes from '../includes'
import { OObject } from '../types'

describe('includes', (): void => {
  test('should return true or false whether or not the object has the specified value', (): void => {
    const obj = {
      a: 1,
      b: 2
    }

    expect(includes(obj, 1)).toBe(true)
    expect(includes(obj, 2)).toBe(true)
    expect(includes(obj, 3)).toBe(false)
  })

  test('should check within deep objects with follow is true', (): void => {
    const obj = {
      a: 1,
      b: {
        c: {
          d: 2
        }
      }
    }

    expect(includes(obj, 2)).toBe(false)
    expect(includes(obj, 2, {
      follow: true
    })).toBe(true)
  })

  test('should throw TypeError for invalid arguments', (): void => {
    const invalidObj: unknown = 'testing'
    const invalidFollow: unknown = 'testing'

    expect((): boolean => includes(invalidObj as OObject, 'test'))
      .toThrow(new TypeError('Expected Object, got string testing'))
    expect((): boolean => includes({}, 'test', {
      follow: invalidFollow as boolean
    }))
      .toThrow(new TypeError('Expected Boolean, got string testing'))
  })
})
