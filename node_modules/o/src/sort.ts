// o
import { valid } from './util'
import defaults from './defaults'
import keys from './keys'
import get from './get'
import set from './set'
import {
  SortOptions, OObject,
  SortCallback, SortElement
} from './types'

// default options
const getDefaults = defaults({
  follow: false
})

/**
 * Sort an object via the callback evaluation
 *
 * @example
 * ```
 * const a = { a: 3, b: 7, c: 5, d: 9 };
 * const b = { a: 3, b: 7, c: 5, d: { e: 1 }, f: 9 };
 *
 * sort(a, (a, b) => {
 *  if (a.value < b.value) return -1;
 *  if (a.value > b.value) return 1;
 *  return 0;
 * }); // => { a: 3, c: 5, b: 7, d: 9 }
 *
 * sort(b, (a, b) => {
 *  if (a.value < b.value) return -1;
 *  if (a.value > b.value) return 1;
 *  return 0;
 * }, {
 *   follow: true,
 * }); // => { d: { e: 1 }, a: 3, c: 5, b: 7, f: 9 }
 * ```
 *
 * @throws TypeError
 *
 * @since 1.0.0
 * @version 2.0.0
 */
function sort (obj: OObject, cb: SortCallback, options: SortOptions = {}): OObject {
  // extract options
  const {
    follow
  } = getDefaults(options) as SortOptions

  // check if the args specified are the correct type
  if (!valid(obj)) throw new TypeError(`Expected Object, got ${typeof obj} ${obj}`)
  if (typeof cb !== 'function') throw new TypeError(`Expected Function, got ${typeof cb} ${cb}`)
  if (typeof follow !== 'boolean') throw new TypeError(`Expected Boolean, got ${typeof follow} ${follow}`)

  // create a new object so we can add the key/values on in the
  // correct order
  let result: OObject = {}

  // get the keys from the object and pass follow to the keys function
  // then we don't need to handle deep objects
  const sortedKeys = keys(obj, {
    follow
  })
    .sort((firstKey, secondKey): number => {
      // get the value from the object for the corresponding key
      const firstValue = get(obj, firstKey)
      const secondValue = get(obj, secondKey)

      // create the element objects
      const firstEl: SortElement = {
        key: firstKey,
        value: firstValue
      }
      const secondEl: SortElement = {
        key: secondKey,
        value: secondValue
      }

      // return the result from the callback using the elements
      return cb(firstEl, secondEl)
    })

  // for each through the sorted keys
  sortedKeys.forEach((key): void => {
    // set the the value on the result object to the corresponding key
    result = set(result, key, get(obj, key))
  })

  // return the result
  return result
}

export default sort
