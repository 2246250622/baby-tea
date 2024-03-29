// o
import { valid } from './util'
import empty from './empty'
import set from './set'
import { OObject } from './types'

/**
 * Inflate the specified object into a multi level object
 * (reverse of deflate)
 *
 * @example
 * ```
 * const a = { a: 1, 'b.c': 2 };
 *
 * inflate(a); // => { a: 1, b: { c: 2 } }
 * ```
 *
 * @throws TypeError
 *
 * @since 1.0.0
 * @version 2.0.0
 */
function inflate (obj: OObject): OObject {
  // check if the arg specified is an object
  if (!valid(obj)) throw new TypeError(`Expected Object, got ${typeof obj} ${obj}`)

  // if the object is empty just return an empty object
  // istanbul ignore next
  if (empty(obj)) return {}

  // create a new object for the result
  let result: OObject = {}

  // for each "path" in the object
  Object.keys(obj).forEach((keyPath): void => {
    // set the value on the result object to the dot notation path
    result = set(result, keyPath, obj[keyPath])
  })

  // return the result
  return result
}

export default inflate
