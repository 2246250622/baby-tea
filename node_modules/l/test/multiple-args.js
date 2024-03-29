'use strict'
import test from 'ava'
const l = require('../')

test('call with multiple', t => {
  t.plan(4)
  return l([function (a, b, done) {
    t.is(a, 29)
    t.is(b, 13)
    t.is(typeof done, 'function')
    done(null, a + b)
  }])(29, 13).then(result => {
    t.is(result, 42)
  })
})

test('call with no args', t => {
  t.plan(3)
  return l([function (done) {
    t.is(typeof done, 'function')
    t.is(arguments.length, 1)
    done(null, 99)
  }])().then(result => {
    t.is(result, 99)
  })
})

test.cb('return multiple values', t => {
  t.plan(4)
  return l([function (done) {
    done(null, 1, 2, 3)
  }])(function (err, a, b, c) {
    t.is(err, null)
    t.is(a, 1)
    t.is(b, 2)
    t.is(c, 3)
    t.end()
  })
})

test.cb('multi level', t => {
  t.plan(4)
  l([
    (a, b, done) => done(null, a * 2, b * 3, a + b),
    (a, b, c, done) => a * b + c,
    (res, done) => done(null, Math.floor(res / 6), res % 6)
  ])(1, 2, function (err, res, rem) {
    t.is(err, null)
    t.is(res, 2)
    t.is(rem, 3)
    t.is(arguments.length, 3)
    t.end()
  })
})
