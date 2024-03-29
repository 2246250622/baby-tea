import { OObject } from './types';
/**
 * Get the size of the specified object.
 *
 * @example
 * ```
 * const a = { a: 1, b: 2 };
 *
 * size(a); // => 2
 * ```
 *
 * @throws TypeError
 *
 * @since 1.0.0
 * @version 2.0.0
 */
declare function size(obj: OObject): number;
export default size;
