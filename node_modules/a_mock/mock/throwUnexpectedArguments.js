function throwUnexpectedArguments() {	
	var msg = 'Unexpected arguments:'	

	for(var i = 0; i < arguments.length ; i++ )
	{
		msg = msg + ' ' + arguments[i];
	}	
	var e = new Error();
	e.name = 'Mock Error';
	e.message = msg + '.';
	throw e;
}

module.exports = throwUnexpectedArguments;