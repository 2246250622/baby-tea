import flip from '../flip'
import { OObject } from '../types'

describe('flip', (): void => {
  test('should flip keys and values of an object', (): void => {
    const obj = {
      a: 1,
      b: 2
    }

    const result = flip(obj)

    expect(`${result[1]}${result[2]}`).toBe('ab')
  })

  test('should return "stringable" values only unless useToString is true', (): void => {
    const obj = {
      a: 1,
      b: 'testing',
      c: false,
      d: [1, 2, 3],
      e: {
        f: 1
      }
    }

    const resultA = flip(obj, {
      useToString: false
    })
    const resultB = flip(obj, {
      useToString: true
    })

    expect(Object.keys(resultA)).toHaveLength(2)
    expect(Object.keys(resultB)).toHaveLength(5)
  })

  test('should convert deep objects to dot notation if follow is true', (): void => {
    const obj = {
      a: 1,
      b: {
        c: 2,
        d: {
          e: 3
        }
      }
    }

    const result = flip(obj, {
      follow: true
    })

    expect(result[2]).toBe('b.c')
    expect(result[3]).toBe('b.d.e')
  })

  test('should throw TypeError for invalid arguments', (): void => {
    const invalidObj: unknown = 'testing'
    const invalidFollow: unknown = 'testing'
    const invalidUseToString: unknown = 'testing'

    expect((): OObject => flip(invalidObj as OObject))
      .toThrow(new TypeError('Expected Object, got string testing'))
    expect((): OObject => flip({}, {
      follow: invalidFollow as boolean,
      useToString: false
    }))
      .toThrow(new TypeError('Expected Boolean, got string testing'))
    expect((): OObject => flip({}, {
      follow: false,
      useToString: invalidUseToString as boolean
    }))
      .toThrow(new TypeError('Expected Boolean, got string testing'))
  })
})
