var assert = require('assert');
var test = require('../../test');
var newMock = require('../simple/newMock');
var newRequireMock = require('../simple/newRequireMock');
var getStackTrace = newRequireMock('./fallbackWrapper/getStackTrace');
var newSut = require('../newFallbackWrapper');

(function() {
	console.log('newFallbackWrapper');
	
	var originalFallback = newMock();
	var sut = newSut(originalFallback);
	var didIncrementStackTrace
	var originalStackTraceLimit = Error.stackTraceLimit;

	(function() {
		console.log('execute');
		var arg = {};		
		var expected = {};
			
		originalFallback.expect(arg).whenCalled(onFallback).return(expected);
		var returned = sut(arg);

		test('it increments stack trace limit by two before executing fallback', function() {
			assert.ok(didIncrementStackTrace,expected);
		});

		test('it should result from originalFallback',function() {
			assert.equal(returned,expected);
		});

		test('it resets stack trace limit', function() {
			assert.equal(Error.stackTraceLimit,originalStackTraceLimit);
		});


		(function() {
			console.log('setFallback');
			var fallback = newMock();			
			sut.setFallback(fallback);

			(function() {
				console.log('execute');
				didIncrementStackTrace = false;
				var expected = {};
				fallback.expect(arg).whenCalled(onFallback).return(expected);
				var returned = sut(arg);
				

				test('it increments stack trace limit by two before executing fallback', function() {
					assert.ok(didIncrementStackTrace);
				});

				test('it should return result from new fallback',function() {
					assert.equal(returned,expected);
				});

				test('it resets stack trace limit', function() {
					assert.equal(Error.stackTraceLimit,originalStackTraceLimit);
				});
			})();
		})();
	})();

	function onFallback() {
		didIncrementStackTrace = (Error.stackTraceLimit == originalStackTraceLimit + 2);
	}


})();
