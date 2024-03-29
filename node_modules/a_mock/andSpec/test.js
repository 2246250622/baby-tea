var assert = require('assert');
var test = require('../test');
var newRequireMock = require('../partialMock/simple/newRequireMock');
var newMock = require('../partialMock/simple/newMock');


(function(){
	console.log('and');
	var sut = require('../and');

	(function() {
		console.log('execute');
		var returned = sut();

		test('it returns true',function() {
			assert.ok(returned)
		});
	})();

	(function() {
		console.log('add');
		var newMonadicAnd = newRequireMock('./and/newMonadicAnd');
		var monadicAnd = {};
		var predicate = {};
		newMonadicAnd.expect(predicate).return(monadicAnd);
		
		var returned = sut.add(predicate);

		test('it returns monadicAnd',function() {
			assert.equal(monadicAnd,returned);
		});
	})();

})();

