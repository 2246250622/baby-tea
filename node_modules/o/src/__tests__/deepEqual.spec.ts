import deepEqual from '../deepEqual'
import { OObject } from '../types'

describe('deepEqual', (): void => {
  const objA = {
    a: 1,
    b: {
      c: 2,
      d: {
        e: 3
      }
    }
  }

  const objB = {
    a: 1,
    b: {
      c: 2,
      d: {
        e: 3
      }
    }
  }

  const objC = {
    a: 1,
    b: {
      c: 2,
      d: {
        e: 3
      }
    }
  }

  const objNotEqual = {
    a: 1,
    b: {
      c: 2,
      d: {
        e: 4
      }
    }
  }

  test('should check if two objects deeply equal', (): void => {
    expect(deepEqual(objA, objB)).toBe(true)
    expect(deepEqual(objA, objNotEqual)).toBe(false)
  })

  test('should check if multiple objects equal', (): void => {
    expect(deepEqual(objA, objB, objC)).toBe(true)
  })

  test('should return false if one value is different in any object when checking multiple objects', (): void => {
    expect(deepEqual(objA, objB, objC, objNotEqual)).toBe(false)
  })

  test('should throw TypeError if compareWith argument is invalid', (): void => {
    const invalidObj: unknown = 'testing'

    expect((): boolean => deepEqual(invalidObj as OObject, objA))
      .toThrow(new TypeError('Expected Object, got string testing'))
    expect((): boolean => deepEqual(objA, objB, invalidObj as OObject))
      .toThrow(new TypeError('Expected Object[], got object [object Object],testing'))
  })
})
