import { OObject } from './types';
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
declare function shallowMerge(target: OObject, ...sources: OObject[]): OObject;
export default shallowMerge;
