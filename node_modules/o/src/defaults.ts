// o
import { valid } from './util'
import merge from './merge'
import clone from './clone'
import { DefaultsFunction, OObject } from './types'

/**
 * Returns a function which will merge all objects with the default object
 * specified. This is useful for creating default options/settings.
 *
 * @example
 * ```
 * const getDefaults = defaults({ a: 1, b: { c: 2 } })
 *
 * getDefaults({ b: { c: 3, d: 4 } }) // => { a: 1, b: { c: 3, d: 4 } }
 * ```
 *
 * @throws TypeError
 *
 * @since 2.3.0
 * @version 2.3.0
 */
function defaults (obj: OObject): DefaultsFunction {
  // check if the object specified is an object
  if (!valid(obj)) throw new TypeError(`Expected Object, got ${typeof obj} ${obj}`)

  // cloned
  const cloned = clone(obj)

  // create the defaults user function
  const result: DefaultsFunction = function (...objects): OObject {
    return merge(cloned, ...objects)
  }

  // add property of the default object
  result.defaultObject = cloned

  // return the result
  return result
}

export default defaults
