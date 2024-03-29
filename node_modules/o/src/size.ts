// o
import { valid } from './util'
import { OObject } from './types'

/**
 * Get the size of the specified object.
 *
 * @example
 * ```
 * const a = { a: 1, b: 2 };
 *
 * size(a); // => 2
 * ```
 *
 * @throws TypeError
 *
 * @since 1.0.0
 * @version 2.0.0
 */
function size (obj: OObject): number {
  // check if the arg specified is an object
  if (!valid(obj)) throw new TypeError(`Expected Object, got ${typeof obj} ${obj}`)

  // get the object keys and return the length
  return Object.keys(obj).length
}

export default size
