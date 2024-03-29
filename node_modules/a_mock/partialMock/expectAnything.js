function expectAnything(index,mockContext) {
	var expect = require('./expect');
	var expectAnything = require('./expectAnything');
	var expectArray = require('./expectArray');
	var _return = require('./return');
	var newThrow = require('./newThrow');
	var hasCorrectArgument = require('../and');
	mockContext.whenCalledEmitter = require('../eventEmitter')();

	var c = {};
	mockContext.compositeAreCorrectArguments.add(hasCorrectArgument);
	mockContext.expectAnything = true;
	mockContext.numberOfArgs = index+1;

	c.expect = function() {
		var args = [index+1,mockContext];
		for (var i = 0; i < arguments.length; i++) {
			args.push(arguments[i]);
		};
		return expect.apply(null,args);
	};

	c.expectAnything = function() {
		return c;
	}

	c.return = function(arg) {
		return _return(arg,index+1,mockContext);
	};

	c.whenCalled = function(callback) {
		mockContext.whenCalledEmitter.add(callback);
		return c;
	};

	c.repeat = function(times) {
		return _return(undefined,index+1,mockContext).repeat(times);
	};

	c.throw = function(error) {
		var _throw = newThrow(error);
		return c.whenCalled(_throw);	
	};

	c.repeatAny = function() {
		return _return(undefined,index+1,mockContext).repeatAny();
	};

	return c;
}

module.exports = expectAnything;