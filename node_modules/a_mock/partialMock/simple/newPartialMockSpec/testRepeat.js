var newSut = require('../newPartialMock');
var assert = require('assert');
var test = require('../../../test');
		var originalReturnValue = {orig:''};
		function original() {
			return originalReturnValue;
		}

		var foo ={foo:''};
		var baz = {baz:''};		


(function(){
	console.log('partialMockSpec.repeat.');

	(function() {		
		console.log('expect return foo three times.');
		var sut = newSut(original);

		sut.expect().return(foo).repeat(3);

		var firstReturned = sut();
		var secondReturned = sut();
		var thirdReturned = sut();

		test('it should execute returns foo first time', function(){
			assert.equal(foo,firstReturned);
    	});

		test('it should execute returns foo second time', function(){
			assert.equal(foo,secondReturned);
    	});

		test('it should execute returns original third time', function(){
			assert.equal(originalReturnValue,thirdReturned);
    	});

	})();

	(function() {		
		console.log('expect return foo any.');
		var sut = newSut(original);

		sut.expect().return(foo).repeatAny();

		var firstReturned = sut();
		var secondReturned = sut();
		var thirdReturned = sut();

		test('it should execute returns foo first time', function(){
			assert.equal(foo,firstReturned);
    	});

		test('it should execute returns foo second time', function(){
			assert.equal(foo,secondReturned);
    	});

		test('it should execute returns foo third time', function(){
			assert.equal(foo,thirdReturned);
    	});

	})();
})();
