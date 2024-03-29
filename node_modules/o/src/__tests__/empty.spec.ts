import empty from '../empty'
import { OObject } from '../types'

describe('empty', (): void => {
  test('should check if an object is empty', (): void => {
    const emptyObj = {}
    const obj = {
      a: 1,
      b: 2
    }

    expect(empty(emptyObj)).toBe(true)
    expect(empty(obj)).toBe(false)
  })

  test('should throw TypeError for invalid arguments', (): void => {
    const invalidObj: unknown = 'testing'

    expect((): boolean => empty(invalidObj as OObject))
      .toThrow(new TypeError('Expected Object, got string testing'))
  })
})
