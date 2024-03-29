var assert = require('assert');
var test = require('../../test');

var sut = require('../verify');

(function() {
	console.log('verifySpec');

	(function(){
		console.log('expectCount is zero.execute');
		var mockContext = {};
		mockContext.expectCount = 0;
		var returned = sut(mockContext);

		test('it should return true',function() {
			assert.ok(returned);
		});
	})();
	
	(function(){
		console.log('expectCount is above zero.execute');
		var mockContext = {};
		mockContext.expectCount = 2;
		var msg;
		try	{
			var returned = sut(mockContext);	
		}
		catch(err) {
			msg = err.message;
		}
		

		test('it should throw mock has 2 pending functions',function() {
			assert.equal(msg,'mock has 2 pending functions');
		});
	})();

})();