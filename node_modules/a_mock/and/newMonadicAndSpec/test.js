var assert = require('assert');
var test = require('../../test');
var newRequireMock = require('../../partialMock/simple/newRequireMock');
var newMock = require('../../partialMock/simple/newMock');

var newBinaryAnd = newRequireMock('./newBinaryAnd');
var newSut = require('../newMonadicAnd');


(function(){
	console.log('newMonadicAnd');
	var predicate = newMock();	
	var sut = newSut(predicate);

	(function() {
		console.log('execute');
		var arg = {};
		var expected = {};
		predicate.expect(arg).return(expected);
		
		var returned = sut(arg);

		test('returns expected from predicate',function() {
			assert.equal(expected,returned);
		});
	})();


	(function() {
		console.log('add');
		var binaryAnd = {};
		var predicate = {};
		var predicate2 = {};
		var expected = {};
		newBinaryAnd.expect(sut).expect(predicate).return(binaryAnd);
		newBinaryAnd.expect(binaryAnd).expect(predicate2).return(expected);
		
		var returned = sut.add(predicate,predicate2);

		test('returns expected',function() {
			assert.equal(expected,returned);
		});
	})();

})();
