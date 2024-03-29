// o
import { valid } from './util'
import defaults from './defaults'
import each from './each'
import is from './is'
import { FlipOptions, OObject } from './types'

// default options
const getDefaults = defaults({
  follow: false,
  useToString: false
})

/**
 * Flip an objects keys fro values and values for keys
 *
 * @example
 * ```
 * const a = { a: 1, b: 2, c: 3 };
 * const b = { a: 1, b: { c: 2 } };
 * const c = { a: 1, b: { c: 2 } };
 *
 * flip(a); // => { '1': 'a', '2': 'b', '3': 'c' }
 * flip(b, {
 *   follow: true,
 * }); // => { '1': 'a', '2': 'b.c' }
 * flip(b, {
 *   useToString: true,
 * }); // => { '1': 'a', '{"c":2}': 'b' }
 * ```
 *
 * @throws TypeError
 *
 * @since 1.0.0
 * @version 2.0.0
 */
function flip (obj: OObject, options: FlipOptions = {}): OObject {
  // extract options
  const {
    follow,
    useToString
  } = getDefaults(options) as FlipOptions

  // check if the args specified are the correct type
  if (!valid(obj)) throw new TypeError(`Expected Object, got ${typeof obj} ${obj}`)
  if (typeof follow !== 'boolean') throw new TypeError(`Expected Boolean, got ${typeof follow} ${follow}`)
  if (typeof useToString !== 'boolean') throw new TypeError(`Expected Boolean, got ${typeof useToString} ${useToString}`)

  // create an empty object for the result
  const result: OObject = {}

  // for each over the object using the each function which makes it easier
  // for us to loop since we can just pass our own callback to evaluate the
  // the return value and we can pass follow directly to each and it will
  // handle the deep looping for us
  each(obj, (key, value: any): void => {
    // if the value is a string or number and can be used
    // as the key
    if (typeof value === 'string' || typeof value === 'number') {
      // add the value/key to the result object
      result[value] = key
    } else if (typeof value !== 'string' && useToString) {
      // if the value is not a string but useToString is true

      // if the value is an object or array
      if (is(value) || Array.isArray(value)) {
        // cover it to json and use the json as the key
        result[JSON.stringify(value)] = key
      } else {
        // if it is anything else convert it to a string
        result[String(value).toString()] = key
      }
    }
  }, {
    follow
  })

  // return the result
  return result
}

export default flip
