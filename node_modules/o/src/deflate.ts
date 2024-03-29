// o
import empty from './empty'
import is from './is'
import { valid, dotNotation } from './util'
import { OObject } from './types'

/**
 * Deflate the specified object into a one deep object
 * (keys will be dot notation)
 *
 * @example
 * ```
 * const a = { a: 1, b: { c: 2 } };
 *
 * deflate(a); // => { a: 1, 'b.c': 2 }
 * ```
 *
 * @throws TypeError
 *
 * @since 1.0.0
 * @version 2.0.0
 */
function deflate (obj: OObject): OObject {
  // check if the arg specified is an object
  if (!valid(obj)) throw new TypeError(`Expected Object, got ${typeof obj} ${obj}`)

  // if the object is empty just return an empty object
  // istanbul ignore next
  if (empty(obj)) return {}

  // create a new object for the result
  const result: OObject = {}

  // create a recursive function to build the result
  const deflateObj = (object: OObject, currentPath: string[]): void => {
    Object.keys(object).forEach((key): void => {
      // build an array of the current path and the current key
      const newPath: string[] = [...currentPath, key]

      // get the value of the key path for the current object
      const value = object[key]

      // if the value is an object and isn't empty
      if (is(value) && !empty(value)) {
        // rerun this function but with the value as the object
        // and the current path as the new path
        deflateObj(value, newPath)
      } else {
        // if the value isn't an object or is an empty object
        // set the path on the result as the dot notation one deep
        // path
        result[dotNotation.to(newPath)] = value
      }
    })
  }

  // run the first iteration of the recursive functions
  deflateObj(obj, [])

  // return the result
  return result
}

export default deflate
