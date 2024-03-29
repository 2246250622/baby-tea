var assert = require('assert');
var test = require('../test');
var newRequireMock = require('../partialMock/simple/newRequireMock');

(function(){
	console.log('mock');
	var newStrictMock = newRequireMock('./strictMock');
	var newObjectMock = newRequireMock('./mock/objectMock');
	var mockFuncProperties = newRequireMock('./mock/mockFuncProperties');
	var newPartialMock = newRequireMock('./partialMock');
	var sut = require('../mock');		

	(function() {
		console.log('object input.new');
		var input = {};
		var objectMock = {};
		var didMockFuncProperties;

		newObjectMock.expect(input).return(objectMock);
		mockFuncProperties.expect(input).expect(objectMock).whenCalled(onMockFuncProperties).return(null);

		function onMockFuncProperties() {
			didMockFuncProperties = true;
		}

		
		var returned = sut(input);
	
			test('it should return expected',function() {
				assert.equal(returned,objectMock);
			});
	
			test('it should mock func properties',function() {
				assert.ok(didMockFuncProperties);
		});
	})();

	(function() {
		console.log('func input.new');
		var expected = {};
		var input = function() {};
		newPartialMock.expect(input).return(expected);

		var returned = sut(input);
	
		test('it shold return expected',function() {
			assert.equal(returned,expected);
		});
	
	});

	(function() {
		console.log('empty input new');
		var expected = {};
	
		newStrictMock.expect().return(expected);

		var returned = sut();
	
		test('it shold return expected',function() {
			assert.equal(returned,expected);
		});
	})();

})();
