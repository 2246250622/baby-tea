var newThrow = require('./newThrow');

function expectEmpty(mockContext) {
	var _return = require('./return');
	mockContext.whenCalledEmitter = require('../eventEmitter')();
	var hasCorrectArgument = require('./newHasNoMoreArguments')(0, mockContext);
	var newThen = require('../newThen');
	
	var c = {};
	mockContext.compositeAreCorrectArguments.add(hasCorrectArgument);
	mockContext.numberOfArgs = 0;

	c.return = function(arg) {
		return _return(arg,0,mockContext);
	};

	c.whenCalled = function(callback) {
		mockContext.whenCalledEmitter.add(callback);
		return c;
	};

	c.throw = function(error) {
		var _throw = newThrow(error);
		return c.whenCalled(_throw);
	};

	c.repeat = function(times) {
		return _return(undefined,0,mockContext).repeat(times);
	};

	c.repeatAny = function() {
		return _return(undefined,0,mockContext).repeatAny();
	};

	c.resolve = function (value) {
		var promise = newThen.resolve(value);
		return c.return(promise);
	};

	c.reject = function (value) {
		var promise = newThen.reject(value);
		return c.return(promise);
	};

	return c;
}

module.exports = expectEmpty;