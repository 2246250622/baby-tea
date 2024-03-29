// o
import { valid } from './util'
import defaults from './defaults'
import each from './each'
import { FindOptions, OObject, FindCallback } from './types'

// default options
const getDefaults = defaults({
  follow: false
})

/**
 * Find the key matching the callback evaluation
 *
 * @example
 * ```
 * const a = { a: 1, b: { c: 2 } };
 *
 * find(a, (key, value) => {
 *   return value === 2;
 * }); // => undefined
 *
 * find(a, (key, value) => {
 *   return value === 2;
 * }, {
 *   follow: true,
 * }); // => 'b.c'
 * ```
 *
 * @throws TypeError
 *
 * @since 1.0.0
 * @version 2.0.0
 */
function find (
  obj: OObject,
  cb: FindCallback,
  options: FindOptions = {}
): string | undefined {
  // extract options
  const {
    follow
  } = getDefaults(options) as FindOptions

  // check if the args specified are the correct type
  if (!valid(obj)) throw new TypeError(`Expected Object, got ${typeof obj} ${obj}`)
  if (typeof cb !== 'function') throw new TypeError(`Expected Function, got ${typeof cb} ${cb}`)
  if (typeof follow !== 'boolean') throw new TypeError(`Expected Boolean, got ${typeof follow} ${follow}`)

  // create a variable to track whether the key is found
  let found = false

  // create the result variable which will default to undefined
  let result: string | undefined

  // for each over the object using the each function which makes it easier
  // for us to loop since we can just pass our own callback to evaluate the
  // the return value and we can pass follow directly to each and it will
  // handle the deep looping for us
  each(obj, (key, value, index): void => {
    // if the key is already found skip because find should
    // return the first found key
    if (!found) {
      // check if the callback evaluates to true
      if (cb(key, value, index)) {
        // if it does evaluate true set found as true
        found = true

        // and set the result as the current key
        result = key
      }
    }
  }, {
    follow
  })

  // if the key was not found set the result as undefined
  if (!found) result = undefined

  // return the result
  return result
}

export default find
