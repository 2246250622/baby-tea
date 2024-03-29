import inflate from '../inflate'
import { OObject } from '../types'

describe('inflate', (): void => {
  test('should inflate object using dot notation in keys', (): void => {
    const obj = {
      a: 1,
      'b.c': 1,
      'd.e.f': 2,
      'd.e.g': 3
    }

    const result: OObject = inflate(obj)

    expect(parseInt(result.a) + parseInt(result.b.c) + parseInt(result.d.e.f) + parseInt(result.d.e.g)).toBe(7)
  })

  test('should throw TypeError for invalid arguments', (): void => {
    const invalidObj: unknown = 'testing'

    expect((): OObject => inflate(invalidObj as OObject))
      .toThrow(new TypeError('Expected Object, got string testing'))
  })
})
