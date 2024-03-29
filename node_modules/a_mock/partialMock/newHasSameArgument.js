var isEqualArg = require('./hasSameArgument/isEqualArg');

function _new(expectedArg,index) {
	function hasSameArgument(){
		return arguments.length > index && 
				isEqualArg(expectedArg,arguments[index]);
	}

	return hasSameArgument;
}

module.exports = _new;