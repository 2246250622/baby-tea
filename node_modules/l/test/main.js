'use strict'
import test from 'ava'
const crypto = require('crypto')

const line = require('../')

var l = line([
  (val) => val * 2,
  (val) => Promise.resolve(val * 3),
  function add4 (val, done) {
    this.testContext = `HI! ${val}`
    setTimeout(function () {
      done(null, val + 4)
    }, 1)
  },
  (val) => '' + val,
  {
    stream: () => crypto.createHash('sha1')
  },
  {
    stream: () => crypto.createHash('md5')
  },
  (val) => val.toString('base64'),
  function ctxt (val) {
    this.final = val
    return this
  }
])
test.cb('mixed chain', t => {
  t.plan(2)
  l(6, {preset: 'CONTEXT'}, function (err, result) {
    t.is(err, null)
    t.deepEqual(result, {
      preset: 'CONTEXT',
      final: 'tXaGpbo9OuZfxOCD1qrKaA==',
      testContext: 'HI! 36'
    })
    t.end()
  })
})
test('concurrent execution', t => {
  t.plan(1)
  return l(7).then(result => {
    t.deepEqual(result, {
      final: 'rfV76LgbYKMSreevzAu2ag==',
      testContext: 'HI! 42'
    })
  })
})
test.cb('omitted context', t => {
  t.plan(2)
  l(6, function (err, result) {
    t.is(err, null)
    t.deepEqual(result, {
      final: 'tXaGpbo9OuZfxOCD1qrKaA==',
      testContext: 'HI! 36'
    })
    t.end()
  })
})

test('calling done immediately inside segment', t => {
  t.plan(1)
  const l = line([
    (v, done) => done(null, v + 1),
    (contents) => contents.toString()
  ])
  return l(2).then(function (result) {
    t.is(result, '3')
  })
})

test.cb('calling done immediately', t => {
  t.plan(2)
  const l = line([
    (v) => v + 1,
    (contents) => contents.toString()
  ])
  l(2, function (error, result) {
    t.is(error, null)
    t.is(result, '3')
    t.end()
  })
})
