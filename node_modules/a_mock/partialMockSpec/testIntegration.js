var assert = require('assert');
var test = require('../test');
var newMock = require('../partialMock/simple/newMock');
var newSut = require('../partialMock');

var fallbackValue = 'fallbackValue';


function fallback(arg, arg2) {
    return fallbackValue;
}

(function() {
    console.log('partialMock');

    test('it should return expected given stubbed twice with repeat', function() {
        var arg = 'a';
        var arg2 = 'b';
        var expected = {};
        var expected2 = expected;
        var expected3 = {};
        var sut = newSut(fallback);
        sut.expect(arg).return(expected).repeat(2);
        sut.expect(arg2).return(expected3);

        var returned = sut(arg);
        var returned2 = sut(arg);
        var returned3 = sut(arg2);
        var returned4 = sut(arg);

        assert.equal(returned, expected);
        assert.equal(returned2, expected2);
        assert.equal(returned3, expected3);
        assert.equal(returned4, fallbackValue);
    });


    test('it should return expected given stubbed twice', function() {
        var arg = 'a';
        var arg2 = 'b';
        var expected = {};
        var expected2 = {};
        var sut = newSut(fallback);
        sut.expect(arg).return(expected);
        sut.expect(arg2).return(expected2);
        var returned = sut(arg);
        var returned2 = sut(arg2);
        assert.equal(returned, expected);
        assert.equal(returned2, expected2);
    });

    test('it should return resolved given expect empty', function() {
        var expected = {};
        var sut = newSut(fallback);
        sut.expect().resolve(expected);

        sut().then(function(returned) {
            assert.equal(returned, expected);

        });

    });

    test('it should return expected resolved given stubbed twice', function() {
        var arg = 'a';
        var arg2 = 'b';
        var expected = {};
        var expected2 = {};
        var sut = newSut(fallback);
        sut.expect(arg).resolve(expected);
        sut.expect(arg2).resolve(expected2);

        sut(arg).then(function(returned) {
            assert.equal(returned, expected);

        });

        sut(arg2).then(function(returned) {
            assert.equal(returned, expected2);

        });
    });
    test('it should return resolved given expect empty', function() {
        var expected = {};
        var sut = newSut(fallback);
        sut.expect().resolve(expected);

        sut().then(function(returned) {
            assert.equal(returned, expected);

        });

    });

    test('it should return expected resolved given stubbed twice', function() {
        var arg = 'a';
        var arg2 = 'b';
        var expected = {};
        var expected2 = {};
        var sut = newSut(fallback);
        sut.expect(arg).resolve(expected);
        sut.expect(arg2).resolve(expected2);

        sut(arg).then(function(returned) {
            assert.equal(returned, expected);

        });

        sut(arg2).then(function(returned) {
            assert.equal(returned, expected2);

        });
    });

    test('it should return expected rejected given stubbed twice', function() {
        var arg = 'a';
        var arg2 = 'b';
        var expected = {};
        var expected2 = {};
        var sut = newSut(fallback);
        sut.expect(arg).reject(expected);
        sut.expect(arg2).reject(expected2);

        sut(arg).then(null, function(returned) {
            assert.equal(returned, expected);

        });

        sut(arg2).then(null, function(returned) {
            assert.equal(returned, expected2);

        });
    });


    test('it should return expected given stubbed twice and called unordered', function() {
        var arg = 'a';
        var arg2 = 'b';
        var expected = {};
        var expected2 = {};
        var sut = newSut(fallback);
        sut.expect(arg).return(expected);
        sut.expect(arg2).return(expected2);
        var returned2 = sut(arg2);
        var returned = sut(arg);
        assert.equal(returned, expected);
        assert.equal(returned2, expected2);
    });


    test('it should return expected for correct arg', function() {
        var arg = 'a';
        var expected = {};
        var sut = newSut(fallback);
        sut.expect(arg).return(expected);
        var returned = sut(arg);
        var returned2 = sut(arg);
        assert.equal(returned, expected);
        assert.equal(returned2, fallbackValue);
    });

    test('it should return correct after expect, reset, expect', function() {
        var arg = 'a';
        var expected = {};
        var sut = newSut(fallback);
        sut.expect(arg).return(expected);
        sut.reset();
        var returned = sut(arg);
        sut.expect(arg).return(expected);
        var returned2 = sut(arg);
        var returned3 = sut(arg);
        assert.equal(returned, fallbackValue);
        assert.equal(returned2, expected);
        assert.equal(returned3, fallbackValue);
    });

    test('it should throw for correct arg', function() {
        var arg = 'a';
        var error = {};
        var expected = {};
        var sut = newSut();
        sut.expect(arg).throw(error);
        sut.expect(arg).return(expected);
        try {
            sut(arg);
        } catch (e) {
            thrown = e;
        }

        var returned2 = sut(arg);
        assert.equal(error, thrown);
        assert.equal(returned2, expected);
    });

    test('it should throw for void arg', function() {
        var error = {};
        var expected = {};
        var sut = newSut();
        sut.expect().throw(error);
        sut.expect().return(expected);
        try {
            sut();
        } catch (e) {
            thrown = e;
        }

        var returned2 = sut();
        assert.equal(error, thrown);
        assert.equal(returned2, expected);
    });

    test('it should return expected for expected array', function() {
        var element1 = 'a';
        var element2 = 'b';
        var expected = {};
        var sut = newSut(fallback);
        sut.expect([element1, element2]).return(expected);
        var returned = sut([element1, element2]);
        var returned2 = sut([element1, element2]);
        assert.equal(returned, expected);
        assert.equal(returned2, fallbackValue);
    });


    test('it should return expected for correct arg,arg2', function() {
        var arg = 'a';
        var arg2 = 'b';
        var expected = {};
        var sut = newSut(fallback);
        sut.expect(arg).expect(arg2).return(expected);
        var returned = sut(arg, arg2);
        var returned2 = sut(arg, arg2);

        assert.equal(returned, expected);
        assert.equal(returned2, fallbackValue);
        assert.ok(sut.verify());
    });

    test('it should return expected for correct arg,arg2.repeat twice', function() {
        var arg = 'a';
        var arg2 = 'b';
        var expected = {};
        var repeats = 2;
        var sut = newSut(fallback);

        sut.expect(arg).expect(arg2).return(expected).repeat(repeats);
        var returned = sut(arg, arg2);
        var returned2 = sut(arg, arg2);
        var returned3 = sut(arg, arg2);

        assert.equal(returned, expected);
        assert.equal(returned2, expected);
        assert.equal(returned3, fallbackValue);
        assert.ok(sut.verify());
    });

    test('it should return expected for correct arg,arg2.repeat any', function() {
        var arg = 'a';
        var arg2 = 'b';
        var expected = {};
        var sut = newSut(fallback);

        sut.expect(arg).expect(arg2).return(expected).repeatAny();
        var returned = sut(arg, arg2);
        var returned2 = sut(arg, arg2);
        var returned3 = sut(arg, arg2);

        assert.equal(returned, expected);
        assert.equal(returned2, expected);
        assert.equal(returned3, expected);
        assert.ok(sut.verify());
    });

    test('it should invoke whenCalled for correct arg,arg2.repeat twice', function() {
        var arg = 'a';
        var arg2 = 'b';
        var expected = {};
        var onWhenCalled = newMock();
        var numberOfInvokes = 0;
        onWhenCalled.expect(arg).expect(arg2).whenCalled(onDidInvoke).return();
        onWhenCalled.expect(arg).expect(arg2).whenCalled(onDidInvoke).return();

        function onDidInvoke() {
            numberOfInvokes++;
        }

        var sut = newSut(fallback);

        sut.expect(arg).expect(arg2).whenCalled(onWhenCalled).return(expected).repeat(2);
        var returned = sut(arg, arg2);
        var returned2 = sut(arg, arg2);
        var returned3 = sut(arg, arg2);

        assert.equal(numberOfInvokes, 2);
    });

    test('it should return expected for multiExpect arg,arg2', function() {
        var arg = 'a';
        var arg2 = 'b';
        var arg3 = '3';
        var expected = {};
        var sut = newSut(fallback);

        sut.expect(arg, arg2).expect(arg3).return(expected).repeat(2);
        var returned = sut(arg, arg2, arg3);
        var returned2 = sut(arg, arg2, arg3);
        var returned3 = sut(arg, arg2, arg3);

        assert.equal(returned, expected);
        assert.equal(returned2, expected);
        assert.equal(returned3, fallbackValue);
        assert.ok(sut.verify());
    });

    test('it should return expected for arg, anything twice', function() {
        var arg = 'a';
        var arg2 = 'b';
        var arg3;
        var expected = {};
        var sut = newSut(fallback);


        sut.expect(arg).expectAnything().return(expected).repeat(2);
        var returned = sut(arg, arg2, arg3);
        var returned2 = sut(arg, arg2);
        var returned3 = sut('foo', arg2);

        assert.equal(returned, expected);
        assert.equal(returned2, expected);
        assert.equal(returned3, fallbackValue);
        assert.ok(sut.verify());
    });

    test('it should return expected for arg, ignore twice', function() {
        var arg = 'a';
        var arg2 = 'b';
        var expected = {};
        var sut = newSut(fallback);

        sut.expect(arg).ignore().expect(arg2).return(expected).repeat(2);
        var returned = sut(arg, 'foo', arg2);
        var returned2 = sut(arg, 'bar', arg2, 'a');
        var returned3 = sut(arg, {}, arg2);

        assert.equal(returned, expected);
        assert.equal(returned2, fallbackValue);
        assert.equal(returned3, expected);
        assert.ok(sut.verify());
    });


    test('it should return expected for void', function() {
        var expected = {};
        var sut = newSut(fallback);

        function fallback() {
            if (arguments.length != 0)
                throw 'expected no args';
            return fallbackValue;
        }

        sut.expect().return(expected);
        var returned = sut();
        var returned2 = sut();

        assert.equal(returned, expected);
        assert.equal(returned2, fallbackValue);
        assert.ok(sut.verify());
    });

    test('it should return expected for undefined', function() {
        var expected = {};
        var sut = newSut(fallback);

        function fallback() {
            if (arguments.length != 1)
                throw 'expected no args';
            return fallbackValue;
        }

        sut.expect(undefined).return(expected);
        var returned = sut(undefined);
        var returned2 = sut(undefined);

        assert.equal(returned, expected);
        assert.equal(returned2, fallbackValue);
        assert.ok(sut.verify());
    });

    test('it should return void for unspecified return', function() {
        var sut = newSut(fallback);

        function fallback() {
            if (arguments.length != 0)
                throw 'expected no args';
            return fallbackValue;
        }

        sut.expect();
        var returned = sut();
        var returned2 = sut();

        assert.deepEqual(returned, undefined);
        assert.equal(returned2, fallbackValue);
        assert.ok(sut.verify());
    });

    test('it should return void with multiple args for unspecified return', function() {
        var sut = newSut(fallback);
        var arg = 'a';

        function fallback() {
            if (arguments.length != 0)
                throw 'expected no args';
            return fallbackValue;
        }

        sut.expect(arg);
        var returned = sut();
        var returned2 = sut(arg);

        assert.equal(returned, fallbackValue);
        assert.deepEqual(returned2, undefined);
        assert.ok(sut.verify());
    });

    test('it should return void for unspecified return, expectAnything', function() {
        var sut = newSut(fallback);

        function fallback() {
            if (arguments.length != 0)
                throw 'expected no args';
            return fallbackValue;
        }

        sut.expectAnything();
        var returned = sut('foo');
        var returned2 = sut();

        assert.deepEqual(returned, undefined);
        assert.equal(returned2, fallbackValue);
        assert.ok(sut.verify());
    });

    test('it should return void for unspecified return, expectArray', function() {
        var sut = newSut(fallback);
        var a = {},
            b = {};

        function fallback() {
            if (arguments.length != 0)
                throw 'expected no args';
            return fallbackValue;
        }

        sut.expect([a, b]);
        var returned = sut([a, b]);
        var returned2 = sut();

        assert.deepEqual(returned, undefined);
        assert.equal(returned2, fallbackValue);
        assert.ok(sut.verify());
    });

    test('it should return void for unspecified return, expect, repeat twice', function() {
        var sut = newSut(fallback);

        function fallback() {
            if (arguments.length != 1)
                throw 'expected one arg';
            return fallbackValue;
        }

        sut.expect().repeat(2);
        var returned = sut('foo');
        var returned2 = sut();
        var returned3 = sut();

        assert.equal(returned, fallbackValue);
        assert.deepEqual(returned2, undefined);
        assert.deepEqual(returned3, undefined);
        assert.ok(sut.verify());
    });

    test('it should return void for unspecified return, expect, repeat any', function() {
        var sut = newSut(fallback);

        function fallback() {
            if (arguments.length != 1)
                throw 'expected one arg';
            return fallbackValue;
        }

        sut.expect().repeatAny();
        var returned = sut('foo');
        var returned2 = sut();

        assert.deepEqual(returned2, undefined);
        assert.equal(returned, fallbackValue);
        assert.ok(sut.verify());
    });

    test('it should return void for unspecified return, expect one arg, repeat twice', function() {
        var sut = newSut(fallback);
        var arg = {};

        function fallback() {
            if (arguments.length != 1)
                throw 'expected one arg';
            return fallbackValue;
        }

        sut.expect(arg).repeat(2);
        var returned = sut(arg);
        var returned2 = sut(arg);
        var returned3 = sut(arg);

        assert.deepEqual(returned, undefined);
        assert.deepEqual(returned2, undefined);
        assert.equal(returned3, fallbackValue);
        assert.ok(sut.verify());
    });

    test('it should return void for unspecified return, expect one arg, repeat any', function() {
        var sut = newSut(fallback);
        var arg = {};

        function fallback() {}

        sut.expect(arg).repeatAny();
        var returned = sut(arg);
        var returned2 = sut(arg);

        assert.deepEqual(returned, undefined);
        assert.deepEqual(returned2, undefined);
        assert.ok(sut.verify());
    });

    test('it should return void for unspecified return, expect one arg, whenCalled ', function() {
        var sut = newSut(fallback);
        var arg = {};
        var didInvoke;
        var fallbackValue = {};

        function fallback(theArg) {
            if (theArg !== arg)
                throw new Error('unexpected argument');
            return fallbackValue;
        }

        sut.expect(arg).whenCalled(onCalled);

        function onCalled(theArg) {
            if (theArg !== arg)
                throw new Error('unexpected argument');
            didInvoke = true;
        }

        var returned = sut(arg);
        var returned2 = sut(arg);

        assert.deepEqual(returned, undefined);
        assert.deepEqual(returned2, fallbackValue);
        assert.ok(didInvoke);
        assert.ok(sut.verify());
    });

})();
