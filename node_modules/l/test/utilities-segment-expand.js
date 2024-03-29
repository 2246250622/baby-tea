'use strict'
import test from 'ava'

const utilities = require('../src/utilities')

test('utilities segment expand function', t => {
  t.plan(2)
  var _s = () => {}
  var s = utilities.expandSegment(_s)
  t.is(s.$type, 'auto')
  t.is(s.$func, _s)
})

test('utilities segment expand object', t => {
  t.plan(2)
  var _s = {
    $type: 'sync',
    $func: () => {}
  }
  var s = utilities.expandSegment(_s)
  t.is(s.$type, 'sync')
  t.is(s.$func, _s.$func)
})

test('utilities segment expand stream', t => {
  t.plan(2)
  var func = () => {}
  var _s = {
    stream: func
  }
  var s = utilities.expandSegment(_s)
  t.is(s.$type, 'stream')
  t.is(s.$func, func)
})

test('utilities segment type expand promise', t => {
  var _s = Promise.resolve()
  var s = utilities.expandSegment(_s)
  t.is(s.$type, 'promise')
  t.is(s.$func, _s)
})
