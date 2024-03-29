var assert = require('assert');
var test = require('../test');
var mock = require('../partialMock/simple/newMock');

(function() {
	console.log('then throws');

	var expected = {};
	var expected2 = {};
	var actual;
	var actual2;
	var expectedRepeated = {};
	var actualRepeated2;

	var p = require('../newThen')();
	p.then(mock(),
			function(returned) {
				actual = returned;
				throw expected2;
			})
		.then(null, function(returned) {
			actual2 = returned;
		});

	p.then(mock(),
			function(returned) {
				actualRepeated = returned;
				throw expectedRepeated;
			})
		.then(null, function(returned) {
			actualRepeated2 = returned;
		});

	var resturned = p.reject(expected);

	test('reject returns the promise', function() {
		assert.equal(actual, expected);
	});

	test('invokes failed', function() {
		assert.equal(actual, expected);
	});

	test('catches following then', function() {
		assert.equal(actual2, expected2);
	});

	test('invokes failed when repeated', function() {
		assert.equal(actualRepeated, expected);
	});

	test('catches following then when repeated', function() {
		assert.equal(actualRepeated2, expectedRepeated);
	});

})();
