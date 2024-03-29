import filter from '../filter'
import { OObject, FilterCallback } from '../types'

describe('filter', (): void => {
  test('should only return key/values which the callback evaluates as true', (): void => {
    const obj = {
      a: 1,
      b: 2,
      c: 'testing'
    }

    const resultA = filter(obj, (k, v): boolean => typeof v === 'number')
    const resultB = filter(obj, (k, v): boolean => typeof v === 'string')

    expect(Object.keys(resultA)).toHaveLength(2)
    expect(Object.keys(resultB)).toHaveLength(1)
  })

  test('should evaluate all key/values', (): void => {
    const obj = {
      a: 1,
      b: 2
    }
    const cb = jest.fn((): boolean => true)

    filter(obj, cb)

    expect(cb.mock.calls).toHaveLength(2)
  })

  test('should follow deep objects if follow is true', (): void => {
    const obj = {
      a: 1,
      b: 2,
      c: {
        d: 3,
        e: 'testing'
      }
    }

    const cbA: FilterCallback = (k, v): boolean => typeof v === 'number'
    const cbB: FilterCallback = (k, v): boolean => typeof v === 'string'

    const resultA: typeof obj = (filter(obj, cbA, {
      follow: false
    }) as typeof obj)
    const resultB: typeof obj = (filter(obj, cbA, {
      follow: true
    }) as typeof obj)
    const resultC: typeof obj = (filter(obj, cbB, {
      follow: true
    }) as typeof obj)

    expect(resultA.a + resultA.b).toBe(3)
    expect(resultB.a + resultB.b + resultB.c.d).toBe(6)
    expect(resultC.c.e).toBe('testing')
  })

  test('should throw TypeError for invalid arguments', (): void => {
    const invalidObj: unknown = 'testing'
    const invalidCallback: unknown = 'testing'
    const invalidFollow: unknown = 'testing'

    expect((): OObject => filter(invalidObj as OObject, jest.fn()))
      .toThrow(new TypeError('Expected Object, got string testing'))
    expect((): OObject => filter({}, invalidCallback as FilterCallback))
      .toThrow(new TypeError('Expected Function, got string testing'))
    expect((): OObject => filter({}, jest.fn(), {
      follow: invalidFollow as boolean
    }))
      .toThrow(new TypeError('Expected Boolean, got string testing'))
  })
})
