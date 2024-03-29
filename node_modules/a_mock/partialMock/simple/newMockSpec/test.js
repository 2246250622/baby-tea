var assert = require('assert');
var test = require('../../../test');
var expectRequire = require('../expectRequire');
var newMockCore = require('../newPartialMock');

function newMock() {
	return newMockCore(empty);
}

function empty() {}

var throwUnexpectedArguments = {};
var newPartialMock = newMock();

expectRequire('./newPartialMock').return(newPartialMock);
expectRequire('./newMock/throwUnexpectedArguments').return(throwUnexpectedArguments);

(function(){
	console.log('newMock');
	var partialMock = {};
	newPartialMock.expect(throwUnexpectedArguments).return(partialMock);
	var returned = require('../newMock')();

	test('it should return partialMock', function(){
		assert.equal(partialMock,returned);
    });

})();
