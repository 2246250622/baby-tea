var assert = require('assert');
var test = require('../../test');
var sut = require('../negotiateIncrementExpectCount');

(function() {
	console.log('negotiateIncrementExpectCount');

	(function(){
		console.log('times is undefined.execute');
		var mockContext = {};		
		mockContext.expectCount = 2;
		var times;
		sut(times,mockContext);

		test('it should not change expectCount',function() {
			assert.ok(mockContext.expectCount,2);
		});
	})();
	
	(function(){
		console.log('times is set.execute');
		var mockContext = {};		
		mockContext.expectCount = 2;
		var times = 5;
		sut(times,mockContext);

		test('it should increment expectCount',function() {
			assert.equal(mockContext.expectCount,3);
		});
	})();

})();