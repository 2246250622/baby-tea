var sut = require('../expectRequire');
var assert = require('assert');
var test = require('../../../test');

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
