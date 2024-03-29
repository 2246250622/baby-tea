// o
import { valid } from './util'
import is from './is'
import { OObject } from './types'

/**
 * Check whether all the objects are equal
 * (only 1 layer deep, use equalDeep for a deep comparison)
 *
 * @example
 * ```
 * const a = { a: 1, b: { c: 2 } };
 * const b = { a: 1, b: { c: 2 } };
 * const c = { a: 1 };
 * const d = { a: 2 };
 * const e = { a: 1, b: { c: 2 } };
 * const f = { a: 1, b: { c: 3 } };
 *
 * equal(a, b); // => true
 * equal(c, d); // => false
 * equal(e, f); // => true
 * ```
 *
 * @throws TypeError
 *
 * @since 1.0.0
 * @version 2.0.0
 */
function equal (obj: OObject, ...compareWith: OObject[]): boolean {
  // check if the arg specified is an object
  if (!valid(obj)) throw new TypeError(`Expected Object, got ${typeof obj} ${obj}`)

  // check if all the compare values are objects
  if (!valid.apply(null, compareWith)) {
    throw new TypeError(`Expected Object[], got ${typeof compareWith} ${compareWith}`)
  }

  // get the keys of the specified object
  const keys = Object.keys(obj)

  // loop over all the specified compare values and if every compared value
  // returns true then return true for equal
  return compareWith.every((currentObject: OObject): boolean => {
    // get the keys for the current object
    const currentKeys = Object.keys(currentObject)

    // if the current object and the original don't have the same amount of keys
    // then return false because on is missing or it has extras
    if (currentKeys.length !== keys.length) return false

    // if the current object doesn't contain the keys the original object
    // has then return true because the keys don't match
    if (!keys.every((key): boolean => currentKeys.includes(key))) return false

    // create a function to check if the 2 values equal
    const valueIsEqual = (value: any, compareValue: any): boolean => {
      // if one of values is an object
      if (is(value) || is(compareValue)) {
        // return true if both values are objects since this is
        // only 1 layer deep
        return is(value) && is(compareValue)
      }

      // if one of the values is an array
      if (Array.isArray(value) || Array.isArray(compareValue)) {
        // return true if both values are an array since this isn't
        // comparing array values
        return Array.isArray(value) && Array.isArray(compareValue)
      }

      // if one of the values is a function
      if (typeof value === 'function' || typeof compareValue === 'function') {
        // both values are a function
        if (typeof value === 'function' && typeof compareValue === 'function') {
          // return true if both functions are the same
          return value.toString() === compareValue.toString()
        }

        // return false if the functions do not match or if only
        // one of the values is a function
        // istanbul ignore next
        return false
      }

      // anything else just compare as normal and return true if both
      // values match
      return value === compareValue
    }

    // if all values are equal to the original object return true
    return keys.every(
      (key): boolean => valueIsEqual(obj[key], currentObject[key])
    )
  })
}

export default equal
