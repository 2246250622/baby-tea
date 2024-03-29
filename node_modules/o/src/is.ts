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
function is (...args: any[]): boolean {
  // check if the value is an instance of Object
  return args.every((obj): boolean => {
    return obj instanceof Object &&
      // check if the value constructor is Object
      obj.constructor === Object
  })
}

export default is
