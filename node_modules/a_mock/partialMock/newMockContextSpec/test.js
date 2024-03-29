var assert = require('assert');
var test = require('../../test');
var newMock = require('../simple/newMock');
var newRequireMock = require('../simple/newRequireMock');

var newObject = newRequireMock('../newObject');
var reset = newRequireMock('./mockContext/reset');

var newSut = require('../newMockContext');

(function() {
	console.log('newMockContext');
	var originalFallback = {};
	var didReset;
	var object = {};
	var context = {};
	var resetResult = {};

	newObject.expect().return(object);
	reset.expect(object).expect(originalFallback).return(context);
	var sut = newSut(originalFallback);


	test('it should return context',function() {
		assert.equal(sut, context);
	});

	console.log('reset');
	reset.expect(context).expect(originalFallback).return(resetResult);
	returned = sut.reset();

	test('forwards to reset',function() {
		assert.equal(returned, resetResult);
	});
	
})();
