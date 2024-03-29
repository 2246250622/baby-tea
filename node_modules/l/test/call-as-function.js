'use strict'
import test from 'ava'

const l = require('../')

test('call as function', t => {
  t.plan(1)
  return l([
    {
      $type: 'async',
      func: (value, done) => setTimeout(() => done(null, value * 3), 1)
    },
    (val) => Promise.resolve(val * 2),
    (val) => val * 7
  ])(1).then(function (result) {
    t.is(result, 42)
  })
})

test('call without an array', t => {
  t.plan(1)
  return l({
    one: Promise.resolve(1),
    two: (num) => num / 4
  })(8).then(function (result) {
    t.deepEqual(result, {
      one: 1,
      two: 2
    })
  })
})

test('call multiple arguments', t => {
  t.plan(1)
  return l(
    (num) => num * 2,
    (num) => Promise.resolve(num * 3),
    (num, done) => done(null, num * 7)
  )(1).then(function (result) {
    t.is(result, 42)
  })
})
