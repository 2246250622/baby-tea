var getStackTrace = require('./fallbackWrapper/getStackTrace');

function _new(originalFallback) {

	var fallback = originalFallback;

	function execute() {
		Error.stackTraceLimit = Error.stackTraceLimit + 2;
		try {
			return fallback.apply(null,arguments);	
		}
		catch (e) {			
			if (e.name == 'Mock Error') {
  				e.stack = e.name + ': ' + e.message + '\n' + getStackTrace();
			}
			throw e;
		}
		finally {
			Error.stackTraceLimit = Error.stackTraceLimit - 2;
		}
		
	}

	execute.setFallback = function(fallback2) {
		fallback = fallback2;
	};

	return execute;
}

module.exports = _new;