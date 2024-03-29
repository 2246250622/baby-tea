// o
import { valid, dotNotation } from './util'
import empty from './empty'
import has from './has'
import { OObject } from './types'

/**
 * Get the value from the path in the specified object
 *
 * @example
 * ```
 * const a = { a: 1, b: { c: 2 } };
 *
 * get(a, 'b.c'); // => 2
 * ```
 *
 * @throws TypeError
 *
 * @since 1.0.0
 * @version 2.0.0
 */
function get (obj: OObject, path: string, defaultValue: any = undefined): any {
  // check if the arg specified is an object
  if (!valid(obj)) throw new TypeError(`Expected Object, got ${typeof obj} ${obj}`)
  if (typeof path !== 'string') throw new TypeError(`Expected String, got ${typeof path} ${path}`)

  // if the object is empty or it doesn't have the path return the default value
  if (empty(obj) || !has(obj, path)) return defaultValue

  // set the current value to the object so its easier to iterate over the objects
  let currentValue = obj

  // for each path part set the current value as the next value in the path
  dotNotation.from(path).forEach((key): void => {
    currentValue = currentValue[key]
  })

  // return the value at the path
  return currentValue
}

export default get
