// o
import { valid } from './util'
import clone from './clone'
import shallowMerge from './shallowMerge'
import deflate from './deflate'
import inflate from './inflate'
import { OObject } from './types'

/**
 * Merge all sources into the target object with the most right
 * source having the highest priority
 *
 * @example
 * ```
 * const a = { a: 1, b: { c: 2 } };
 * const b = { b: { d: 3 } };
 * const c = { b: { c: 3 } };
 *
 * merge(a, b); // => { a: 1, b: { c: 2, d: 3 } }
 * merge(a, b, c); // => { a: 1, b: { c: 3, d: 3 } }
 * ```
 *
 * @throws TypeError
 *
 * @since 1.0.0
 * @version 2.1.1
 */
function merge (target: OObject, ...sources: OObject[]): OObject {
  // check if the arg specified is an object
  if (!valid(target)) throw new TypeError(`Expected Object, got ${typeof target} ${target}`)

  // check if all the compare values are objects
  if (!valid.apply(null, sources)) {
    throw new TypeError(`Expected Object[], got ${typeof sources} ${sources}`)
  }

  // clone the target and set it as the result
  const result: OObject = deflate(clone(target))

  // deflate all the sources
  const deflatedSources = sources.map((s): OObject => deflate(s))

  const shallowMergeArgs: [OObject, ...OObject[]] = [result, ...deflatedSources]

  // return the result
  return inflate(
    shallowMerge.apply(
      null,
      shallowMergeArgs
    )
  )
}

export default merge
