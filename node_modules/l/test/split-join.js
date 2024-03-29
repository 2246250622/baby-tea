'use strict'
import test from 'ava'

const CONSTANTS = require('./_constants')

const crypto = require('crypto')
const fs = require('fs')

const Line = require('../src/Line')
const l = require('../')

test('split into multiple streams and a non-stream', t => {
  t.plan(1)
  const l = new Line([
    () => Promise.resolve(fs.createReadStream(CONSTANTS.FNAME, CONSTANTS.CUT)),
    {
      sha1sum: {stream: () => crypto.createHash('sha1')},
      md5sum: {stream: () => crypto.createHash('md5')},
      str: (buf) => buf.toString(),
      length: (buf) => buf.length
    }
  ])
  return l.execute().then(function (result) {
    t.deepEqual(result, {
      sha1sum: Buffer.from(CONSTANTS.SHA1, 'hex'),
      md5sum: Buffer.from(CONSTANTS.MD5, 'hex'),
      // md5sum: CONSTANTS.MD5,
      str: CONSTANTS.STR,
      length: CONSTANTS.STR.length
    })
  })
})

test('split into multiple streams and a non-stream and rejoin', t => {
  t.plan(1)
  const l = new Line([
    () => Promise.resolve(fs.createReadStream(CONSTANTS.FNAME, CONSTANTS.CUT)),
    {
      sha1sum: {stream: () => crypto.createHash('sha1')},
      md5sum: {stream: () => crypto.createHash('md5')},
      str: (buf) => buf.toString(),
      length: (buf) => buf.length
    },
    (obj) => Buffer.concat([obj.md5sum, obj.sha1sum, Buffer.from(obj.str)])
  ])
  return l.execute().then(function (result) {
    var buf = Buffer.concat([
      Buffer.from(CONSTANTS.MD5, 'hex'),
      Buffer.from(CONSTANTS.SHA1, 'hex'),
      Buffer.from(CONSTANTS.STR)
    ])
    t.deepEqual(result, buf)
  })
})

test('buffer readable streams for splits', t => {
  t.plan(1)
  const l = new Line([
    {
      file: () => Promise.resolve(fs.createReadStream(CONSTANTS.FNAME, CONSTANTS.CUT))
    }
  ])
  return l.execute().then(function (result) {
    t.deepEqual(result, {
      file: Buffer.from(CONSTANTS.STR)
    })
  })
})

test('promise as split value', t => {
  return l([{
    three: Promise.resolve(3),
    four: new Promise(function (resolve) {
      setTimeout(function () {
        resolve(4)
      }, 1)
    }),
    five: () => 5,
    six: (done) => done(null, 6)
  }])().then(result => {
    t.deepEqual(result, {
      three: 3,
      four: 4,
      five: 5,
      six: 6
    })
  })
})
