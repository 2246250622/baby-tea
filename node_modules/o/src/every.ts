// o
import { valid } from './util'
import defaults from './defaults'
import each from './each'
import { EveryOptions, OObject, EveryCallback } from './types'

// default options
const getDefaults = defaults({
  follow: false
})

/**
 * Check if every item in the object evaluates to true
 *
 * @example
 * ```
 * const a = { a: 1, b: { c: 1 } };
 *
 * every(a, (key, value) => {
 *   return value === 1;
 * }); // => false
 *
 * every(a, (key, value) => {
 *   return value === 1;
 * }, {
 *   follow: true,
 * }); // => true
 * ```
 *
 * @throws TypeError
 *
 * @since 1.0.0
 * @version 2.0.0
 */
function every (obj: OObject, cb: EveryCallback, options: EveryOptions = {}): boolean {
  // extract options
  const {
    follow
  } = getDefaults(options) as EveryOptions

  // check if the args specified are the correct type
  if (!valid(obj)) throw new TypeError(`Expected Object, got ${typeof obj} ${obj}`)
  if (typeof cb !== 'function') throw new TypeError(`Expected Function, got ${typeof cb} ${cb}`)
  if (typeof follow !== 'boolean') throw new TypeError(`Expected Boolean, got ${typeof follow} ${follow}`)

  // set result to true so we can change it to false if
  // the callback fails to evaluate to true
  let result = true

  // for each over the object using the each function which makes it easier
  // for us to loop since we can just pass our own callback to evaluate the
  // the return value and we can pass follow directly to each and it will
  // handle the deep looping for us
  each(obj, (key, value, index): void => {
    // if the callback evaluates to false
    if (!cb(key, value, index)) {
      // set the result as false
      result = false
    }
  }, {
    follow
  })

  // return the result
  return result
}

export default every
