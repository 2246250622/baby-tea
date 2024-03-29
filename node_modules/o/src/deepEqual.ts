// o
import { valid } from './util'
import equal from './equal'
import deflate from './deflate'
import { OObject } from './types'

/**
 * Check whether all objects deeply equal each other
 *
 * @example
 * ```
 * const a = { a: 1, b: { c: 2 } };
 * const b = { a: 1, b: { c: 2 } };
 * const c = { a: 1 };
 * const d = { a: 2 };
 * const e = { a: 1, b: { c: 2 } };
 * const f = { a: 1, b: { c: 3 } };
 *
 * deepEqual(a, b); // => true
 * deepEqual(c, d); // => false
 * deepEqual(e, f); // => false
 * ```
 *
 * @throws TypeError
 *
 * @since 1.0.0
 * @version 2.0.0
 */
function deepEqual (obj: OObject, ...compareWith: OObject[]): boolean {
  // check if the arg specified is an object
  if (!valid(obj)) throw new TypeError(`Expected Object, got ${typeof obj} ${obj}`)

  // check if all the compare values are objects
  if (!valid.apply(null, compareWith)) {
    throw new TypeError(`Expected Object[], got ${typeof compareWith} ${compareWith}`)
  }

  // check if every object is equal to each other when deflated
  // if all objects are deflated we can simply use the equal function
  // to check if they equal at 1 layer
  return compareWith.every(
    (object): boolean => equal(deflate(obj), deflate(object))
  )
}

export default deepEqual
