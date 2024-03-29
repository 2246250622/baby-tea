var assert = require('assert');
var test = require('../../test');
var newMock = require('../simple/newMock');
var newRequireMock = require('../simple/newRequireMock');

var _return = newRequireMock('./return');
var newWhenCalledEmitter = newRequireMock('../eventEmitter');
var newHasNoMoreArguments = newRequireMock('./newHasNoMoreArguments');
var newThrow = newRequireMock('./newThrow');
var newThen = newRequireMock('../newThen');
var sut = require('../expectEmpty');


(function() {
	console.log('expectEmpty');
	var mockContext = {};
	var compositeAreCorrectArguments = newMock();
	var whenCalledEmitter = {}	;
	var hasCorrectArgument = {};
	var index = 0;
	var didAdd;

	stubHasNoMoreArguments();
	stubWhenCalledEmitter();
	stubMockContext();
	stubCompositeAreCorrectArguments();

	function stubHasNoMoreArguments() {
		newHasNoMoreArguments.expect(index).expect(mockContext).return(hasCorrectArgument);		
	}

	function stubWhenCalledEmitter() {
		newWhenCalledEmitter.expect().return(whenCalledEmitter);		
	}

	function stubMockContext() {
		mockContext.compositeAreCorrectArguments = compositeAreCorrectArguments;		
	}

	function stubCompositeAreCorrectArguments() {
		var add = newMock();
		add.expect(hasCorrectArgument).whenCalled(onAdd).return(null);
		compositeAreCorrectArguments.add = add;		
	}

	function onAdd() {
		didAdd = true;
	}

	var sut2 = sut(mockContext);

	test('it should set mockContext.NumberOfArgs to zero',function() {
		assert.ok(mockContext.numberOfArgs === 0); 
	});


	test('it should add hasNoMoreArguments to compositeAreCorrectArguments',function() {
		assert.ok(didAdd);
	});

	test('it should set mockContext.whenCalledEmitter',function() {
		assert.equal(mockContext.whenCalledEmitter,whenCalledEmitter);
	});

	(function() {
		console.log('return');
		var expected = {};
		var arg = {};
		_return.expect(arg).expect(index).expect(mockContext).return(expected);
		var returned = sut2.return(arg); 

		test('it should return expected',function() {
			assert.equal(expected,returned)
		});
	})();

	(function() {
		console.log('whenCalled');
		var callback = {};
		var expected;
		var add = newMock();
		whenCalledEmitter.add = add;
		var didAddCallback;
		add.expect(callback).whenCalled(onAddCallback).return();

		function onAddCallback() {
			didAddCallback = true;
		}

		mockContext.whenCalledEmitter = whenCalledEmitter;
				
		var returned = sut2.whenCalled(callback); 

		test('it should add callback to whenCalledEmitter',function() {
			assert.ok(didAddCallback)
		});

		test('it should return self',function() {
			assert.equal(returned,sut2);
		});
	})();

	(function() {
		console.log('throw');
		var error = {};				
		var _throw = {};
		var expected = {};
		newThrow.expect(error).return(_throw);
		sut2.whenCalled = newMock();
		sut2.whenCalled.expect(_throw).return(expected);
				
		var returned = sut2.throw(error); 

		test('it should return expected',function() {
			assert.equal(returned,expected);
		});		
	})();

	(function() {
		console.log('repeat');
		var expected = {};
		var times = 2;
		var returnContext = {};
		var repeatMock = newMock();
		_return.expectAnything().expect(0).expect(mockContext).whenCalled(onReturn).return(returnContext);
		
		function onReturn(returnValue) {
			if (returnValue !== undefined)
				throw new Error('unexpected argument');
		}

		returnContext.repeat = repeatMock;
		repeatMock.expect(times).return(expected);

		var returned = sut2.repeat(times); 

		test('should return expected',function() {
			assert.equal(returned,expected)
		});
	})();

	(function() {
		console.log('repeatAny');
		var expected = {};
		var returnContext = {};
		var repeatMock = newMock();
		_return.expectAnything().expect(0).expect(mockContext).whenCalled(onReturn).return(returnContext);
		
		function onReturn(returnValue) {
			if (returnValue !== undefined)
				throw new Error('unexpected argument');
		}

		returnContext.repeatAny = repeatMock;
		repeatMock.expect().return(expected);

		var returned = sut2.repeatAny(); 

		test('should return expected',function() {
			assert.equal(returned,expected)
		});
	})();

	(function() {
		console.log('resolve');
		var expected = {};
		var arg = {};
		newThen.resolve = newMock();
		var promise = {};
		newThen.resolve.expect(arg).return(promise);		
		_return.expect(promise).expect(index).expect(mockContext).return(expected);
		var returned = sut2.resolve(arg); 

		test('it should return expected as promise',function() {
			assert.equal(expected,returned)
		});
	})();

	(function() {
		console.log('reject');
		var expected = {};
		var arg = {};
		newThen.reject = newMock();
		var promise = {};
		newThen.reject.expect(arg).return(promise);		
		_return.expect(promise).expect(index).expect(mockContext).return(expected);
		var returned = sut2.reject(arg); 

		test('it should return expected as promise',function() {
			assert.equal(expected,returned)
		});
	})();

})();
