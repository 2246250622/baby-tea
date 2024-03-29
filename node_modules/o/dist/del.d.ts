import { OObject } from './types';
/**
 * Delete the specified path from the object
 *
 * @example
 * ```
 * const a = { a: 1, b: { c: 2 } };
 *
 * del(a, 'b.c'); // => { a: 1, b: {} }
 * ```
 *
 * @throws TypeError
 *
 * @since 1.0.0
 * @version 2.0.0
 */
declare function del(obj: OObject, path: string): OObject;
export default del;
