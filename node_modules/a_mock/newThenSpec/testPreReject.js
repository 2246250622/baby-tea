var assert = require('assert');
var test = require('../test');
var mock = require('../partialMock/simple/newMock');

(function() {
    console.log('then pre reject');

    var expected = {};
    var expected2 = {};
    var actual;
    var actual2;
    var expectedRepeated = {};
    var actualRepeated2;

    var p = require('../newThen').reject(expected);
    p.then(mock(),
        function(returned) {
            actual = returned;
            return expected2;
        })
        .then(function(returned) {
            actual2 = returned;
        }, mock());

    p.then(mock(),
        function(returned) {
            actualRepeated = returned;
            return expectedRepeated;
        })
        .then(function(returned) {
            actualRepeated2 = returned;
        }, mock());


    test('invokes failed', function() {
        assert.equal(actual, expected);
    });

    test('invokes success when chained', function() {
        assert.equal(actual2, expected2);
    });

    test('invokes failed when repeated', function() {
        assert.equal(actualRepeated, expected);
    });

    test('invokes success when repeated and chained', function() {
        assert.equal(actualRepeated2, expectedRepeated);
    });
    
})();
