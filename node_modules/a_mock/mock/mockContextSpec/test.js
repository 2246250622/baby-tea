var assert = require('assert');
var test = require('../../test');
var newRequireMock = require('../../partialMock/simple/newRequireMock');

(function(){
	console.log('mockContext');
	var newVerify = newRequireMock('../newMutableAnd');
	var sut = require('../mockContext');

	(function() {
		console.log('empty input.new');
		var verify = {};
		newVerify.expect().return(verify);	
		var returned = sut();

		test('it should set verify', function(){
			assert.equal(returned.verify,verify);
    	});
	})();

	(function() {		
		console.log('nonEmpty input.new');
		var input = {};		
		var returned = sut(input);

		test('it should return same', function(){
			assert.equal(returned,input);
    	});
	})();
})();
