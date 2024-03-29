var assert = require('assert');
var test = require('../test');
var newMock = require('../partialMock/simple/newMock');
var expectRequire = require('../partialMock/simple/expectRequire');

var newMockMock = newMock();
var expectRequireMock = newMock();
expectRequireMock.clear = {};

expectRequire('./mock').return(newMockMock);
expectRequire('./expectRequire').return(expectRequireMock);

(function() {
	console.log('newRequireMock');
	var didExpectRequireReturnMock = false;
	var mock = {};
	var moduleName = {};
	var expectation = {};
	var returnMock = newMock();
	
	newMockMock.expect().return(mock);
	expectRequireMock.expect(moduleName).return(expectation);
	expectation.return = returnMock;
	returnMock.expect(mock).whenCalled(onReturnMock).return(null);
	var sut = require('../requireMock');
	var returned = sut(moduleName);

	function onReturnMock() {
		didExpectRequireReturnMock = true;
	}

	test('it should return mock', function() {
		assert.equal(mock,returned);
	});

	test('it should expectRequire to return mock',function(){
		assert.ok(didExpectRequireReturnMock);
	});

	test('reset should point at expectRequire.reset',function(){
		assert.equal(sut.reset, expectRequireMock.reset);
	});


})();
