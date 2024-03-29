var assert = require('assert');
var test = require('../../test');
var newMock = require('../simple/newMock');
var newRequireMock = require('../simple/newRequireMock');
var getStackTrace = newRequireMock('./fallbackWrapper/getStackTrace');
var newSut = require('../newFallbackWrapper');

(function() {
	console.log('newFallbackWrapper');	
	var sut = newSut(originalFallback);
	var didIncrementStackTrace
	var originalStackTraceLimit = Error.stackTraceLimit;
	var originalTrace = 'origTrace';
	
	function originalFallback() {
		didIncrementStackTrace = (Error.stackTraceLimit == originalStackTraceLimit + 2);
		
		var e =  new Error('other');
		e.stack = originalTrace;
		throw e;
	}

	(function() {
		console.log('execute with mock error');
		var arg = {};				
		var error;		
			
		try {
			sut(arg);
		}
		catch(e) {
			console.log('foo: ' + e.stack);
			error = e;
		}		

		test('it increments stack trace limit by two before executing fallback', function() {
			assert.ok(didIncrementStackTrace);
		});

		test('it should not change stack on error',function() {
			assert.equal(error.stack,originalTrace);
		});

		test('it resets stack trace limit', function() {
			assert.equal(Error.stackTraceLimit,originalStackTraceLimit);
		});
	})();
})();
