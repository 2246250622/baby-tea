import { OObject } from './types';
/**
 * Inflate the specified object into a multi level object
 * (reverse of deflate)
 *
 * @example
 * ```
 * const a = { a: 1, 'b.c': 2 };
 *
 * inflate(a); // => { a: 1, b: { c: 2 } }
 * ```
 *
 * @throws TypeError
 *
 * @since 1.0.0
 * @version 2.0.0
 */
declare function inflate(obj: OObject): OObject;
export default inflate;
