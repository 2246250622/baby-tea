import is from '../is'

describe('is', (): void => {
  test('should only return true if all specified values are objects', (): void => {
    expect(is({})).toBe(true)
    expect(is('1')).toBe(false)
    expect(is(1)).toBe(false)
    expect(is(false)).toBe(false)
    expect(is((): void => {})).toBe(false)
  })

  test('should evaluate all values specified', (): void => {
    expect(is({}, {}, {})).toBe(true)
    expect(is({}, {}, 'b')).toBe(false)
  })
})
