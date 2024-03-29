import { OObject } from './types';
/**
 * Deflate the specified object into a one deep object
 * (keys will be dot notation)
 *
 * @example
 * ```
 * const a = { a: 1, b: { c: 2 } };
 *
 * deflate(a); // => { a: 1, 'b.c': 2 }
 * ```
 *
 * @throws TypeError
 *
 * @since 1.0.0
 * @version 2.0.0
 */
declare function deflate(obj: OObject): OObject;
export default deflate;
