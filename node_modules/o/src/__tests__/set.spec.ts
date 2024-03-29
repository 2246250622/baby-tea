import set from '../set'
import { OObject } from '../types'

describe('set', (): void => {
  test('should return a new object not a reference', (): void => {
    const obj = {}
    const result = set(obj, 'a', 1)

    expect(result.a).toBe(1)
    expect(Object.keys(obj)).toHaveLength(0)
  })

  test('should set the specified value on the object', (): void => {
    const obj = {}
    const result = set(obj, 'a', 1)

    expect(result.a).toBe(1)
  })

  test('should use dot notation for the path', (): void => {
    const obj = {}
    const result = set(obj, 'a.b', 1)

    expect(result.a.b).toBe(1)
  })

  test('should throw TypeError for invalid arguments', (): void => {
    const invalidObj: unknown = 'testing'
    const invalidPath: unknown = 1

    expect((): OObject => set(invalidObj as OObject, 'test', 'test'))
      .toThrow(new TypeError('Expected Object, got string testing'))
    expect((): OObject => set({}, invalidPath as string, 'test'))
      .toThrow(new TypeError('Expected String, got number 1'))
  })
})
