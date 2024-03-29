import { OObject } from './types';
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
declare function set(obj: OObject, path: string, value: any): OObject;
export default set;
