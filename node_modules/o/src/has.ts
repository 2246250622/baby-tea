// o
import { valid, dotNotation } from './util'
import empty from './empty'
import is from './is'
import { OObject } from './types'

/**
 * Check if an object has the specified path (using dot notation)
 *
 * @example
 * ```
 * const a = { a: 1, b: { c: 2 } };
 *
 * has(a, 'b.c'); // => true
 * has(a, 'b.d'); // => false
 * ```
 *
 * @throws Error
 *
 * @since 1.0.0
 * @version 2.0.0
 */
function has (obj: OObject, ...paths: string[]): boolean {
  // check if the arg specified is an object
  if (!valid(obj)) throw new TypeError(`Expected Object, got ${typeof obj} ${obj}`)
  if (!paths.every((path): boolean => typeof path === 'string')) {
    throw new TypeError(`Expected String[], got ${typeof paths} ${paths}`)
  }

  // if the object is empty just return false because it doesn't have anything
  if (empty(obj)) return false

  // set the result boolean to true by default
  let hasPaths = true

  // for each path specified
  paths.forEach((path): void => {
    // check if hasPaths is true, if it isn't just skip because at least one
    // has failed
    if (hasPaths) {
      // set the current value as the object by default
      let currentValue: any = obj

      // for each part in the dot notation path
      dotNotation.from(path).forEach((key): void => {
        // if the value at the current path part in the current value
        // is an object and isn't empty set the current value as that object
        if (is(currentValue) && !empty(currentValue)) {
          currentValue = currentValue[key]
        } else {
          // if it isn't an object or is empty just set the current value as
          // undefined
          currentValue = undefined
        }
      })

      // if the resulting value is undefined
      if (currentValue === undefined) {
        // set has paths to false because at least 1 path has failed
        hasPaths = false
      }
    }
  })

  // return the resulting boolean
  return hasPaths
}

export default has
