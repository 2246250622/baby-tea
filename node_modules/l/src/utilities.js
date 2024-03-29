'use strict'
const stream = require('stream')

var utilities = {}

utilities.bufferStream = function (stream) {
  return new Promise(function (resolve, reject) {
    var buf
    stream.on('data', function (data) {
      if (!buf) {
        buf = Buffer.from(data)
      } else {
        buf = Buffer.concat([buf, data])
      }
    })
    stream.on('end', function () {
      resolve(buf)
    })
    stream.on('error', reject)
  })
}
utilities.bufferIfStream = function (r) {
  if (r instanceof stream.Readable) {
    return utilities.bufferStream(r)
  }
  return r
}
utilities.segmentType = function (segment) {
  if (segment.$type) return segment.$type
  // TODO infer from function name(){}
  for (var type of ['stream', 'sync', 'async', 'promise']) {
    if (typeof segment[type] !== 'undefined') return type
  }
  return 'auto'
}
utilities.expandSegment = function (segment) {
  if (typeof segment === 'function') {
    segment = {
      $func: segment
    }
  } else if (utilities.isPromise(segment)) {
    segment = {
      promise: segment
    }
  } else if (segment.func) {
    segment.$func = segment.func
    delete segment.func
  }

  segment.$type = utilities.segmentType(segment)
  if (!segment.$func) {
    segment.$func = segment[segment.$type]
    delete segment[segment.$type]
  }

  var keys = Object.keys(segment).filter((k) => k[0] !== '$')
  if (keys.length > 0) {
    segment.$type = 'split'
    for (var key of keys) {
      segment[key] = utilities.expandSegment(segment[key])
    }
  }

  return segment
}
utilities.isPromise = function (obj) {
  return obj && typeof obj.then === 'function'
}
module.exports = utilities
