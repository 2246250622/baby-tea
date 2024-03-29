var newFallbackWrapper = require('../newFallbackWrapper');
var newAnd = require('../../newMutableAnd')

function _new(mockContext,originalFallback) {
	var and = newAnd();	
	mockContext.execute = newFallbackWrapper(originalFallback);
	mockContext.originalFallback = originalFallback;
	mockContext.lastExecute = mockContext.execute;
	mockContext.compositeAreCorrectArguments = and;
	mockContext.expectCount = 0;
	
	return mockContext;
}

module.exports = _new;