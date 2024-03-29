// o
import { valid } from './util'
import { OObject } from './types'

/**
 * Check if the specified object is empty.
 *
 * @example
 * ```
 * const a = { a: 1, b: 2 };
 * const b = {};
 *
 * empty(a); // => false
 * empty(b); // => true
 * ```
 *
 * @throws Error
 *
 * @since 1.0.0
 * @version 2.0.0
 */
function empty (obj: OObject): boolean {
  // check if the arg specified is an object
  if (!valid(obj)) throw new TypeError(`Expected Object, got ${typeof obj} ${obj}`)

  // check if the object has at least 1 key
  return !(Object.keys(obj).length > 0)
}

export default empty
