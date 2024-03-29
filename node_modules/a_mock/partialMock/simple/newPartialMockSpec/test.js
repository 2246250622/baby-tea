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
	console.log('partialMockSpec');

	(function() {		
		console.log('expect return foo once');
		
		var sut = newSut(original);

		sut.expect().return(foo);

		var firstReturned = sut();
		var secondReturned = sut();
		var thirdReturned = sut();

		test('it should execute returns foo first time', function(){
			assert.equal(foo,firstReturned);
    	});

		test('it should execute returns original second time', function(){
			assert.equal(originalReturnValue,secondReturned);
    	});

		test('it should execute returns original third time', function(){
			assert.equal(originalReturnValue,thirdReturned);
    	});

	})();

	(function() {		
		console.log('expect return foo twice');		
		var sut = newSut(original);
		sut.expect().return(foo);
		sut.expect().return(foo);

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
		console.log('expect return after reset');		
		var sut = newSut(original);
		sut.expect().return(foo);
		sut.expect().return(foo);

		var firstReturned = sut();
		sut.reset();
		var secondReturned = sut();
		sut.expect().return(foo);
		var thirdReturned = sut();

		test('it should execute returns foo first time', function(){
			assert.equal(foo,firstReturned);
    	});

		test('it should execute returns original second time', function(){
			assert.equal(originalReturnValue,secondReturned);
    	});

		test('it should execute returns foo third time', function(){
			assert.equal(foo,thirdReturned);
    	});

	})();

	(function() {		
		console.log('expect return foo then baz');		
		var sut = newSut(original);
		sut.expect().return(foo);
		sut.expect().return(baz);

		var firstReturned = sut();
		var secondReturned = sut();
		var thirdReturned = sut();

		test('it should execute returns foo first time', function(){
			assert.equal(foo,firstReturned);
    	});

		test('it should execute returns baz second time', function(){
			assert.equal(baz,secondReturned);
    	});

		test('it should execute returns original third time', function(){
			assert.equal(originalReturnValue,thirdReturned);
    	});

	})();

	(function() {		
		console.log('expect return when argument is undefined.');	
		var sut = newSut(original);
		var arg = {};
		var someUndefined;
		sut.expect(arg).expectAnything().return(foo);
		sut.expect().return(baz);

		var firstReturned = sut(arg);
		var secondReturned = sut(arg,someUndefined);
		var thirdReturned = sut(arg,someUndefined);

		test('it should execute returns original first time', function(){
			assert.equal(originalReturnValue,firstReturned);
    	});

		test('it should execute returns foo second time', function(){
			assert.equal(foo,secondReturned);
    	});

		test('it should execute returns original third time', function(){
			assert.equal(originalReturnValue,thirdReturned);
    	});

	})();
})();
