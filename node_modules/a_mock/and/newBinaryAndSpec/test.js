var assert = require('assert');
var test = require('../../test');
var newRequireMock = require('../../partialMock/simple/newRequireMock');
var newMock = require('../../partialMock/simple/newMock');

var newBinaryAnd = newRequireMock('./newBinaryAnd');
var newSut = require('../newBinaryAnd');


(function(){
	console.log('newBinaryAnd');
	var predicate = newMock();
	var predicate2 = newMock();
	var sut = newSut(predicate,predicate2);

	(function() {
		console.log('execute when predicate1 returns false');
		var arg = {};
		predicate.expect(arg).return(false);		
		var returned = sut(arg);

		test('it returns false',function() {
			assert.equal(false,returned);
		});
	})();

	(function() {
		console.log('execute when predicate1 returns true, predicate2 returns false');
		var arg = {};
		predicate.expect(arg).return(true);		
		predicate2.expect(arg).return(false);		
		var returned = sut(arg);

		test('it returns false',function() {
			assert.equal(false,returned);
		});
	})();

	(function() {
		console.log('execute when predicate1 returns true, predicate2 returns true');
		var arg = {};
		predicate.expect(arg).return(true);		
		predicate2.expect(arg).return(true);		
		var returned = sut(arg);

		test('it returns false',function() {
			assert.equal(true,returned);
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

		test('it returns expected',function() {
			assert.equal(expected,returned);
		});
	})();
});

