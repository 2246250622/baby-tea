import { OObject } from './types';
/**
 * Check if an object has the specified path (using dot notation)
 *
 * @example
 * ```
 * const a = { a: 1, b: { c: 2 } };
 *
 * has(a, 'b.c'); // => true
 * has(a, 'b.d'); // => false
 * ```
 *
 * @throws Error
 *
 * @since 1.0.0
 * @version 2.0.0
 */
declare function has(obj: OObject, ...paths: string[]): boolean;
export default has;
