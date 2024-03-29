var assert = require('assert');
var test = require('../../test');
var newMock = require('../simple/newMock');
var newRequireMock = require('../simple/newRequireMock');
var isEqualArg = newRequireMock('./hasSameArgument/isEqualArg');
var newSut = require('../newHasSameArgument');


(function() {
	console.log('newHasSameArgument');
	var expectedArg = {};
	var index = 1;
	
	var sut = newSut(expectedArg,index);

	(function() {
		console.log('too few arguments.execute');
		var arg = {};
		var returned = sut(arg);

		test('it should return false',function() {
			assert.equal(false,returned);
		});
		
	})();

	(function() {
		console.log('incorrect argument.execute');
		var arg = {};
		isEqualArg.expect(expectedArg).expect(arg).return(false);
		var returned = sut('arg',arg);

		test('it should return false',function() {
			assert.equal(false,returned);
		});

	})();

	(function() {
		console.log('correct argument.execute');
		var arg = {};
		isEqualArg.expect(expectedArg).expect(arg).return(true);

		var returned = sut('arg',arg);

		test('it should return true',function() {
			assert.equal(true,returned);
		});

	})();

/*	(function() {
		var obj;
		obj = [];
		for (var property in obj  ) {
			console.log(property);
		};

		obj = {foo: 'hei'};
		for (var property in obj  ) {
			console.log(property);
		};


		var Foo = function() {
			this.gag = 'gag';
			this.baz = {};
		}
		Foo.prototype.bar = function(){ console.log('hello ' + this.gag);};

		obj = new Foo();
		obj2 = new Foo();
		for (var property in obj  ) {
			console.log(property);
		};
		obj.bar();
		assert.equal(obj.baz,obj2.baz);
*/

})();
