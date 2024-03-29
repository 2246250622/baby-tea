// o
import { valid } from './util'
import clone from './clone'
import { OObject } from './types'

/**
 * Merge two or more objects into one with the most right having
 * the highest priority
 *
 * @example
 * ```
 * const a = { a: 1 };
 * const b = { b: 2 };
 * const c = { b: 5 };
 *
 * shallowMerge(a, b); // => { a: 1, b: 2 }
 * shallowMerge(a, b, c); // => { a: 1, b: 5 }
 * ```
 *
 * @throws TypeError
 *
 * @since 2.1.0
 * @version 2.1.1
 */
function shallowMerge (target: OObject, ...sources: OObject[]): OObject {
  // check if the arg specified is an object
  if (!valid(target)) throw new TypeError(`Expected Object, got ${typeof target} ${target}`)

  // check if all the compare values are objects
  if (!valid.apply(null, sources)) {
    throw new TypeError(`Expected Object[], got ${typeof sources} ${sources}`)
  }

  // clone the target object and make it the current result
  const result: OObject = clone(target)

  // foreach over the sources
  sources.forEach((sourceObject): void => {
    // get the result (target to start with) and source object keys
    const resultKeys = Object.keys(result)
    const sourceKeys = Object.keys(sourceObject)

    // foreach over the result (target to start with) keys
    resultKeys.forEach((key): void => {
      // if the source contains the target key
      if (sourceKeys.includes(key)) {
        // set the result key as the source value
        result[key] = sourceObject[key]
      }
    })

    // foreach over the source keys
    sourceKeys.forEach((key): void => {
      // if the result doesn't include the key
      if (!resultKeys.includes(key)) {
        // set the new key/value onto the result object
        result[key] = sourceObject[key]
      }
    })
  })

  // return the result
  return result
}

export default shallowMerge
