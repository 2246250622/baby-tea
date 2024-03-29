var assert = require('assert');
var test = require('../test');
var mock = require('../partialMock/simple/newMock');

(function() {
	console.log('execute with no args');

    var isResolved;

    var newPromise = require('../newThen')();
    var p = newPromise();

    p.then(function() {
        isResolved = true;
    });

    test('returns resolved promise', function() {
        assert.ok(isResolved);
    });

})();


(function() {
	console.log('execute with 1 arg');

    var returned;
    var valueToResolveWith = {};

    var newPromise = require('../newThen')();
    var p = newPromise(valueToResolveWith);

    p.then(function(result) {
        returned = result;
    });

    test('returns promise resolved with the given arg', function() {
        assert.strictEqual(valueToResolveWith, returned);
    });

})();

(function() {
	console.log('execute with 2 args');

    var returned;
    var valueToResolveWith = {};
    var errorToRejectWith = {};

    var newPromise = require('../newThen')();
    var p = newPromise(valueToResolveWith, errorToRejectWith);

    p.then(function(result) {
        returned = result;
    });

    test('returns promise resolved with the first arg', function() {
        assert.strictEqual(valueToResolveWith, returned);
    });

})();

(function() {
	console.log('execute with 2 args given first one is falsy');

    var returned;
    var errorToRejectWith = {};

    var newPromise = require('../newThen')();
    var p = newPromise(null, errorToRejectWith);

    p.then(null, function(result) {
        returned = result;
    });

    test('returns promise rejected with the first arg', function() {
        assert.strictEqual(errorToRejectWith, returned);
    });

})();
