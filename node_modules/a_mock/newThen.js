function newThen() {
	var isError;
	var settledValue;
	var isSettled;
	var chains = [];

	var c = function(valueToResolveWith, errorToFailWith) {
		if (arguments.length == 0)
			return c.resolve();
		if (valueToResolveWith)
			return c.resolve(valueToResolveWith);
		return c.reject(errorToFailWith);
	};

	c.then = function(success, fail) {
		var chain = {};
		chain.success = extractCallback(success);
		chain.fail = extractCallback(fail);
		var p = newThen();
		chain.promise = p;
		chains.push(chain);
		negotiatePromises();
		return p;
	};

	c.resolve = function(value) {
		isSettled = true;
		settledValue = value;
		negotiatePromises();
		return c;
	};

	c.reject = function(e) {
		isSettled = true;
		isError = true;
		settledValue = e;
		negotiatePromises();
		return c;
	};

	function negotiatePromises() {
		if (!isSettled)
			return;
		for (var i = 0; i < chains.length; i++) {
			var chain = chains[i];
			var cb;
			if (isError)
				cb = chain.fail;
			else
				cb = chain.success;

			var wrapped = wrap(cb.bind(null, settledValue));
			wrapped.then(function(nextValue) {
				chain.promise.resolve(nextValue);
			}, function(e) {
				chain.promise.reject(e);
			});
		}
		chains = [];
	}


	function extractCallback(cb) {
		if (typeof cb === 'function')
			return cb;
		return passThrough;
	}

	function passThrough(value) {
		if (isError)
			return newThen().reject(value);
		return newThen().resolve(value);
	}

	return c;
}


function wrap(cb) {
	try {
		var result = cb();
		if (result && typeof result.then === 'function') {
			return result;
		}
		return {
			then: function(success) {
				success(result);
			}
		};
	} catch (e) {
		return {
			then: function(success, fail) {
				fail(e);
			}
		};
	}
}

newThen.resolve = function(settledValue) {
	var p = newThen();
	p.resolve(settledValue);
	return p;
};

newThen.reject = function(e) {
	var p = newThen();
	p.reject(e);
	return p;
};

module.exports = newThen;
