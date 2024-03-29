var newObject = require('../newObject')
var reset = require('./mockContext/reset');

function _new(originalFallback) {
	var c = newObject();
	c = reset(c,originalFallback);
	c.reset = function() {
		return reset(c, originalFallback);
	};
	return c;	
}

module.exports = _new;