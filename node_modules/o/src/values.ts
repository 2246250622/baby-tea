// o
import { valid } from './util'
import defaults from './defaults'
import keys from './keys'
import get from './get'
import { ValuesOptions, OObject } from './types'

// default options
const getDefaults = defaults({
  follow: false
})

/**
 * Get an array of the object values
 *
 * @example
 * ```
 * const a = { a: 1, b: 2, c: 3, d: 4, e: 5 };
 * const b = { a: 1, b: { c: 2, d: 3 } };
 *
 * values(a); // => [ 1, 2, 3, 4, 5 ]
 * values(b, {
 *   follow: true,
 * }); // => [ 1, 2, 3 ]
 * ```
 *
 * @throws TypeError
 *
 * @since 1.0.0
 * @version 2.0.0
 */
function values (obj: OObject, options: ValuesOptions = {}): any[] {
  // extract options
  const {
    follow
  } = getDefaults(options) as ValuesOptions

  // check if the args specified are the correct type
  if (!valid(obj)) throw new TypeError(`Expected Object, got ${typeof obj} ${obj}`)

  // get the object keys and pass follow so it handles the deep object
  // for us and then map the keys array and return the corresponding value
  // for the current key
  return keys(obj, {
    follow
  })
    .map((key): any => get(obj, key))
}

export default values
