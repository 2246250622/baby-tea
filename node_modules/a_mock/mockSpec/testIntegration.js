var assert = require('assert');
var test = require('../test');
var mock = require('../mock');

(function clearCache() {
	Object.keys(require.cache).forEach(function(key) { delete require.cache[key]; });
})();

console.log('mock');

(function(){
	console.log('an object');
	var realName = 'Alfonzo';
	function newCustomer() {

		var c = {};
		var _name = realName;

		c.getName = function () 
		{
			return _name;
		};

		c.realName = 'propValue';
		return c;
	}


	var customer = newCustomer(realName);
	var customerMock = mock(customer);
	var expected = {};
	customerMock.getName.expect().return(expected);

	var returned = customer.getName();
	var returned2 = customer.getName();

	test('it should first return from mock',function() {
		assert.equal(returned,expected);
	});

	test('it should secondly return from real object',function() {
		assert.equal(returned2,realName);
	});

	test('it verify should return true',function() {
		assert.ok(customerMock.verify());
	});

})();


(function foo(){
	console.log('violating function throws with minium stack trace');

	var sut = mock();
	var lines;
  	
  	try {
  		sut();
  	}
  	catch(e) {
  		lines = e.stack.split('\n');
  	}


	test('reports current function as first source',function() {
		assert.deepEqual(lines[1].indexOf('at foo') > 0,true);
	});

	test('reports current file as first source',function() {
		assert.deepEqual(lines[1].indexOf('testIntegration') > 0,true);
	});


})();

(function bar(){
	console.log('violating function throws with minium stack trace given two expectations');

	var sut = mock();
	var lines;
  	
  	try {
  		sut.expect(1);
  		sut.expect(2);
  		sut();
  	}
  	catch(e) {  		
  		lines = e.stack.split('\n');
  	}


	test('reports current function as first source',function() {
		assert.deepEqual(lines[1].indexOf('at bar') > 0,true);
	});

	test('reports current file as first source',function() {
		assert.deepEqual(lines[1].indexOf('testIntegration') > 0,true);
	});


})();
