var assert = require('assert');
var test = require('../test');
var mock = require('../partialMock/simple/newMock');

(function() {
	console.log('then resolve with a rejected promise');

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
			return {
				then: function(success, fail) {
					fail(expected2);
				}
			};

		}, mock())
		.then(mock(), function(returned) {
			actual2 = returned;
		});


	p.then(function(returned) {
			actualRepeated = returned;
			return {
				then: function(success, fail) {
					fail(expectedRepeated);
				}
			};
		}, mock())
		.then(mock(), function(returned) {
			actualRepeated2 = returned;
		});

	var resturned = p.resolve(expected);

	test('resolve() returns the promise', function() {
		assert.equal(actual, expected);
	});

	test('invokes success', function() {
		assert.equal(actual, expected);
	});

	test('invokes failed when chained', function() {
		assert.equal(actual2, expected2);
	});

	test('invokes success when called again', function() {
		assert.equal(actualRepeated, expected);
	});

	test('invokes failed when called again and chained', function() {
		assert.equal(actualRepeated2, expectedRepeated);
	});

})();
