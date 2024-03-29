'use strict'
const stream = require('stream')

const utilities = require('./utilities')

class Line {

  constructor (segments) {
    this.segments = segments.map(utilities.expandSegment)
  }

  execute () {
    var args = Array.from(arguments)
    var ctxt, cb
    if (args.length > 0 && typeof args[args.length - 1] === 'function') {
      cb = args.pop()
    }
    if (args.length > 1 && typeof args[args.length - 1] === 'object') {
      ctxt = args.pop()
    } else {
      ctxt = {}
    }
    debug('>executing on:', args, `(${this.segments.length} segments)`)
    var p
    if (!cb) {
      var rs, rj
      cb = function (err, result) {
        if (err) {
          rj(err)
        } else {
          rs(result)
        }
      }
      p = new Promise(function (resolve, reject) {
        rs = resolve
        rj = reject
      })
    }
    this.next(0, args, ctxt || {}, cb)

    return p
  }

  next (step, args, ctxt, cb) {
    var self = this
    var segment = this.segments[step]
    var value = args[0]
    var isReadableStream = value instanceof stream.Readable

    if (segment && segment.$type === 'stream') {
      var s = segment.$func.call(ctxt)
      if (isReadableStream) {
        debug('  ', step, '|piping to stream...')
        value.pipe(s)
      } else {
        debug('  ', step, '!writing to stream...')
        s.write(value)
        s.end()
      }
      self.next(step + 1, [s], ctxt, cb)
    } else if (isReadableStream) {
      debug('  ', step, '@consuming readable stream...')
      utilities.bufferStream(value)
      .then((buf) => self.next(step, [buf], ctxt, cb))
      // FIXME write a test and correctly handle this (streams may err but continue to work?)
      .catch(cb)
    } else if (segment) {
      var meta = {}
      Line.resolveSegment(segment, args, ctxt, meta)
      .then(function (value) {
        debug('  ', step, `<${meta.inferredType}`, value)
        self.next(step + 1, value, ctxt, cb)
      })
      .catch(function (error) {
        if (!(error instanceof Error)) {
          error = Object.assign(new Error(error), {error})
        }
        Object.assign(error, {step, value, ctxt})
        return cb(error)
      })
    } else {
      debug('<finished with', args)
      cb.apply(null, [null].concat(args))
    }
  }

  static resolveSegment (segment, args, ctxt, meta) {
    // This should be rewritten in a better way?
    var ret
    var asyncCallback, rs, rj

    // Should let streams pipe everywhere, even through segments
    if (segment.$type === 'split') {
      var promises = []
      var promisesKeys = []
      for (var key in segment) {
        if (key[0] === '$') continue
        promisesKeys.push(key)
        if (segment[key].$type === 'stream') {
          let stream = segment[key].$func.call(ctxt)
          stream.end(args[0])
          promises.push(utilities.bufferStream(stream))
        } else if (segment[key].$type === 'promise') {
          promises.push(segment[key].$func)
        } else {
          promises.push(Line.resolveSegment(segment[key], args, ctxt, {})
            .then((r) => r[0])
            .then(utilities.bufferIfStream))
        }
      }

      return Promise.all(promises).then(function (results) {
        var all = {}
        for (var i = 0; i < promisesKeys.length; ++i) {
          debug('      <', promisesKeys[i], results[i])
          all[promisesKeys[i]] = results[i]
        }
        meta.inferredType = 'split'
        return [all]
      })
    }

    if (segment.$type === 'async' || segment.$type === 'auto') {
      asyncCallback = function (error, value) {
        var args = Array.from(arguments)
        process.nextTick(function () {
          // Give a chance for rs and rj to be set in case it is directly called
          // Test: main/calling done immediately inside segment
          if (error) {
            return rj(error)
          }
          rs(args.slice(1))
        })
      }
    }
    try {
      ret = segment.$func.apply(ctxt, args.concat(asyncCallback))
    } catch (error) {
      meta.inferredType = 'sync'
      return Promise.reject(error)
    }
    if ((typeof ret === 'undefined' && segment.$type === 'auto') || segment.$type === 'async') {
      // I guess there is a better way to do this along with the above asyncCallback...
      meta.inferredType = 'async'
      return new Promise(function (resolve, reject) {
        rs = resolve
        rj = reject
      })
    } else if (ret instanceof Promise ||
      (ret && typeof ret.then === 'function' && typeof ret.catch === 'function')) {
      meta.inferredType = 'promise'
      return ret.then((res) => [res])
    } else {
      meta.inferredType = 'sync'
      return Promise.resolve([ret])
    }
  }
}

module.exports = Line

var debug = ((/^line(:|$)/).test(process.env.DEBUG)) ? require('./debug') : () => {}
