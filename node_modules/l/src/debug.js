'use strict'
const util = require('util')
module.exports = function () {
  console.log.apply(console, Array.from(arguments).map(function (arg) {
    return (typeof arg !== 'object') ? arg : util.inspect(arg, {
      depth: 0,
      maxArrayLength: 3,
      colors: true,
      customInspect: false,
      breakLength: 3
    }).split('\n').slice(0, 3).join(' ') + '...'
  }))
}
