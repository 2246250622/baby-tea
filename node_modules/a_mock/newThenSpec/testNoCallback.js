var assert = require('assert');
var test = require('../test');
var mock = require('../partialMock/simple/newMock');

(function() {
	console.log('resove value can be carried through a long chain');

	var expected = {};
	var actual;

	var p = require('../newThen')();
	p.then(null, null)
		.then({})
		.then()
		.then(function(returned) {
			actual = returned;
		}, mock());

	p.resolve(expected);

	test('invokes success', function() {
		assert.equal(actual, expected);
	});

})();



(function() {
	console.log('reject value can be carried through a long chain');

	var expected = {};
	var actual;
	var actual2;

	var p = require('../newThen')();
	p.then(null, null)
		.then({})
		.then()
		.then(mock(), function(returned) {
			actual = returned;
		})
		.then(null, function(returned) {
			actual2 = returned;
		} );

	p.reject(expected);

	test('invokes first reject', function() {
		assert.equal(actual, expected);
	});

	test('does not invoke next rejects', function() {
		assert.equal(actual2, undefined);
	});

})();
