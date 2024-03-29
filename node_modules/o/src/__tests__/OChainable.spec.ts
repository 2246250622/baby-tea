import OChainable from '../OChainable'
import { OObject } from '../types'

describe('OChainable', (): void => {
  test('should have all library & custom functions', (): void => {
    const funcs = [
      'constructor', 'updateCurrent', 'original',
      'toJSON', 'toPrettyJSON', 'originalToJSON',
      'originalToPrettyJSON', 'object', 'objectRef',
      'isModified', 'totalModifications',

      // library funcs
      'clean', 'clone', 'deepEqual', 'deflate',
      'del', 'each', 'empty', 'equal', 'every',
      'filter', 'find', 'flip', 'get', 'has',
      'includes', 'inflate', 'keyOf', 'keys',
      'map', 'merge', 'set', 'shallowMerge',
      'size', 'slice', 'some', 'sort', 'values'
    ]
    const item = new OChainable({})
    const properties = Object.getOwnPropertyNames(
      Object.getPrototypeOf(item)
    )

    const missingFunc = !funcs.every((func): boolean => properties.includes(func))
    const extraFunc = !properties.every((prop): boolean => funcs.includes(prop))

    expect(missingFunc).toBe(false)
    expect(extraFunc).toBe(false)
  })

  test('isModified should return true once the object is modified', (): void => {
    const obj = {
      a: 1
    }
    const item = new OChainable(obj)

    expect(item.isModified()).toBe(false)

    item.set('a', 2)

    expect(item.isModified()).toBe(true)
  })

  test('totalModifications should return the modification count', (): void => {
    const obj = {
      a: 1
    }
    const item = new OChainable(obj)

    item.set('a', 2)

    expect(item.totalModifications()).toBe(1)

    item.del('a')

    expect(item.totalModifications()).toBe(2)
  })

  test('original should always return the original object', (): void => {
    const obj = {
      a: 1
    }
    const item = new OChainable(obj)

    item.set('a', 2)
    item.del('a')

    expect(item.original().a).toBe(obj.a)
  })

  test('json functions should return the correct object and in the correct format', (): void => {
    const obj = {
      a: 1
    }
    const item = new OChainable(obj)

    item.set('a', 2)

    expect(item.toJSON()).toBe(JSON.stringify(item.object()))
    expect(item.toPrettyJSON()).toBe(JSON.stringify(item.object(), null, 2))
    expect(item.originalToJSON()).toBe(JSON.stringify(obj))
    expect(item.originalToPrettyJSON()).toBe(JSON.stringify(obj, null, 2))
  })

  test('object should return the current object and shouldn\'t be a reference', (): void => {
    const obj = {
      a: 1
    }
    const item = new OChainable(obj)

    item.set('a', 2)

    const returnObj = item.object()

    expect(returnObj.a).toBe(2)

    returnObj.a = 3

    expect(item.object().a).toBe(2)
  })

  test('objectRef should return the current object as a reference', (): void => {
    const obj = {
      a: 1
    }
    const item = new OChainable(obj)

    item.set('a', 2)

    const returnObj = item.objectRef()

    expect(returnObj.a).toBe(2)

    returnObj.a = 3

    expect(item.objectRef().a).toBe(3)
  })

  test('all library functions work as expected', (): void => {
    const cbEach = (): void => {}
    const cbEvery = (): boolean => true
    const cbFilter = (): boolean => false
    const cbFind = (): boolean => true
    const cbMap = (): number => 2
    const cbSome = (): boolean => true
    const cbSort = (): number => 1

    /* clean        */ expect(Object.keys(new OChainable({ a: undefined, b: null }).clean({}).object())).toHaveLength(0)
    /* clone        */ expect(Object.keys(new OChainable({ a: 1 }).clone())).toHaveLength(1)
    /* deepEqual    */ expect(new OChainable({ a: 1 }).deepEqual({ a: 1 })).toBe(true)
    /* deflate      */ expect(new OChainable({ a: { b: 1 } }).deflate().object()['a.b']).toBe(1)
    /* del          */ expect(Object.keys(new OChainable({ a: 1 }).del('a').object())).toHaveLength(0)
    /* each         */ expect(new OChainable({ a: 1 }).each(cbEach, {}).object().a).toBe(1)
    /* empty        */ expect(new OChainable({}).empty()).toBe(true)
    /* equal        */ expect(new OChainable({ a: 1 }).equal({ a: 1 })).toBe(true)
    /* every        */ expect(new OChainable({ a: 1 }).every(cbEvery, {})).toBe(true)
    /* filter       */ expect(Object.keys(new OChainable({ a: 1 }).filter(cbFilter, {}).object())).toHaveLength(0)
    /* find         */ expect(new OChainable({ a: 1 }).find(cbFind, {})).toBe('a')
    /* flip         */ expect(new OChainable({ a: 'b' }).flip({}).object().b).toBe('a')
    /* get          */ expect(new OChainable({ a: 1 }).get('a', undefined)).toBe(1)
    /* has          */ expect(new OChainable({ a: 1 }).has('a')).toBe(true)
    /* includes     */ expect(new OChainable({ a: 1 }).includes(1, {})).toBe(true)
    /* inflate      */ expect(new OChainable({ 'a.b': 1 }).inflate().object().a.b).toBe(1)
    /* keyOf        */ expect(new OChainable({ a: 1 }).keyOf(1, {})).toBe('a')
    /* keys         */ expect(new OChainable({ a: 1 }).keys({})).toHaveLength(1)
    /* map          */ expect(new OChainable({ a: 1 }).map(cbMap, {}).object().a).toBe(2)
    /* merge        */ expect(new OChainable({ a: 1 }).merge({ a: 2 }).object().a).toBe(2)
    /* set          */ expect(new OChainable({ a: 1 }).set('a', 2).object().a).toBe(2)
    /* shallowMerge */ expect(new OChainable({ a: 1 }).shallowMerge({ a: 2 }).object().a).toBe(2)
    /* size         */ expect(new OChainable({ a: 1 }).size()).toBe(1)
    /* slice        */ expect(new OChainable({ a: 1, b: 2 }).slice(1, 2, {}).b).toBe(2)
    /* some         */ expect(new OChainable({ a: 1 }).some(cbSome, {})).toBe(true)
    /* sort         */ expect(new OChainable({ a: 1 }).sort(cbSort, {}).object().a).toBe(1)
    /* values       */ expect(new OChainable({ a: 1 }).values({})).toHaveLength(1)
  })

  test('should throw TypeError for invalid arguments', (): void => {
    const invalidObj: unknown = 'testing'

    expect((): OChainable => new OChainable(invalidObj as OObject))
      .toThrow(new TypeError('Expected Object, got string testing'))
  })
})
