var _return = require('./return');

function negotiateEnd(mockContext) {			
	var numberOfArgs = mockContext.numberOfArgs;	
	if (numberOfArgs === undefined)
		return;
	var returnValue;	
	_return(returnValue,numberOfArgs,mockContext);
};

module.exports = negotiateEnd;