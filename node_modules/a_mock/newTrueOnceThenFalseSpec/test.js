var assert = require('assert');
var test = require('../test');
var newSut = require('../newTrueOnceThenFalse');

(function(){
	console.log('newTrueOnceThenFalse');
	var sut = newSut();

	(function() {
		console.log('execute');
		var returned = sut();
		
		test('it should return true',function() {
			assert.equal(true,returned);
		});

		(function() {
			console.log('execute');
			var returned = sut();
			test('it should return false',function() {
				assert.equal(false,returned);
			});
		})();
	})();
})();
