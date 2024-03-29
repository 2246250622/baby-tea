var assert = require('assert');
var test = require('../../test');
var newMock = require('../simple/newMock');
var newRequireMock = require('../simple/newRequireMock');

var execute = newRequireMock('./execute');
var sut = require('../newExecute');

(function(){
	console.log('newExecute');
	var mockContext = {};
	var returnValue = {};
	var compositeAreCorrectArguments = {};
	var originalFallback = newMock();
	var sholdDecrementExpectCount = {};
	var whenCalledEmitter = {};

	stubMockContext()

	function stubMockContext() {
		mockContext.originalFallback = originalFallback;
		mockContext.whenCalledEmitter = whenCalledEmitter;
	}

	var sut2 = sut(returnValue,compositeAreCorrectArguments,mockContext,sholdDecrementExpectCount);

	(function() {
		console.log('execute');
		var arg = {};
		var arg2 = {};
		var expected = {};		
		mockContext.whenCalledEmitter = null;
		execute.expect(returnValue).expect(originalFallback).expect(compositeAreCorrectArguments).expect(mockContext).expect(sholdDecrementExpectCount).expect(whenCalledEmitter).expect(arg).expect(arg2).return(expected);
		var returned = sut2(arg,arg2)

		test('it should return expected',function() {
			assert.equal(expected,returned);
		});		
	})();


	(function() {
		console.log('setFallback');
		var fallBack = {};
		sut2.setFallback(fallBack);

		(function(){
			console.log('execute');
			var arg = {};
			var arg2 = {};
			var expected = {};		
			mockContext.whenCalledEmitter = null;
			execute.expect(returnValue).expect(fallBack).expect(compositeAreCorrectArguments).expect(mockContext).expect(sholdDecrementExpectCount).expect(whenCalledEmitter).expect(arg).expect(arg2).return(expected);
			var returned = sut2(arg,arg2)
	
			test('it should return expected',function() {
				assert.equal(expected,returned);
			});		
		})();
	})();
})();
