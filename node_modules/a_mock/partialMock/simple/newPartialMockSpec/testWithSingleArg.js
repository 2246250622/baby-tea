var newSut = require('../newPartialMock');
var assert = require('assert');
var test = require('../../../test');

		var originalReturnValue = {};
		function original() {
			return originalReturnValue;
		}

		var foo ={};
		var baz = {};
		var arg1 = {};		


(function(){
	console.log('partialMockSpec');

	(function() {		
		console.log('expect return foo once.');		
		var sut = newSut(original);
		require('../newPartialMock')(function() {});
		sut.expect(arg1).return(foo);
		var s = require('../newPartialMock')(function() {});
		var firstReturned = sut({});
		var secondReturned = sut(arg1);
		var thirdReturned = sut(arg1);

		test('it should execute returns original when wrong argument', function(){
			assert.equal(originalReturnValue,firstReturned);
    	});

		test('it should execute returns foo when correct argument', function(){
			assert.equal(foo,secondReturned);
    	});

		test('it should execute returns original when correct argument second time', function(){
			assert.equal(originalReturnValue,thirdReturned);
    	});

	})();

	(function() {		
		console.log('expect return foo twice.');
		
		var sut = newSut(original);
		sut.expect(arg1).return(foo);
		sut.expect(arg1).return(foo);

		var firstReturned = sut(arg1);
		var secondReturned = sut(arg1);
		var thirdReturned = sut(arg1);

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
		console.log('expect return foo then baz');	
		var sut = newSut(original);
		sut.expect().return(foo);
		sut.expect(arg1).return(baz);

		var firstReturned = sut();
		var secondReturned = sut(arg1);
		var thirdReturned = sut(arg1);

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
		console.log('expect anything return foo, then expect arg1 return baz.');
		var sut = newSut(original);
		sut.expectAnything().return(foo);
		sut.expect(arg1).return(baz);

		var firstReturned = sut('abc');
		var secondReturned = sut('abc');
		var thirdReturned = sut(arg1);

		test('it should execute returns foo first time', function(){
			assert.equal(foo,firstReturned);
    	});

		test('it should execute returns original second time', function(){
			assert.equal(originalReturnValue,secondReturned);
    	});

		test('it should execute returns baz third time', function(){
			assert.equal(baz,thirdReturned);
    	});

	})();

})();
