var assert = require('assert');
var test = require('../../../../test');
var arg1 = 'a';
var arg2 = {};
var arg3 = 'c';
var errorMsg = "Unexpected arguments: a [object Object] c."
var thrownErrorMsg;

(function(){
	console.log('throwUnexpectedArguments');
	var sut = require('../throwUnexpectedArguments');
	try	{
		sut(arg1,arg2,arg3);
	}
	catch(error) {
		thrownErrorMsg = error;
	}

	test('it should throw correct msg', function(){
		assert.equal(errorMsg,thrownErrorMsg);
    });

})();
