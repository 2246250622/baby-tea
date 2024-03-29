'use strict'
import test from 'ava'

const Line = require('../').Line

test('promise rejection', t => {
  t.plan(1)
  const l = new Line([
    (val) => val * 3,
    (val) => val * 2,
    (val) => Promise.reject(val * 7)
  ])
  return l.execute(1).catch((reason) => {
    t.deepEqual(Object.assign({}, reason), {
      step: 2,
      value: 6,
      error: 42,
      ctxt: {}
    })
  })
})

test('catchable error', t => {
  t.plan(4)
  const l = new Line([
    (val) => val * 3,
    /* jshint ignore:start */
    () => callNonExistentFunction() // eslint-disable-line no-undef
    /* jshint ignore:end */
  ])
  return l.execute(1).catch((reason) => {
    t.is(reason.step, 1)
    t.is(reason.value, 3)
    t.deepEqual(reason.ctxt, {})
    t.true(reason instanceof ReferenceError)
  })
})

test('async error', t => {
  t.plan(4)
  const l = new Line([
    function (val, done) {
      this.value1 = val
      setTimeout(function () {
        return done('Async Error')
      }, 1)
    }
  ])
  return l.execute(19).catch((reason) => {
    t.is(reason.step, 0)
    t.is(reason.value, 19)
    t.deepEqual(reason.ctxt, {value1: 19})
    t.is(reason.error, 'Async Error')
  })
})
