// o
import OChainable from './OChainable'
import { valid } from './util'
import { OObject } from './types'

/**
 * Create a new OChainable instance
 *
 * @example
 * ```
 * const a = { a: 1 }
 * const obj = chainer(a)
 *
 * obj
 *  .set('a', 2)
 *  .merge({ b: 3 })
 *  .toJSON()
 * ```
 *
 * @throws TypeError
 *
 * @since 2.2.1
 * @version 2.2.1
 */
function chainer (obj: OObject): OChainable {
  // check if the object specified is an object
  if (!valid(obj)) throw new TypeError(`Expected Object, got ${typeof obj} ${obj}`)
  return new OChainable(obj)
}

export default chainer
