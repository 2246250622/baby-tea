var assert = require('assert');
var test = require('../../../test');
var newMock = require('../../simple/newMock');
var newRequireMock = require('../../simple/newRequireMock');

var newFallbackWrapper = newRequireMock('../newFallbackWrapper');
var newMutableAnd = newRequireMock('../../newMutableAnd');

var sut = require('../reset');

(function() {
	console.log('reset mock');
	var context = {};
	var originalFallback = {};
	var fallbackWrapper = {};
	var mutableAnd = {};
	newFallbackWrapper.expect(originalFallback).return(fallbackWrapper);
	newMutableAnd.expect().return(mutableAnd);
	
	sut(context,originalFallback);

	test('it should set execute to fallbackWrapper',function() {
		assert.equal(context.execute,fallbackWrapper);
	});

	test('it should set originalFallback',function() {
		assert.equal(context.originalFallback,originalFallback);
	});

	test('it should set compositeAreCorrectArguments',function() {
		assert.equal(context.compositeAreCorrectArguments,mutableAnd);
	});

	test('it should set lastExecute',function() {
		assert.equal(context.lastExecute,fallbackWrapper);
	});

	test('it should set expectCount to zero',function() {
		assert.equal(context.expectCount,0);
	});
	
})();
