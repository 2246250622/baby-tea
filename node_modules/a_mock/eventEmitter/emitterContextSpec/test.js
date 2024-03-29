var assert = require('assert');
var test = require('../../test');
var newSut = require('../emitterContext');

(function(){
	console.log('newEmitterContext');
	var returned = newSut();

	test('it should set callbacks to empty array',function() {
		assert.equal(returned.callbacks.length,0);
	});
})();
