var assert = require('assert');
var test = require('../../test');
var newMock = require('../simple/newMock');
var newRequireMock = require('../simple/newRequireMock');

var newSut = require('../newHasNoMoreArguments');


(function() {
    console.log('newHasNoMoreArguments');
    var length = 1;
    var mockContext = {};


    (function() {
        console.log('two arguments too much.execute');
        mockContext.expectAnything = true;
        var sut = newSut(length, mockContext);
        var returned = sut('somearg', 'c', 'd');

        test('it should return true', function() {
            assert.equal(true, returned);
        });

    })();

    (function() {
        console.log('two arguments too much, but expectAnything.execute');
        mockContext.expectAnything = false;
        var sut = newSut(length, mockContext);

        var returned = sut('somearg', 'c', 'd');

        test('it should return false', function() {
            assert.equal(false, returned);
        });

    })();

    (function() {
        console.log('one argument too much.execute');
        mockContext.expectAnything = false;
        var sut = newSut(length, mockContext);

        var returned = sut('somearg', 'c');

        test('it should return false', function() {
            assert.equal(false, returned);
        });

    })();

    (function() {
        console.log('correct number of arguments.execute');
        mockContext.expectAnything = false;
        var sut = newSut(length, mockContext);

        var returned = sut('a');

        test('it should return true', function() {
            assert.equal(true, returned);
        });
    })();
})();
