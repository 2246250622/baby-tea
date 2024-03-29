var assert = require('assert');
var test = require('../test');
var mock = require('../partialMock/simple/newMock');

(function() {
	console.log('then resolve');

	var expected = {};
	var expected2 = {};
	var actual;
	var actual2;
	var expectedRepeated = {};
	var actualRepeated;
	var actualRepeated2;

	var p = require('../newThen')();
	p.then(function(returned) {
			actual = returned
			return expected2;
		}, mock())
		.then(function(returned) {
			actual2 = returned;
		}, mock());

	p.then(function(returned) {
			actualRepeated = returned;
			return expectedRepeated;
		}, mock())
		.then(function(returned) {
			actualRepeated2 = returned;
		}, mock());

	var resturned = p.resolve(expected);

	test('resolve() returns the promise', function() {
		assert.equal(actual, expected);
	});


	test('invokes success', function() {
		assert.equal(actual, expected);
	});

	test('invokes success when chained', function() {
		assert.equal(actual2, expected2);
	});

	test('invokes success when called again', function() {
		assert.equal(actualRepeated, expected);
	});

	test('invokes success when called again and chained', function() {
		assert.equal(actualRepeated2, expectedRepeated);
	});

})();
