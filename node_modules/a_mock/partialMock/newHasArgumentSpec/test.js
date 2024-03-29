var assert = require('assert');
var test = require('../../test');
var newMock = require('../simple/newMock');
var newRequireMock = require('../simple/newRequireMock');

var newSut = require('../newHasArgument');


(function() {
	console.log('newHasArgument');
	var index = 1;
	
	var sut = newSut(index);

	(function() {
		console.log('no arg.execute');
		var returned = sut('a');

		test('it should return false',function() {
			assert.equal(false,returned);
		});
		
	})();


	(function() {
		console.log('correct argument.execute');
		var returned = sut('a','b');

		test('it should return true',function() {
			assert.equal(true,returned);
		});

	})();

})();
