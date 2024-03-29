// o
import { valid } from './util'
import defaults from './defaults'
import empty from './empty'
import clone from './clone'
import deflate from './deflate'
import del from './del'
import { CleanOptions, OObject } from './types'

// default options
const getDefaults = defaults({
  follow: false
})

/**
 * Remove `null` and `undefined` values from the specified object
 *
 * @example
 * ```
 * const a = { a: 1, b: null, c: undefined };
 *
 * clean(a); // => { a: 1 }
 * ```
 *
 * @throws TypeError
 *
 * @since 1.0.0
 * @version 2.0.0
 */
function clean (obj: OObject, options: CleanOptions = {}): OObject {
  // extract options
  const {
    follow
  } = getDefaults(options) as CleanOptions

  // check if the object specified is an object
  if (!valid(obj)) throw new TypeError(`Expected Object, got ${typeof obj} ${obj}`)
  // check if follow is a boolean
  if (typeof follow !== 'boolean') throw new TypeError(`Expected Boolean, got ${typeof follow} ${follow}`)

  // if the object is empty just return a new object
  // istanbul ignore next
  if (empty(obj)) return {}

  // create the result object with a clone of the original
  // so we can manipulate it
  let result = clone(obj)

  // deflate the object keys if follow is true
  // then we only need to loop over 1 layer of keys
  const keysObject = follow
    ? deflate(obj)
    : obj

  // for each key
  Object.keys(keysObject).forEach((key): void => {
    // get the key value
    const value = keysObject[key]

    // if the value is `undefined` or `null`
    if (value === undefined || value === null) {
      // delete the value from the result object
      result = del(result, key)
    }
  })

  // return the result object
  return result
}

export default clean
