function throwUnexpectedArguments() {
	var msg = 'Unexpected arguments:'
	for(var i = 0; i < arguments.length ; i++ )
	{
		msg = msg + ' ' + arguments[i];
	}
	throw new Error(msg + '.');
}

module.exports = throwUnexpectedArguments;