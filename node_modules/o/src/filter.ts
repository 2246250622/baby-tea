// o
import { valid } from './util'
import defaults from './defaults'
import clone from './clone'
import each from './each'
import del from './del'
import { FilterOptions, OObject, FilterCallback } from './types'

const getDefaults = defaults({
  follow: false
})

/**
 * Filter the object keys/values depending on the callback evaluation
 *
 * @example
 * ```
 * const a = { a: 1, b: { c: 2 } };
 *
 * filter(a, (key, value) => {
 *   return value === 1;
 * }); // => { a: 1 }
 *
 * filter(a, (key, value) => {
 *   return value === 2;
 * }, {
 *   follow: true,
 * }); // => { b: { c: 2 } }
 * ```
 *
 * @throws TypeError
 *
 * @since 1.0.0
 * @version 2.0.0
 */
function filter (
  obj: OObject,
  cb: FilterCallback,
  options: FilterOptions = {}
): OObject {
  // extract options
  const {
    follow
  } = getDefaults(options) as FilterOptions

  // check if the args specified are the correct type
  if (!valid(obj)) throw new TypeError(`Expected Object, got ${typeof obj} ${obj}`)
  if (typeof cb !== 'function') throw new TypeError(`Expected Function, got ${typeof cb} ${cb}`)
  if (typeof follow !== 'boolean') throw new TypeError(`Expected Boolean, got ${typeof follow} ${follow}`)

  // create a clone of the original object for the result so we can
  // manipulate it
  let result = clone(obj)

  // for each over the object using the each function which makes it easier
  // for us to loop since we can just pass our own callback to evaluate the
  // the return value and we can pass follow directly to each and it will
  // handle the deep looping for us
  each(obj, (key, value, index): void => {
    // if the callback evaluates to false
    if (!cb(key, value, index)) {
      // remove the value at that key from the result
      result = del(result, key)
    }
  }, {
    follow
  })

  // return the result
  return result
}

export default filter
