import every from '../every'
import { OObject, EveryCallback } from '../types'

describe('every', (): void => {
  test('should run for all keys', (): void => {
    const obj = {
      a: 1,
      b: {
        c: 2,
        d: 3
      }
    }
    const mockCallback1 = jest.fn()
    const mockCallback2 = jest.fn()

    every(obj, mockCallback1)
    every(obj, mockCallback2, {
      follow: true
    })

    expect(mockCallback1.mock.calls).toHaveLength(2)
    expect(mockCallback2.mock.calls).toHaveLength(3)
  })

  test('return value should be true only if all callbacks return true', (): void => {
    const objA = {
      a: 1,
      b: 2
    }

    const objB = {
      a: 1,
      b: '2'
    }

    const callback: EveryCallback = (key, value): boolean => typeof value === 'number'

    expect(every(objA, callback)).toBe(true)
    expect(every(objB, callback)).toBe(false)
  })

  test('should throw TypeError for invalid arguments', (): void => {
    const invalidObj: unknown = 'testing'
    const invalidCallback: unknown = 'testing'
    const invalidFollow: unknown = 'testing'

    expect((): boolean => every(invalidObj as OObject, jest.fn()))
      .toThrow(new TypeError('Expected Object, got string testing'))
    expect((): boolean => every({}, invalidCallback as EveryCallback))
      .toThrow(new TypeError('Expected Function, got string testing'))
    expect((): boolean => every({}, jest.fn(), {
      follow: invalidFollow as boolean
    }))
      .toThrow(new TypeError('Expected Boolean, got string testing'))
  })
})
