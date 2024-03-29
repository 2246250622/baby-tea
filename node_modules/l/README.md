# L
> Mix Async/Sync code with Promises and Streams in a reusable unified line

[![Build Status](https://travis-ci.org/etabits/l.svg?branch=master)](https://travis-ci.org/etabits/l)
[![Coverage Status](https://coveralls.io/repos/github/etabits/l/badge.svg?branch=master)](https://coveralls.io/github/etabits/l?branch=master)

You have multiple functions, some of them are **async**, others are **promise**-based, and you have some **stream** transformers, and you want to plug everything together: This module **takes an array of functions/streams and gives you a single function**, that can be used with callback, or as a promise. It takes care of piping consecutive streams, buffering them before passing them to the next function... etc.

## Installation
```sh
npm install --save l
```

## Features
* A segment can be sync, async with a callback, can return a promise, or can define a stream
* Consecutive streams are automatically piped, only buffered when next segment is not a stream
* You can return a stream, and it will be automatically buffered/piped

## Usage Example
```js
const l = require('l');

var calc = l([
  (val) => val * 5, // sync
  { // Split
    add: (val) => Promise.resolve(val + 2), // promise
    mul: (val, done) => process.nextTick(() => done(null, val * 7)) // async
  },
  (composed) => composed.add + composed.mul // Join
])

calc(1, function (error, answer) { // with a callback
  require('assert').strictEqual(answer, 42)
})

calc(Math.PI).then(result => { // as a promise
  console.log(result) // 127.66370614359172
})
```
For a more complete example that involves streams, please check [examples](https://github.com/etabits/l/tree/master/examples) and [tests](https://github.com/etabits/l/tree/master/test).

## Debugging
To enable debugging:
```sh
DEBUG=line node ./examples/npm-module-github-stats.js penguin
```
<!--- I mark it as ruby because colors look nice -->
```ruby
>executing on: penguin (5 segments)
   0 <async IncomingMessage {   _readableState: [Object],   readable: true,...
   1 @consuming readable stream...
   1 <sync { _id: 'penguin',   _rev: '151-868f4a334cf6a0bc8ced2f4485e7da78',   name: 'penguin',...
   2 <promise etabits/node-penguin
   3 <async IncomingMessage {   _readableState: [Object],   readable: true,...
   4 @consuming readable stream...
   4 <sync { gh: [Object],   npm: [Object] }...
<finished with { gh: [Object],   npm: [Object] }...
```

## Running tests
```sh
npm test
```

## Compatibility
* L is compatible with [Node.js v6 LTS](https://nodejs.org/en/download/), [Node.js v7 Current](https://nodejs.org/en/download/current/), Node.js v5 and Node.js v4

## Next (Roadmap)
* Ability to split and rejoin a stream (parallel execution)
* Return a readable stream when last element is a stream (optional)
* Syntactic sugar, once uses cases are established, so we have a stable API
* Browser use?
* objectMode streams between segments
* create objectMode stream duplex instead of a function wrapper
* ...
