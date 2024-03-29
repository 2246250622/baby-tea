var assert = require('assert');
var test = require('../../test');
var newMock = require('../simple/newMock');
var newRequireMock = require('../simple/newRequireMock');

var expectCore  = newRequireMock('./expectCore');
var alwaysTrue = newRequireMock('../and');

var sut = require('../ignore');


(function(){
	console.log('ignore');
	var mockContext = {};
	var index = {};
	var expected = {};

	stubExpectCore();

	function stubExpectCore() {
		expectCore.expect(alwaysTrue).expect(index).expect(mockContext).return(expected);
	}

	var returned  = sut(index,mockContext);

	test('it should return expected from expectCore',function() {
		assert.equal(expected,returned);
	});

})();
