// o
import { valid } from './util'
import defaults from './defaults'
import each from './each'
import { IncludesOptions, OObject } from './types'

// default options
const getDefaults = defaults({
  follow: false
})

/**
 * Check if an object includes the specified value
 *
 * @example
 * ```
 * const a = { a: 1, b: 2, c: 3 };
 * const b = { a: 1, b: { c: 2 } };
 *
 * includes(a, 1); // => true
 * includes(b, 2); // => false
 * includes(b, 2, {
 *   follow: true,
 * }); // => true
 * ```
 *
 * @throws TypeError
 *
 * @since 1.0.0
 * @version 2.0.0
 */
function includes (obj: OObject, value: any, options: IncludesOptions = {}): boolean {
  // extract options
  const {
    follow
  } = getDefaults(options) as IncludesOptions

  // check if the args specified are the correct type
  if (!valid(obj)) throw new TypeError(`Expected Object, got ${typeof obj} ${obj}`)
  if (typeof follow !== 'boolean') throw new TypeError(`Expected Boolean, got ${typeof follow} ${follow}`)

  // create the result variable which is defaulted to false
  let result = false

  // for each over the object using the each function which makes it easier
  // for us to loop since we can just pass our own callback to evaluate the
  // the return value and we can pass follow directly to each and it will
  // handle the deep looping for us
  each(obj, (key, objValue): void => {
    // if the result is still false
    if (!result) {
      // if the two values equal set the result as true
      if (objValue === value) result = true
    }
  }, {
    follow
  })

  // return the result
  return result
}

export default includes
