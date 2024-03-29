var test = require('../test');
var assert = require('assert');
var newMock = require('../partialMock/simple/newMock');
var newRequireMock = require('../partialMock/simple/newRequireMock');

var expectAnything = newRequireMock('./partialMock/expectAnything');
var ignore = newRequireMock('./partialMock/ignore');
var expect = newRequireMock('./partialMock/expect');
var newMockContext = newRequireMock('./partialMock/newMockContext');
var verify = newRequireMock('./partialMock/verify');
var expectEmpty = newRequireMock('./partialMock/expectEmpty');
var expectArray = newRequireMock('./partialMock/expectArray');
var newMutableAnd = newRequireMock('./newMutableAnd')
var negotiateEnd =newRequireMock('./partialMock/negotiateEnd');
var newSut = require('../partialMock');
var mutableAnd = {};

function fallback() {}

(function () {
	console.log('partialMock');	
	var sut;
	var fallbackMock;
	var mockContext;
	function createSut() {
		stubMockContext();

		function stubMockContext() {
			mockContext = {};
			mockContext.reset = {};
			newMockContext.expect(fallback).return(mockContext);
		}

		sut = newSut(fallback);
	}
	createSut();

	
	test('reset points at mockContext.reset', function() {
		assert.equal(sut.reset, mockContext.reset);
	});	

	(function() {		
		console.log('when execute ');		
		var arg = {};
		var expected = {};		
		var execute = newMock();
		var didNegotiateEnd;
		execute.expect(arg).return(expected);
		mockContext.execute = execute;
		negotiateEnd.expect(mockContext).whenCalled(onNegotiateEnd).return();
		var returned = sut(arg);

		function onNegotiateEnd() {
			didNegotiateEnd = true;
		}

		test('should negotiateEnd', function() {
			assert.ok(didNegotiateEnd);
		});

		test('should return expected',function() {
			assert.equal(expected,returned);
		});

	})();
	

	(function() {
		console.log('when execute');
		var expected = {};
		mockContext.compositeAreCorrectArguments = null;
		var arg = 'arg';
		var arg2 = 'arg2';
		var didNegotiateEnd;
		newMutableAnd.expect().return(mutableAnd);
		expect.expect(0).expect(mockContext).expect(arg).expect(arg2).return(expected);
		negotiateEnd.expect(mockContext).whenCalled(onNegotiateEnd).return();
		var returned = sut.expect(arg,arg2); 

		function onNegotiateEnd() {
			didNegotiateEnd = true;
		}

		test('it should negotiateEnd', function() {
			assert.ok(didNegotiateEnd);
		});

		test('should set mockContext.compositeAreCorrectArguments to mutableAnd',function() {
			assert.equal(mutableAnd,mockContext.compositeAreCorrectArguments);
		});

		test('should return expected',function() {
			assert.equal(expected,returned)
		});


	})();

	(function() {
		console.log('when expect empty');
		var expected = {};
		var didNegotiateEnd;
		mockContext.compositeAreCorrectArguments = null;
		newMutableAnd.expect().return(mutableAnd);
		expectEmpty.expect(mockContext).return(expected);
		negotiateEnd.expect(mockContext).whenCalled(onNegotiateEnd).return();

		var returned = sut.expect(); 

				function onNegotiateEnd() {
			didNegotiateEnd = true;
		}

		test('should negotiateEnd', function() {
			assert.ok(didNegotiateEnd);
		});
		
		test('should set mockContext.compositeAreCorrectArguments to mutableAnd',function() {
			assert.equal(mutableAnd,mockContext.compositeAreCorrectArguments);
		});

		test('should return expected',function() {
			assert.equal(expected,returned)			
		});

	})();


	(function() {
		console.log('when expectAnything');
		var expected = {};
		var didNegotiateEnd;
		mockContext.compositeAreCorrectArguments = null;
		newMutableAnd.expect().return(mutableAnd);
		expectAnything.expect(0).expect(mockContext).return(expected);
		negotiateEnd.expect(mockContext).whenCalled(onNegotiateEnd).return();
		var returned = sut.expectAnything(); 

		function onNegotiateEnd() {
			didNegotiateEnd = true;
		}

		test('should negotiateEnd', function() {
			assert.ok(didNegotiateEnd);
		});

		test('should set mockContext.compositeAreCorrectArguments to mutableAnd',function() {
			assert.equal(mutableAnd,mockContext.compositeAreCorrectArguments);
		});

		test('should return expected',function() {
			assert.equal(expected,returned)
		});
	})();

	(function() {
		console.log('when ignore');
		var expected = {};
		var didNegotiateEnd;
		mockContext.compositeAreCorrectArguments = null;
		newMutableAnd.expect().return(mutableAnd);
		ignore.expect(0).expect(mockContext).return(expected);
		negotiateEnd.expect(mockContext).whenCalled(onNegotiateEnd).return();
		var returned = sut.ignore(); 

		function onNegotiateEnd() {
			didNegotiateEnd = true;
		}

		test('should negotiateEnd', function() {
			assert.ok(didNegotiateEnd);
		});

		test('should set mockContext.compositeAreCorrectArguments to mutableAnd',function() {
			assert.equal(mutableAnd,mockContext.compositeAreCorrectArguments);
		});

		test('should return expected',function() {
			assert.equal(expected,returned)
		});
	})();

	(function() {
		console.log('when verify');
		var expected = {};
		var didNegotiateEnd;
		verify.expect(mockContext).return(expected);
		negotiateEnd.expect(mockContext).whenCalled(onNegotiateEnd).return();
		var returned = sut.verify();

		function onNegotiateEnd() {
			didNegotiateEnd = true;
		}

		test('should negotiateEnd',function() {
			assert.ok(didNegotiateEnd);
		});

		test('should return expected',function() {
			assert.equal(expected,returned)
		});
	})();

	(function() {
		console.log('when expectArray');
		var expected = {};		
		var didNegotiateEnd;
		mockContext.compositeAreCorrectArguments = null;
		var array = [];		
		newMutableAnd.expect().return(mutableAnd);
		expectArray.expect(0).expect(mockContext).expect(array).return(expected);
		negotiateEnd.expect(mockContext).whenCalled(onNegotiateEnd).return();
		var returned = sut.expectArray(array); 

		function onNegotiateEnd() {
			didNegotiateEnd = true;
		}

		test('should negotiateEnd', function() {
			assert.ok(didNegotiateEnd);
		});


		test('should set mockContext.compositeAreCorrectArguments to mutableAnd',function() {
			assert.equal(mutableAnd,mockContext.compositeAreCorrectArguments);
		});

		test('should return expected',function() {
			assert.equal(expected,returned)
		});
	})();


})();
