import del from '../del'
import { OObject } from '../types'

describe('del', (): void => {
  test('should delete the specified path from an object', (): void => {
    const obj = {
      a: 1,
      b: 2
    }

    const newObj = del(obj, 'a')

    expect(Object.keys(newObj)).toHaveLength(1)
  })

  test('should use dot notation for deletion path', (): void => {
    const obj = {
      a: 1,
      b: {
        c: 2
      }
    }

    const newObj = del(obj, 'b.c')

    expect(Object.keys(newObj)).toHaveLength(2)
    expect(Object.keys(newObj.b)).toHaveLength(0)
  })

  test('should return new object not a reference', (): void => {
    const obj = {
      a: 1,
      b: 2
    }

    const newObj = del(obj, 'a')

    newObj.b = 1

    expect(obj.b).toBe(2)
  })

  test('should throw TypeError if path argument is invalid', (): void => {
    const invalidObj: unknown = 'testing'
    const invalidPath: unknown = 5

    expect((): OObject => del(invalidObj as OObject, 'testing'))
      .toThrow(new TypeError('Expected Object, got string testing'))
    expect((): OObject => del({}, invalidPath as string))
      .toThrow(new TypeError('Expected String, got number 5'))
  })
})
