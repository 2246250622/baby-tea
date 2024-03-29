import values from '../values'
import { OObject } from '../types'

describe('values', (): void => {
  test('should return an array of the objects values', (): void => {
    const obj = {
      a: 1,
      b: 2,
      c: 3
    }

    const result = values(obj)

    expect(result).toHaveLength(3)
    expect(result[0]).toBe(1)
    expect(result[1]).toBe(2)
    expect(result[2]).toBe(3)
  })

  test('should return values of deep objects when follow is true', (): void => {
    const obj = {
      a: 1,
      b: 2,
      c: {
        d: 3,
        e: 4
      }
    }

    const result = values(obj, {
      follow: true
    })

    expect(result).toHaveLength(4)
    expect(result[0]).toBe(1)
    expect(result[1]).toBe(2)
    expect(result[2]).toBe(3)
    expect(result[3]).toBe(4)
  })

  test('should throw TypeError for invalid arguments', (): void => {
    const invalidObj: unknown = 'testing'
    const invalidFollow: unknown = 'testing'

    expect((): any[] => values(invalidObj as OObject))
      .toThrow(new TypeError('Expected Object, got string testing'))
    expect((): any[] => values({}, {
      follow: invalidFollow as boolean
    }))
      .toThrow(new TypeError('Expected Boolean, got string testing'))
  })
})
