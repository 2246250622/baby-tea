var assert = require('assert');
var test = require('../../test');
var newMock = require('../../partialMock/simple/newMock');

(function(){
	console.log('propertyMock.new');
	newSut = require('../propertyMock');

	var subject = {};
	var a = newMock();
	var a1 = 'a1';
	a.a1 = a1;
	subject.a = a;

	var mock = newMock();

	var objectMock = {}
	var sut = newSut(subject,'a',mock);

	test('it should set subProperties',function() {
		assert.equal(sut.a.a1,a1);
	});

	(function() {
		console.log('execute mocked property');
		var mockedValue = {};
		var arg = {};
		mock.expect(arg).return(mockedValue);
		var returned = sut(arg);

		test('it should return mocked value',function() {
			assert.equal(returned,mockedValue)
		});
	})();
	
})();
