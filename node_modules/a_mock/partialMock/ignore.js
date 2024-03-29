var alwaysTrue = require('../and');

function ignore(index,mockContext) {
	var expectCore = require('./expectCore');
	return expectCore(alwaysTrue,index,mockContext);
}

module.exports = ignore;