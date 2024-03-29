import * as o from '../index'

describe('index', (): void => {
  test('should have 33 functions (+ default)', (): void => {
    expect(Object.keys(o)).toHaveLength(33)
  })

  test('all key values should be functions', (): void => {
    const funcs = Object.assign({}, o)
    delete funcs.default

    expect(Object.values(funcs)
      .every((v): boolean => typeof v === 'function')).toBe(true)
  })
})
