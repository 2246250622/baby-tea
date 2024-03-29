var assert = require('assert');
var test = require('../../test');
var newMock = require('../simple/newMock');
var newRequireMock = require('../simple/newRequireMock');

(function() {
	console.log('requireExecute');

	(function(){
		console.log('correct arguments.execute');
		var sut = require('../execute');
		var returnValue = {};
		var fallback = newMock();
		var hasCorrectArguments =  newMock();
		var mockContext = {};
		var didEmitWhenCalled;		
		var negotiateDecrementExpectCount = newRequireMock('./negotiateDecrementExpectCount');		
		var shouldDecrement = {};
		var didDecrement;
		var whenCalledEmitter = {};
		negotiateDecrementExpectCount.expect(shouldDecrement).expect(mockContext).whenCalled(onDecrement).return(null);				

		function onDecrement() {
			didDecrement = true;
		}		

		var arg = {};
		var arg2 = {};
		hasCorrectArguments.expect(arg).expect(arg2).return(true);
		mockContext.expectCount = 2;
		stubWhenCalledEmitter()

		function stubWhenCalledEmitter() {			
			var emit = newMock();
			whenCalledEmitter.emit = emit;
			mockContext.whenCalled = whenCalledEmitter;
			emit.expect(arg).expect(arg2).whenCalled(onWhenCalled).return();
		}

		function onWhenCalled() {
			didEmitWhenCalled = true;
		}

		var returned =  sut(returnValue,fallback,hasCorrectArguments,mockContext,shouldDecrement,whenCalledEmitter,arg,arg2);

		test('it should emit whenCalled',function() {
			assert.ok(didEmitWhenCalled);
		});	
		
		test('it should negotiate DecrementExpectCount',function() {
			assert.ok(didDecrement);
		});	

		test('it should return returnValue',function() {
			assert.equal(returnValue,returned);
		});

	})();
	
	(function(){
		console.log('incorrect arguments.execute');
		var sut = require('../execute');
		var returnValue = {};
		var whenCalledEmitter = {};
		var fallback = newMock();
		var hasCorrectArguments =  newMock();
		var mockContext = {};
		var negotiateDecrementExpectCount = newRequireMock('./negotiateDecrementExpectCount');		
		var shouldDecrement;

		var arg = {};
		var arg2 = {};
		hasCorrectArguments.expect(arg).expect(arg2).return(false);
		var expected = {};		
		fallback.expect(arg).expect(arg2).return(expected);
		mockContext.expectCount = 2;
	
		var returned =  sut(returnValue,fallback,hasCorrectArguments,mockContext,shouldDecrement,whenCalledEmitter,arg,arg2);
		
		test('it should return result from fallback',function() {
			assert.equal(expected,returned);
		});

	})();
})();