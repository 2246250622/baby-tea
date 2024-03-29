'use strict'
const Line = require('./src/Line')

function wrapper (segments) {
  if (arguments.length > 1) {
    segments = Array.from(arguments)
  } else if (!Array.isArray(segments)) {
    segments = [segments]
  }
  var line = new Line(segments)
  return function () {
    return line.execute.apply(line, arguments)
  }
}

module.exports = wrapper
module.exports.Line = Line
