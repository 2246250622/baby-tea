var mod = require('module');

function expect(request) {
	return mod._requireMock.expect(request).expectAnything().expectAnything();
}

if(!mod._requireMock) {

	mod._requireMock = require('./partialMock/simple/newPartialMock')(mod._load);
	var originalLoad = mod._load;
	mod._load = loadHook;

	function loadHook(request,parent,isMain) {
		return mod._requireMock(request,parent,isMain);
	}

}
expect.reset = mod._requireMock.reset;


module.exports = expect;