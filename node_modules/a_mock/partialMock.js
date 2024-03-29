function create(originalFunc) {
	var newMockContext = require('./partialMock/newMockContext');
	var expect = require('./partialMock/expect');
	var expectAnything = require('./partialMock/expectAnything');
	var ignore = require('./partialMock/ignore');
	var expectArray = require('./partialMock/expectArray');
	var verify = require('./partialMock/verify');
	var expectEmpty = require('./partialMock/expectEmpty');
	var newEmptyAnd = require('./newMutableAnd');		
	var mockContext = newMockContext(originalFunc);
	var _negotiateEnd = require('./partialMock/negotiateEnd');	

	function mock() {		
		negotiateEnd();
		mockContext.arguments = arguments;		
		return mockContext.execute.apply(null,arguments);
	}

	mock.expect = function() {				
		negotiateEnd();
		mockContext.compositeAreCorrectArguments = newEmptyAnd();
		if (arguments.length == 0)
			return expectEmpty(mockContext);
		var args = [0,mockContext];
		for (var i = 0 ; i < arguments.length; i++) {
			args.push(arguments[i]);
		};
		return expect.apply(null,args);
	};

	mock.expectAnything = function() {
		negotiateEnd();
		mockContext.compositeAreCorrectArguments = newEmptyAnd();
		var args  = [0,mockContext];
		return expectAnything.apply(null,args);
	};

	mock.ignore = function() {
		negotiateEnd();
		mockContext.compositeAreCorrectArguments = newEmptyAnd();
		var args  = [0,mockContext];
		return ignore.apply(null,args);
	};

	mock.reset = mockContext.reset;

	mock.verify = function() {		
		negotiateEnd();
		var args = [mockContext];
		return verify.apply(null,args);
	};

	mock.expectArray = function(array) {
		negotiateEnd();
		mockContext.compositeAreCorrectArguments = newEmptyAnd();
		var args = [0,mockContext,array];
		return expectArray.apply(null,args);
	}


	function negotiateEnd() {
		_negotiateEnd(mockContext);
	}
	
	return mock;
}

module.exports  = create;


