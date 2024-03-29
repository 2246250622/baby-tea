'use strict'
import test from 'ava'

const Line = require('../').Line

test('async function that returns a value', t => {
  t.plan(1)
  const l = new Line([
    {
      $type: 'async',
      func: (value, done) => setTimeout(() => done(null, value * 3), 1)
    }
  ])
  return l.execute(2).then(function (result) {
    t.is(result, 6)
  })
})
