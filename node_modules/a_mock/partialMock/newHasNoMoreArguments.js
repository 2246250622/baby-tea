var empty = require('../and');

function _new(maxLength, context) {
	if (context.expectAnything) {
		context.expectAnything = false;
		return empty;	
	}

	function hasNoMoreArguments(){		
		return (arguments.length == maxLength);
	}

	return hasNoMoreArguments;
}

module.exports = _new;