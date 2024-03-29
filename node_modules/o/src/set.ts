// o
import { valid, dotNotation } from './util'
import clone from './clone'
import is from './is'
import { OObject } from './types'

/**
 * Set the value to the path on the specified object
 *
 * @example
 * ```
 * const a = { a: 1 };
 *
 * set(a, 'b.c', 2); // => { a: 1, b: { c: 2 } }
 * ```
 *
 * @throws TypeError
 *
 * @since 1.0.0
 * @version 2.0.0
 */
function set (obj: OObject, path: string, value: any): OObject {
  // check if the arg specified is an object
  if (!valid(obj)) throw new TypeError(`Expected Object, got ${typeof obj} ${obj}`)
  if (typeof path !== 'string') throw new TypeError(`Expected String, got ${typeof path} ${path}`)

  let cloned = clone(obj)
  const result = cloned

  const pathParts = dotNotation.from(path)

  pathParts.forEach((part, index): void => {
    if (!is(cloned[part])) {
      cloned[part] = {}
    }

    if (index === pathParts.length - 1) {
      cloned[part] = value
    }

    cloned = cloned[part]
  })

  return result
}

export default set
