var sut = require('../expectRequire');
var test = require('../test');
var assert = require('assert');

var fooFake = {};
var bazFake = {};
	

(function(){
	console.log('expectRequire');
	
	(function() {		
		console.log('require');
		sut('./foo').return(fooFake);
			sut('./baz').return(bazFake);

		var firstReturned = require('./foo');
		var secondReturned = require('./baz');
		var thirdReturned = require('./foo')
		var fourthReturned = require('./baz');
		
		test('it should execute returns fooFake first time', function(){
			assert.equal(fooFake,firstReturned);
    	});

		test('it should execute returns bazFake second time', function(){
			assert.equal(bazFake,secondReturned);
    	});

    	test('it should execute returns real foo third time', function(){
			assert.notEqual(bazFake,thirdReturned);
			assert.notEqual(fooFake,thirdReturned);
    	});

    	test('it should execute returns real foo fourth time', function(){
			assert.notEqual(bazFake,fourthReturned);
			assert.notEqual(fooFake,fourthReturned);
    	});

	})();

})();

(function(){
	console.log('expectRequire reset');
	
	(function() {		
		console.log('require');
		sut('./foo').return(fooFake);
		sut.reset();
		var returned = require('./foo');
		sut('./foo').return(fooFake);
		var returnedSecond = require('./foo');


		
		test('it should execute returns real foo', function(){
			assert.notEqual(fooFake,returned);
    	});

		test('it should execute returns fake foo second time', function(){
			assert.equal(fooFake,returnedSecond);
    	});

	})();

})();
