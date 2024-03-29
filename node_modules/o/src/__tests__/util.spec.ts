import { dotNotation, valid } from '../util'

describe('util', (): void => {
  describe('dot notation', (): void => {
    describe('from', (): void => {
      test('should convert a path into dot notation parts', (): void => {
        const path = 'path.to.this.place'

        const result = dotNotation.from(path)

        expect(result).toHaveLength(4)
      })

      test('should handle escaped dots within paths', (): void => {
        const path = 'path.to.this.dot\\.place'

        const result = dotNotation.from(path)

        expect(result).toHaveLength(4)
        expect(result[3]).toBe('dot.place')
      })
    })

    describe('to', (): void => {
      test('should convert an array of path parts to a single path string', (): void => {
        const parts = [
          'path',
          'to',
          'this',
          'place'
        ]

        const result = dotNotation.to(parts)

        expect(typeof result).toBe('string')
        expect(result).toBe('path.to.this.place')
      })

      test('should replace dots within part to "\\."', (): void => {
        const parts = [
          'path',
          'to',
          'this',
          'dot.place'
        ]

        const result = dotNotation.to(parts)

        expect(result).toBe('path.to.this.dot\\.place')
      })
    })
  })

  describe('valid', (): void => {
    test('should return true of all args are objects', (): void => {
      expect(valid({})).toBe(true)
      expect(valid({}, {})).toBe(true)
      expect(valid({}, 'testing')).toBe(false)
      expect(valid({}, 1)).toBe(false)
      expect(valid({}, {}, false)).toBe(false)
    })
  })
})
