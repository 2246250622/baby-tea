'use strict'
import test from 'ava'
const l = require('../')

test('sync and promise', t => {
  t.plan(1)
  var calc = l([
    (val) => val * 7,
    (val) => Promise.resolve(val * 2),
    (val, done) => done(null, val * 3)
  ])

  return calc(1).then(result => {
    t.is(result, 42)
  })
})

test('all sync', t => {
  var calc = l([
    (val) => val * 5, // sync
    { // Split
      add: (val) => Promise.resolve(val + 2), // promise
      mul: (val, done) => process.nextTick(() => done(null, val * 7)) // async
    },
    (composed) => composed.add + composed.mul // Join
  ])
  t.plan(3)
  calc(1, function (error, answer) {
    t.is(error, null)
    t.is(answer, 42)
  })

  return calc(Math.PI).then(result => {
    t.is(result, 127.66370614359172)
  })
})
