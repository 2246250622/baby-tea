import clone from '../clone'
import { OObject } from '../types'

describe('clone', (): void => {
  test('should return an exact copy of the object', (): void => {
    const obj = {
      a: 1,
      b: 2
    }
    const cloned: typeof obj = (clone(obj) as typeof obj)

    const total = obj.a + obj.b
    const clonedTotal = cloned.a + cloned.b

    expect(total).toEqual(clonedTotal)
  })

  test('should return a clone not a reference', (): void => {
    const obj = {
      a: 1,
      b: 2
    }
    const cloned = clone(obj)

    cloned.a = 2

    expect(obj.a).toEqual(1)
  })

  test('should throw TypeError if obj argument is invalid', (): void => {
    const invalidObj: unknown = 'testing'

    expect((): OObject => clone(invalidObj as OObject))
      .toThrow(new TypeError('Expected Object, got string testing'))
  })
})
