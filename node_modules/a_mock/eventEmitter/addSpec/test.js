var assert = require('assert');
var test = require('../../test');
var sut = require('../add');

(function(){
	console.log('addSpec');

	(function() {
		console.log('execute');
		var context = {};
		var callbacks = [{}];
		context.callbacks = callbacks;
		var callback = {};

		sut(context,callback);
		
		test('it should add callback to callbacks',function() {
			assert.equal(callbacks[1],callback);
		});
	})();

})();
