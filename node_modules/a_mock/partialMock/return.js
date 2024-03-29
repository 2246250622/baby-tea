function _return(returnValue,index,mockContext) {
	var newHasNoMoreArguments = require('./newHasNoMoreArguments');
	var setExecute = require('./setExecute');
	var oneTime = 1;

	mockContext.numberOfArgs = undefined;
	var hasNoMoreArguments = newHasNoMoreArguments(index, mockContext);	
	var hasCorrectArgs = mockContext.compositeAreCorrectArguments.add(hasNoMoreArguments);	
	setExecute(returnValue,hasCorrectArgs,mockContext,oneTime);	
	var c = {};

	c.repeat = function(times) {
		setExecute(returnValue,hasCorrectArgs,mockContext,times-1);	
		return c;
	};

	c.repeatAny = function() {
		setExecute(returnValue,hasCorrectArgs,mockContext);	
		return c;
	};

	return c;
}

module.exports = _return;