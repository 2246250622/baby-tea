import defaults from '../defaults'
import { OObject } from '../types'

describe('defaults', (): void => {
  test('should merge all objects', (): void => {
    const getDefaults = defaults({ a: 1 })
    const b = { b: 2 }
    const c = { c: 3 }
    const keys = Object.keys(getDefaults(b, c))

    expect(keys).toHaveLength(3)
  })

  test('should deep merge objects', (): void => {
    const getDefaults = defaults({ a: 1, b: { c: 2 } })
    const b = { b: { c: 3 } }

    expect(getDefaults(b).b.c).toBe(3)
  })

  test('should throw TypeError if follow argument is invalid', (): void => {
    const invalidObj: unknown = 'testing'

    expect((): OObject => defaults(invalidObj as OObject))
      .toThrow(new TypeError('Expected Object, got string testing'))
  })
})
