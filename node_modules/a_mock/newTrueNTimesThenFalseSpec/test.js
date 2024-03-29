var assert = require('assert');
var test = require('../test');
var newSut = require('../newTrueNTimesThenFalse');

(function(){
	console.log('newTrueNTimesThenFalse');
	
	(function() {
		console.log('two times');
		var times = 2;
		var sut = newSut(times);

		(function(){
			console.log('execute three times');
			var returned = sut();
			var returned2 = sut();
			var returned3 = sut();

			test('it should return true first time',function() {
				assert.ok(returned);
			});

			test('it should return true second time',function() {
				assert.ok(returned2);
			});

			test('it should return false third time',function() {
				assert.equal(false,returned3);
			});

		})();

	})();

	(function() {
		console.log('undefined times');
		var sut = newSut();		
		
		(function(){
			console.log('execute n times');
			var returned = sut();
			var returned2 = sut();
			var returned3 = sut();

			test('it should return true first time',function() {
				assert.ok(returned);
			});

			test('it should return true second time',function() {
				assert.ok(returned2);
			});

			test('it should return true nth time',function() {
				assert.ok(returned3);
			});

		})();
	})();
})();
