var assert = require('assert');
var test = require('../../test');
var newMock = require('../simple/newMock');
var newRequireMock = require('../simple/newRequireMock');

var newSut = require('../newHasEqualArgumentArray');


(function() {
	console.log('newHasEqualArgumentArray');
	var expectedElement1 = {};
	var expectedElement2 = {};
	var expectedArg = [expectedElement1,expectedElement2];
	var index = 1;
	
	var sut = newSut(expectedArg,index);

	(function() {
		console.log('too few arguments.execute');
		var returned = sut('arg');

		test('it should return false',function() {
			assert.equal(false,returned);
		});
		
	})();

	(function() {
		console.log('incorrect argument.execute');
		var returned = sut('arg',[expectedElement1,'wrongElement']);

		test('it should return false',function() {
			assert.equal(false,returned);
		});

	})();

	(function() {
		console.log('incorrect arrayLength.execute');
		var returned = sut('arg',[expectedElement1,expectedElement2,'off-by-one']);

		test('it should return false',function() {
			assert.equal(false,returned);
		});

	})();


	(function() {
		console.log('correct argument.execute');
		var returned = sut('arg',[expectedElement1,expectedElement2]);

		test('it should return true',function() {
			assert.equal(true,returned);
		});

	})();
	
})();
