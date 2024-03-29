// self
import {
  OObject, CleanOptions, EachCallback, EachOptions,
  EveryCallback, EveryOptions, FilterCallback,
  FilterOptions, FindCallback, FindOptions,
  FlipOptions, KeysOptions, IncludesOptions,
  KeyOfOptions, MapCallback, MapOptions,
  SliceOptions, SomeCallback, SomeOptions,
  SortCallback, SortOptions, ValuesOptions
} from './types'
import clone from './clone'
import clean from './clean'
import deepEqual from './deepEqual'
import deflate from './deflate'
import del from './del'
import each from './each'
import empty from './empty'
import equal from './equal'
import every from './every'
import filter from './filter'
import find from './find'
import flip from './flip'
import get from './get'
import has from './has'
import keys from './keys'
import includes from './includes'
import inflate from './inflate'
import keyOf from './keyOf'
import map from './map'
import merge from './merge'
import set from './set'
import shallowMerge from './shallowMerge'
import size from './size'
import slice from './slice'
import some from './some'
import sort from './sort'
import values from './values'
import { valid } from './util'

export default class OChainable {
  // the original object used to create this instance
  private readonly originalObject: OObject;

  // the current object aka the modified version
  private currentObject: OObject;

  // the number of times the object has been updated
  private modificationCount: number = 0;

  /**
   * Create a new OChainable
   *
   * @param {OObject} obj
   *
   * @throws TypeError
   *
   * @since 2.2.1
   * @version 2.2.1
   */
  public constructor (obj: OObject) {
    // check if the args specified are the correct type
    if (!valid(obj)) throw new TypeError(`Expected Object, got ${typeof obj} ${obj}`)

    this.originalObject = clone(obj)
    this.currentObject = clone(obj)
  }

  /**
   * Set the current object value
   *
   * @param {OObject} obj The new object
   *
   * @since 2.2.1
   * @version 2.2.1
   */
  protected updateCurrent (obj: OObject): void {
    this.modificationCount = this.modificationCount + 1
    this.currentObject = obj
  }

  /**
   * Get the original object
   *
   * @since 2.2.1
   * @version 2.2.1
   */
  public original (): OObject {
    return this.originalObject
  }

  /**
   * Get the current object as a JSON string
   *
   * @since 2.2.1
   * @version 2.2.1
   */
  public toJSON (): string {
    return JSON.stringify(this.currentObject)
  }

  /**
   * Get the current object as a pretty JSON string
   *
   * @since 2.2.1
   * @version 2.2.1
   */
  public toPrettyJSON (): string {
    return JSON.stringify(this.currentObject, null, 2)
  }

  /**
   * Get the original object as a JSON string
   *
   * @since 2.2.1
   * @version 2.2.1
   */
  public originalToJSON (): string {
    return JSON.stringify(this.originalObject)
  }

  /**
   * Get the original object as a pretty JSON string
   *
   * @since 2.2.1
   * @version 2.2.1
   */
  public originalToPrettyJSON (): string {
    return JSON.stringify(this.originalObject, null, 2)
  }

  /**
   * A clone of the current object
   *
   * @since 2.2.1
   * @version 2.2.1
   */
  public object (): OObject {
    return clone(this.currentObject)
  }

  /**
   * A reference of the current object
   * (will change if you continue to modify)
   *
   * @since 2.2.1
   * @version 2.2.1
   */
  public objectRef (): OObject {
    return this.currentObject
  }

  /**
   * Check if the object has been modified
   *
   * @since 2.2.1
   * @version 2.2.1
   */
  public isModified (): boolean {
    return this.modificationCount > 0
  }

  /**
   * Check if the object has been modified
   *
   * @since 2.2.1
   * @version 2.2.1
   */
  public totalModifications (): number {
    return this.modificationCount
  }

  // rest of the methods are just the standard
  // functions from the library

  /**
   * Clean the object
   *
   * @see https://o.hammy2899.dev/modules/_clean_.html
   */
  /* istanbul ignore next */
  public clean (options: CleanOptions = {}): OChainable {
    this.updateCurrent(clean(this.currentObject, options))
    return this
  }

  /**
   * Clone the object
   *
   * @see https://o.hammy2899.dev/modules/_clone_.html
   */
  /* istanbul ignore next */
  public clone (): OObject {
    return clone(this.currentObject)
  }

  /**
   * Check if the object is deeply equal to the specified objects
   *
   * @see https://o.hammy2899.dev/modules/_deepequal_.html
   */
  /* istanbul ignore next */
  public deepEqual (...compareWith: OObject[]): boolean {
    return deepEqual
      .apply(
        null,
        ([this.currentObject, ...compareWith] as [OObject, OObject[]])
      )
  }

  /**
   * Deflate the object
   *
   * @see https://o.hammy2899.dev/modules/_deflate_.html
   */
  /* istanbul ignore next */
  public deflate (): OChainable {
    this.updateCurrent(deflate(this.currentObject))
    return this
  }

  /**
   * Delete a property from the object
   *
   * @see https://o.hammy2899.dev/modules/_del_.html
   */
  /* istanbul ignore next */
  public del (path: string): OChainable {
    this.updateCurrent(del(this.currentObject, path))
    return this
  }

  /**
   * Foreach over the objects keys and values
   *
   * @see https://o.hammy2899.dev/modules/_each_.html
   */
  /* istanbul ignore next */
  public each (cb: EachCallback, options: EachOptions = {}): OChainable {
    each(this.currentObject, cb, options)
    return this
  }

  /**
   * Check if the object is empty
   *
   * @see https://o.hammy2899.dev/modules/_empty_.html
   */
  /* istanbul ignore next */
  public empty (): boolean {
    return empty(this.currentObject)
  }

  /**
   * Check if the object is equal to the specified objects
   *
   * @see https://o.hammy2899.dev/modules/_equal_.html
   */
  /* istanbul ignore next */
  public equal (...compareWith: OObject[]): boolean {
    return equal
      .apply(
        null,
        ([this.currentObject, ...compareWith] as [OObject, OObject[]])
      )
  }

  /**
   * Loop over all object keys and values and check if all
   * evaluations are truthy
   *
   * @see https://o.hammy2899.dev/modules/_every_.html
   */
  /* istanbul ignore next */
  public every (cb: EveryCallback, options: EveryOptions = {}): boolean {
    return every(this.currentObject, cb, options)
  }

  /**
   * Filter the objects keys and values depending on the
   * callback evaluation
   *
   * @see https://o.hammy2899.dev/modules/_filter_.html
   */
  /* istanbul ignore next */
  public filter (cb: FilterCallback, options: FilterOptions = {}): OChainable {
    this.updateCurrent(filter(this.currentObject, cb, options))
    return this
  }

  /**
   * Find the key matching the callback evaluation
   *
   * @see https://o.hammy2899.dev/modules/_find_.html
   */
  /* istanbul ignore next */
  public find (cb: FindCallback, options: FindOptions = {}): string | undefined {
    return find(this.currentObject, cb, options)
  }

  /**
   * Flip the objects keys for values and values for keys
   *
   * @see https://o.hammy2899.dev/modules/_flip_.html
   */
  /* istanbul ignore next */
  public flip (options: FlipOptions = {}): OChainable {
    this.updateCurrent(flip(this.currentObject, options))
    return this
  }

  /**
   * Get the value from the path in the object
   *
   * @see https://o.hammy2899.dev/modules/_get_.html
   */
  /* istanbul ignore next */
  public get (path: string, defaultValue: any = undefined): any {
    return get(this.currentObject, path, defaultValue)
  }

  /**
   * Check if the object has a value at the paths
   *
   * @see https://o.hammy2899.dev/modules/_has_.html
   */
  /* istanbul ignore next */
  public has (...paths: string[]): boolean {
    return has
      .apply(
        null,
        ([this.currentObject, ...paths] as [OObject, ...string[]])
      )
  }

  /**
   * Check if the object includes a value
   *
   * @see https://o.hammy2899.dev/modules/_includes_.html
   */
  /* istanbul ignore next */
  public includes (value: any, options: IncludesOptions = {}): boolean {
    return includes(this.currentObject, value, options)
  }

  /**
   * Inflate the object
   *
   * @see https://o.hammy2899.dev/modules/_inflate_.html
   */
  /* istanbul ignore next */
  public inflate (): OChainable {
    this.updateCurrent(inflate(this.currentObject))
    return this
  }

  /**
   * Get the key to the specified value
   *
   * @see https://o.hammy2899.dev/modules/_keyof_.html
   */
  /* istanbul ignore next */
  public keyOf (value: any, options: KeyOfOptions = {}): string | undefined {
    return keyOf(this.currentObject, value, options)
  }

  /**
   * Check if the object has a value at the paths
   *
   * @see https://o.hammy2899.dev/modules/_keys_.html
   */
  /* istanbul ignore next */
  public keys (options: KeysOptions = {}): string[] {
    return keys(this.currentObject, options)
  }

  /**
   * Loop over the object and compute new values using the callback
   *
   * @see https://o.hammy2899.dev/modules/_map_.html
   */
  /* istanbul ignore next */
  public map (cb: MapCallback, options: MapOptions = {}): OChainable {
    this.updateCurrent(map(this.currentObject, cb, options))
    return this
  }

  /**
   * Merge all sources into the object
   *
   * @see https://o.hammy2899.dev/modules/_merge_.html
   */
  /* istanbul ignore next */
  public merge (...sources: OObject[]): OChainable {
    this.updateCurrent(merge
      .apply(
        null,
        ([this.currentObject, ...sources] as [OObject, ...OObject[]])
      ))
    return this
  }

  /**
   * Set the value to the path on the object
   *
   * @see https://o.hammy2899.dev/modules/_set_.html
   */
  /* istanbul ignore next */
  public set (path: string, value: any): OChainable {
    this.updateCurrent(set(this.currentObject, path, value))
    return this
  }

  /**
   * Merge sources with the object
   *
   * @see https://o.hammy2899.dev/modules/_shallowmerge_.html
   */
  /* istanbul ignore next */
  public shallowMerge (...sources: OObject[]): OChainable {
    this.updateCurrent(shallowMerge
      .apply(
        null,
        ([this.currentObject, ...sources] as [OObject, ...OObject[]])
      ))
    return this
  }

  /**
   * Get the size of the object
   *
   * @see https://o.hammy2899.dev/modules/_size_.html
   */
  /* istanbul ignore next */
  public size (): number {
    return size(this.currentObject)
  }

  /**
   * Get a portion of the object
   *
   * @see https://o.hammy2899.dev/modules/_slice_.html
   */
  /* istanbul ignore next */
  public slice (
    start: number,
    end: number = size(this.currentObject),
    options: SliceOptions = {}
  ): OObject {
    return slice(this.currentObject, start, end, options)
  }

  /**
   * Check if some items in the object evaluates to truthy
   *
   * @see https://o.hammy2899.dev/modules/_some_.html
   */
  /* istanbul ignore next */
  public some (cb: SomeCallback, options: SomeOptions = {}): boolean {
    return some(this.currentObject, cb, options)
  }

  /**
   * Sort the object with the callback evaluation
   *
   * @see https://o.hammy2899.dev/modules/_sort_.html
   */
  /* istanbul ignore next */
  public sort (cb: SortCallback, options: SortOptions = {}): OChainable {
    this.updateCurrent(sort(this.currentObject, cb, options))
    return this
  }

  /**
   * Get the values from the object
   *
   * @see https://o.hammy2899.dev/modules/_values_.html
   */
  /* istanbul ignore next */
  public values (options: ValuesOptions = {}): any[] {
    return values(this.currentObject, options)
  }
}
