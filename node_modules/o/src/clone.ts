// o
import { valid } from './util'
import is from './is'
import empty from './empty'
import { OObject } from './types'

/**
 * Clone the specified object.
 * Modifying the properties of a cloned object won't affect the original.
 *
 * @example
 * ```
 * const a = { a: 1 };
 *
 * const b = clone(a);
 * b.a = 2;
 *
 * console.log(a.a, b.a); // => 1  2
 * ```
 *
 * @throws TypeError
 *
 * @since 1.0.0
 * @version 2.0.0
 */
function clone (obj: OObject): OObject {
  // check if the arg specified is an object
  if (!valid(obj)) throw new TypeError(`Expected Object, got ${typeof obj} ${obj}`)

  // if the object is empty just return a new object
  // istanbul ignore next
  if (empty(obj)) return {}

  // create a new empty object
  const result: OObject = {}

  // for each key in the object
  Object.keys(obj).forEach((key: string): void => {
    // get the value at the current key
    const val: any = obj[key]

    // if the value is an object
    if (is(val)) {
      // set the value on the result object as
      // the cloned value object
      result[key] = clone(val)
    } else {
      // add the value from the original object to the same
      // key in the new object
      result[key] = obj[key]
    }
  })

  // return the new object
  return result
}

export default clone
