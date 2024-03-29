import chainer from '../chainer'
import OChainable from '../OChainable'
import { OObject } from '../types'

describe('chainer', (): void => {
  test('should return OChainable instance', (): void => {
    const obj = {
      a: 1
    }

    expect(chainer(obj)).toBeInstanceOf(OChainable)
  })

  test('should throw TypeError if follow argument is invalid', (): void => {
    const invalidObj: unknown = 'testing'

    expect((): OObject => chainer(invalidObj as OObject))
      .toThrow(new TypeError('Expected Object, got string testing'))
  })
})
