// o
import { valid } from './util'
import defaults from './defaults'
import each from './each'
import set from './set'
import { MapOptions, OObject, MapCallback } from './types'

// default options
const getDefaults = defaults({
  follow: false
})

/**
 * Loop over the object and return a new object with the values
 * computed using the callback
 *
 * @example
 * ```
 * const a = { a: 1, b: 2, c: 3 };
 * const b = { a: 1, b: { c: 2 } };
 *
 * map(a, (key, value) => {
 *   return value * 2;
 * }); // => { a: 2, b: 4, c: 6 }
 *
 * map(b, (key, value) => {
 *   return value * 2;
 * }); // => { a: 2, b: NaN }
 *
 * map(b, (key, value) => {
 *   return value * 2;
 * }, {
 *   follow: true,
 * }); // => { a: 2, b: { c: 4 } }
 * ```
 *
 * @throws TypeError
 *
 * @since 1.0.0
 * @version 2.0.0
 */
function map (obj: OObject, cb: MapCallback, options: MapOptions = {}): OObject {
  const {
    follow
  } = getDefaults(options) as MapOptions

  // check if the args specified are the correct type
  if (!valid(obj)) throw new TypeError(`Expected Object, got ${typeof obj} ${obj}`)
  if (typeof cb !== 'function') throw new TypeError(`Expected Function, got ${typeof cb} ${cb}`)
  if (typeof follow !== 'boolean') throw new TypeError(`Expected Boolean, got ${typeof follow} ${follow}`)

  // create a result object so we can add the new values to it
  let result: OObject = {}

  // for each over the object using the each function which makes it easier
  // for us to loop since we can just pass our own callback to evaluate the
  // the return value and we can pass follow directly to each and it will
  // handle the deep looping for us
  each(obj, (key, value, index): void => {
    // set the result as the result object with the new key appended
    // with the value of the evaluated callback
    result = set(result, key, cb(key, value, index))
  }, {
    follow
  })

  // return the result
  return result
}

export default map
