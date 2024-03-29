import shallowMerge from '../shallowMerge'
import { OObject } from '../types'

describe('shallowMerge', (): void => {
  test('should return a new object not a reference', (): void => {
    const obj = {
      a: 1,
      b: 2
    }

    const result = shallowMerge(obj, {})
    result.a = 2

    expect(obj.a).toBe(1)
  })

  test('should return an object with the properties of the sources merged on top', (): void => {
    const target = {
      a: 1,
      b: 2
    }
    const sourceA = {
      a: 2
    }
    const sourceB = {
      b: 3
    }

    const resultA = shallowMerge(target, sourceA)
    const resultB = shallowMerge(target, sourceA, sourceB)

    expect(resultA.a).toBe(2)
    expect(resultB.a).toBe(2)
    expect(resultB.b).toBe(3)
  })

  test('should only merge shallow keys', (): void => {
    const target = {
      a: 1,
      b: {
        c: 2
      }
    }
    const sourceA = {
      a: 2
    }
    const sourceB = {
      b: {
        d: 4
      }
    }

    const resultA = shallowMerge(target, sourceA)
    const resultB = shallowMerge(target, sourceA, sourceB)

    expect(resultA.a).toBe(2)
    expect(resultA.b.c).toBe(2)
    expect(resultB.a).toBe(2)
    expect(resultB.b.c).toBeUndefined()
    expect(resultB.b.d).toBe(4)
  })

  test('should add new keys to result object', (): void => {
    const target = {
      a: 1
    }
    const sourceA = {
      b: 2
    }
    const sourceB = {
      c: 3
    }

    const result = shallowMerge(target, sourceA, sourceB)

    expect(result.a).toBe(1)
    expect(result.b).toBe(2)
    expect(result.c).toBe(3)
  })

  test('should throw TypeError for invalid arguments', (): void => {
    const invalidObj: unknown = 'testing'

    expect((): OObject => shallowMerge(invalidObj as OObject, {}))
      .toThrow(new TypeError('Expected Object, got string testing'))
    expect((): OObject => shallowMerge({}, invalidObj as OObject))
      .toThrow(new TypeError('Expected Object[], got object testing'))
    expect((): OObject => shallowMerge({}, {}, invalidObj as OObject))
      .toThrow(new TypeError('Expected Object[], got object [object Object],testing'))
  })
})
