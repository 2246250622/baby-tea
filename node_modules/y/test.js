var assert = require('assert');
var util = require('util');
var y = require('./y');

var settings, calls;

function test(message, fn) {
  reset();
  process.stdout.write(message + '... ');
  fn();
  process.stdout.write('ok!\n');
}

function reset() {
  delete require.cache[require.resolve('./y')];
  y = require('./y');

  // don't print from y during tests
  console.log = function () {};
  util.inspect = function () {};
  settings = null, calls = 0;
}

// run tests
test('testing defaults', function () {
  console.log = function () {
    calls++;
  };
  util.inspect = function () {
    assert.equal(arguments[2], 2);
  };

  settings = y('test').settings;
  util.inspect = function () {
    assert.equal(arguments[2], 1);
  };
  assert.equal(Object.keys(settings).length, 0);
  assert.equal(calls, 3);
});
test('testing increase depth', function () {
  var depth = 42;
  util.inspect = function () {
    assert.equal(arguments[2], depth);
  };
  y.set({depth: depth})('test');
});
test('testing indefinite depth', function () {
  var depth = null;
  util.inspect = function () {
    assert.strictEqual(arguments[2], depth);
  };
  y.set({depth: depth})('test');
});
test('testing increase stackSize', function () {
  var stackSize = 4;
  console.log = function () {
    calls++;
  };
  y.set({stackSize: stackSize})('test');
  assert.equal(calls, 2 + stackSize);
});
test('testing that y.set() does not overwrite', function () {
  var depth = 42;
  var stackSize = 4;

  util.inspect = function () {
    assert.equal(arguments[2], depth);
  };
  y.set({depth: depth})('test');

  console.log = function () {
    calls++;
  };
  y.set({stackSize: stackSize})('test');
  assert.equal(calls, 2 + stackSize);

  calls = 0;
  y.set({depth: depth})('test');
  assert.equal(calls, 2 + stackSize);
});
test('testing return values from y() and y.set()', function () {
  var _y = y('test');
  assert.strictEqual(_y, y);
  _y = y.set();
  assert.strictEqual(_y, y);
});
