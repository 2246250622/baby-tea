import { OObject } from './types';
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
declare function merge(target: OObject, ...sources: OObject[]): OObject;
export default merge;
