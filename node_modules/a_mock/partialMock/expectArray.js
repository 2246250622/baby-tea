yellow = '\u001b[33m',
reset = '\u001b[0m';

function expectArray(index,mockContext,array) {
	console.log('\n%s%s%s', yellow, 'expectArray is deprecated, use expect instead.', reset);	
	var newHasEqualArgumentArray = require('./newHasEqualArgumentArray');
	var expectCore = require('./expectCore');
	var isCorrectArgument = newHasEqualArgumentArray(array,index);	
	return expectCore(isCorrectArgument,index,mockContext);
}

module.exports = expectArray;