import { OObject } from './types';
/**
 * Check whether all objects deeply equal each other
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
 * deepEqual(a, b); // => true
 * deepEqual(c, d); // => false
 * deepEqual(e, f); // => false
 * ```
 *
 * @throws TypeError
 *
 * @since 1.0.0
 * @version 2.0.0
 */
declare function deepEqual(obj: OObject, ...compareWith: OObject[]): boolean;
export default deepEqual;
