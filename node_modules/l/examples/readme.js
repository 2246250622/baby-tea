'use strict'
const line = require('../')

var l = line([
  (val) => val * 5, // sync
  { // Split
    add: (val) => Promise.resolve(val + 2), // promise
    mul: (val, done) => process.nextTick(() => done(null, val * 7)) // async
  },
  (composed) => composed.add + composed.mul // Join
])

l(1, function (error, answer) { // with a callback
  if (error) {
    console.log(error)
  }
  require('assert').strictEqual(answer, 42)
})

l(Math.PI).then(result => { // as a promise
  console.log(result) // 127.66370614359172
})

