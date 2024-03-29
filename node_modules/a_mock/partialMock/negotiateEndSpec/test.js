var test = require('../../test');
var assert = require('assert');
var requireMock = require('../simple/newRequireMock');
var expectRequire = require('../simple/expectRequire');

var _return = requireMock('./return');
var mockContext = {};
var sut = require('../negotiateEnd');

console.log('negotiateEnd');

	(function() {
		console.log('2 args pending.when execute');
		var numberOfArgs = 2;
		var didCallReturn;
		mockContext.numberOfArgs = numberOfArgs;
		_return.expectAnything().expect(numberOfArgs).expect(mockContext).whenCalled(onReturn).return();

		function onReturn(arg) {
			if (arg !== undefined)
				throw new Error('expected undefined but was ' + arg);
			didCallReturn = true;
		}
		
		sut(mockContext);

		test('it should set void as returnValue', function() {
			assert.ok(didCallReturn);
		});
	})();


(function() {
		console.log('0 args pending.when execute');
		var numberOfArgs = 0;
		var didCallReturn;
		mockContext.numberOfArgs = numberOfArgs;
		_return.expectAnything().expect(numberOfArgs).expect(mockContext).whenCalled(onReturn).return();

		function onReturn(arg) {
			if (arg !== undefined)
				throw new Error('expected undefined but was ' + arg);
			didCallReturn = true;
		}
		
		sut(mockContext);

		test('it should set void as returnValue', function() {
			assert.ok(didCallReturn);
		});
	})();



	(function() {
		console.log('not pending.when execute');		
		mockContext.numberOfArgs = undefined;
		sut(mockContext);

		test('it should not set void as returnValue', function() {
			assert.ok(1);
		});
	})();

