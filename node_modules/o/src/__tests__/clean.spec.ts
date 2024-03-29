import clean from '../clean'
import { OObject } from '../types'

describe('clean', (): void => {
  test('should remove all null values', (): void => {
    const obj = {
      a: 'a',
      b: null,
      c: 'c',
      d: null
    }

    expect(Object.keys(clean(obj)))
      .toHaveLength(2)
  })

  test('should remove all undefined values', (): void => {
    const obj = {
      a: 'a',
      b: undefined,
      c: 'c',
      d: undefined
    }

    expect(Object.keys(clean(obj)))
      .toHaveLength(2)
  })

  test('should clean objects deeply when follow is true', (): void => {
    const obj = {
      a: 'a',
      b: {
        c: undefined,
        d: 'd'
      }
    }

    expect(Object.keys(clean(obj, {
      follow: true
    }).b))
      .toHaveLength(1)
  })

  test('should throw TypeError if follow argument is invalid', (): void => {
    const invalidObj: unknown = 'testing'
    const follow: unknown = 'testing'

    expect((): OObject => clean(invalidObj as OObject))
      .toThrow(new TypeError('Expected Object, got string testing'))
    expect((): OObject => clean({}, {
      follow: (follow as boolean)
    }))
      .toThrow(new TypeError('Expected Boolean, got string testing'))
  })
})
