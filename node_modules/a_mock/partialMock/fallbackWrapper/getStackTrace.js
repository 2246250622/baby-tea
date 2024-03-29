module.exports  = function getStackTrace() {

	try	{
		throw new Error();

	}
	catch(e) {
		var lines = e.stack.split('\n');				
		lines.splice(0,4);
		var stack = lines.join('\n');
		return stack;
	}
};
