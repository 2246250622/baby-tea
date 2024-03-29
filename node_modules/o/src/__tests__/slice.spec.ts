import slice from '../slice'
import { OObject } from '../types'

describe('slice', (): void => {
  test('should return a new object not a reference', (): void => {
    const obj = {
      a: 1,
      b: 2
    }

    const result = slice(obj, 0, 0)
    result.a = 2

    expect(typeof result).toBe('object')
    expect(obj.a).toBe(1)
  })

  test('should only return the object keys within the slice range', (): void => {
    const obj = {
      a: 1,
      b: 2,
      c: 3,
      d: 4,
      e: 5
    }

    const resultA = slice(obj, 0, 1)
    const resultB = slice(obj, 2, 4)

    expect(Object.keys(resultA)).toHaveLength(1)
    expect(Object.keys(resultA)[0]).toBe('a')
    expect(Object.keys(resultB)).toHaveLength(2)
    expect(Object.keys(resultB)[0]).toBe('c')
    expect(Object.keys(resultB)[1]).toBe('d')
  })

  test('should slice deep objects when follow is true', (): void => {
    const obj = {
      a: 1,
      b: 2,
      c: {
        d: 4,
        e: 5
      }
    }

    const resultA = slice(obj, 0, 1, {
      follow: true
    })
    const resultB = slice(obj, 2, 3, {
      follow: true
    })

    expect(Object.keys(resultA)).toHaveLength(1)
    expect(Object.keys(resultA)[0]).toBe('a')
    expect(Object.keys(resultB)).toHaveLength(1)
    expect(Object.keys(resultB)[0]).toBe('c')
    expect(Object.keys(resultB.c)).toHaveLength(1)
    expect(Object.keys(resultB.c)[0]).toBe('d')
  })

  test('end argument should default to object key length', (): void => {
    const obj = {
      a: 1,
      b: 2,
      c: 3
    }

    const result = slice(obj, 1)

    expect(Object.keys(result)).toHaveLength(2)
    expect(Object.keys(result)[0]).toBe('b')
    expect(Object.keys(result)[1]).toBe('c')
  })

  test('should throw TypeError for invalid arguments', (): void => {
    const invalidObj: unknown = 'testing'
    const invalidNumber: unknown = 'testing'
    const invalidFollow: unknown = 'testing'

    expect((): OObject => slice(invalidObj as OObject, 0, 0))
      .toThrow(new TypeError('Expected Object, got string testing'))
    expect((): OObject => slice({}, invalidNumber as number, 0))
      .toThrow(new TypeError('Expected Number, got string testing'))
    expect((): OObject => slice({}, 0, invalidNumber as number))
      .toThrow(new TypeError('Expected Number, got string testing'))
    expect((): OObject => slice({}, 0, 0, {
      follow: invalidFollow as boolean
    }))
      .toThrow(new TypeError('Expected Boolean, got string testing'))
  })
})
