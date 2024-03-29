/**
 * Check if the specified values are objects.
 * All values must be objects to assert true.
 *
 * @example
 * ```
 * const a = { a: 1 };
 * const b = { b: 2 };
 * const c = 'I am a string';
 *
 * is(a); // => true
 * is(a, b); // => true
 * is(a, b, c); // => false
 * ```
 *
 * @since 1.0.0
 * @version 2.0.0
 */
declare function is(...args: any[]): boolean;
export default is;
