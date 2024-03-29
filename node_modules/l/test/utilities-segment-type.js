'use strict'
import test from 'ava'

const utilities = require('../src/utilities')

test('utilities segment type by type property', t => {
  t.plan(3)
  t.is(utilities.segmentType({$type: 'promise', stream: 'something'}), 'promise')
  t.is(utilities.segmentType({$type: 'stream', promise: 'something'}), 'stream')
  t.is(utilities.segmentType({$type: 'sync'}), 'sync')
})
test('utilities segment type inferred', t => {
  t.plan(4)
  t.is(utilities.segmentType({stream: 'something'}), 'stream')
  t.is(utilities.segmentType({promise: 'something'}), 'promise')
  t.is(utilities.segmentType({async: 'async'}), 'async')
  t.is(utilities.segmentType({sync: 'async'}), 'sync')
})
test('utilities segment type auto', t => {
  t.plan(1)
  t.is(utilities.segmentType(() => {}), 'auto')
})
