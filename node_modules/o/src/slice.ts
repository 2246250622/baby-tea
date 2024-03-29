// o
import { valid } from './util'
import defaults from './defaults'
import keys from './keys'
import set from './set'
import get from './get'
import { SliceOptions, OObject } from './types'

// default options
const getDefaults = defaults({
  follow: false
})

/**
 * Get a portion of the specified object
 *
 * @example
 * ```
 * const a = { a: 1, b: 2, c: 3, d: 4 };
 *
 * slice(a, 0, 1); // => { a: 1 }
 * slice(a, 1, 3); // => { b: 2, c: 3 }
 * ```
 *
 * @throws TypeError
 *
 * @since 1.0.0
 * @version 2.0.0
 */
function slice (
  obj: OObject,
  start: number,
  end: number = Object.keys(obj).length,
  options: SliceOptions = {}
): OObject {
  // extract options
  const {
    follow
  } = getDefaults(options) as SliceOptions

  // check if the args specified are the correct type
  if (!valid(obj)) throw new TypeError(`Expected Object, got ${typeof obj} ${obj}`)
  if (typeof start !== 'number') throw new TypeError(`Expected Number, got ${typeof start} ${start}`)
  if (typeof end !== 'number') throw new TypeError(`Expected Number, got ${typeof end} ${end}`)

  // create an empty object for the result
  let result: OObject = {}

  // get the keys of the object and pass follow so the keys function
  // can handle the deep looping for us
  const objKeys = keys(obj, {
    follow
  })

  // run the native slice function on the keys so its fast
  objKeys.slice(start, end)
    .forEach((key): void => {
      // for each of the keys after sliced

      // get the value from the original object
      const value = get(obj, key)

      // set the value on the result object to the current key
      result = set(result, key, value)
    })

  // return the result
  return result
}

export default slice
