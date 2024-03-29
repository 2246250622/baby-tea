import { OObject } from './types';
/**
 * Check if the specified object is empty.
 *
 * @example
 * ```
 * const a = { a: 1, b: 2 };
 * const b = {};
 *
 * empty(a); // => false
 * empty(b); // => true
 * ```
 *
 * @throws Error
 *
 * @since 1.0.0
 * @version 2.0.0
 */
declare function empty(obj: OObject): boolean;
export default empty;
