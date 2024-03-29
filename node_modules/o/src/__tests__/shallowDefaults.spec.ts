import shallowDefaults from '../shallowDefaults'
import { OObject } from '../types'

describe('shallowDefaults', (): void => {
  test('should merge all objects', (): void => {
    const getDefaults = shallowDefaults({ a: 1 })
    const b = { b: 2 }
    const c = { c: 3 }
    const keys = Object.keys(getDefaults(b, c))

    expect(keys).toHaveLength(3)
  })

  test('should shallow merge objects', (): void => {
    const getDefaults = shallowDefaults({ a: 1, b: { c: 2, d: 3 } })
    const b = { a: 2, b: { c: 3 } }
    const result = getDefaults(b)

    expect(result.a).toBe(2)
    expect(result.b.c).toBe(3)
    expect(result.b.d).toBeUndefined()
  })

  test('should throw TypeError if follow argument is invalid', (): void => {
    const invalidObj: unknown = 'testing'

    expect((): OObject => shallowDefaults(invalidObj as OObject))
      .toThrow(new TypeError('Expected Object, got string testing'))
  })
})
