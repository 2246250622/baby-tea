var assert = require('assert');
var test = require('../../../test');
var newMock = require('../../simple/newMock');
var newRequireMock = require('../../simple/newRequireMock');

var sut = require('../isEqualArg');


(function() {
    console.log('isEqualArg');
    var expectedArg = {};
    var index = 1;

    (function() {
        console.log('shallow.not deepEqual.execute');
        var arg = {};
        var returned = sut(expectedArg, arg);

        test('it should return false', function() {
            assert.equal(false, returned);
        });

    })();

    (function() {
        console.log('shallow.null other.execute');
        var arg = {};
        var returned = sut(null, arg);

        test('it should return false', function() {
            assert.equal(false, returned);
        });

    })();


    (function() {
        console.log('shallow.is deepEqual.execute');
        var returned = sut(expectedArg, expectedArg);

        test('it should return true', function() {
            assert.equal(true, returned);
        });

    })();

    (function() {
        console.log('array with incorrect length.execute');
        var returned = sut([], [2]);

        test('it should return false', function() {
            assert.equal(false, returned);
        });

    })();


    (function() {
        console.log('array and other type.execute');
        var returned = sut([2], 2);

        test('it should return false', function() {
            assert.equal(false, returned);
        });

    })();

    (function() {
        console.log('shallow.array with different contents.execute');
        var returned = sut([1], [2]);

        test('it should return false', function() {
            assert.equal(false, returned);
        });

    })();

    (function() {
        console.log('shallow.array with equal contents.execute');
        var returned = sut([expectedArg, 1, 'foo', new Buffer('abc'), new Date(2000)], [expectedArg, 1, 'foo', new Buffer('abc'), new Date(2000)]);

        test('it should return true', function() {
            assert.equal(true, returned);
        });

    })();

    (function() {
        console.log('nested.array with equal contents.execute');
        var returned = sut([expectedArg, [1, [2, 3]], 'foo'], [expectedArg, [1, [2, 3]], 'foo']);

        test('it should return true', function() {
            assert.equal(true, returned);
        });
    })();

    (function() {
        console.log('nested.array with non equal contents.execute');
        var returned = sut([expectedArg, [1, [2, 3, 4]], 'foo'], [expectedArg, [1, [2, 3]], 'foo']);

        test('it should return false', function() {
            assert.equal(false, returned);
        });
    })();

    (function() {
        console.log('struct with different architecture.execute');
        var returned = sut({
            a: 1
        }, {
            b: 1
        });

        test('it should return false', function() {
            assert.equal(false, returned);
        });
    })();

    (function() {
        console.log('struct with same architecture, different values.execute');
        var returned = sut({
            a: 1
        }, {
            a: 2
        });

        test('it should return false', function() {
            assert.equal(false, returned);
        });
    })();

    (function() {
        console.log('struct with same architecture, equal values.execute');
        var returned = sut({
            a: 1
        }, {
            a: 1
        });

        test('it should return true', function() {
            assert.equal(true, returned);
        });
    })();

    (function() {
        console.log('advanced struct with same architecture, equal values.execute');
        var Foo = function() {
            this.arg = 'arg';
        };
        var foo = new Foo();
        var foo2 = new Foo();

        var returned = sut({
            a: 1,
            b: [{
                c: 2
            }, foo]
        }, {
            a: 1,
            b: [{
                c: 2
            }, foo2]
        });

        test('it should return true', function() {
            assert.equal(true, returned);
        });
    })();

    (function() {
        console.log('two new objects with equal properties of same class, equal values.execute');
        var Foo = function() {
            this.arg = 'arg';
        };
        var foo = new Foo();
        var foo2 = new Foo();

        var returned = sut(foo, foo2);

        test('it should return true', function() {
            assert.equal(true, returned);
        });
    })();

    (function() {
        console.log('two new objects with non equal properties of same class, equal values.execute');
        var Foo = function(value) {
            this.arg = value;
        };
        var foo = new Foo(1);
        var foo2 = new Foo(2);

        var returned = sut(foo, foo2);

        test('it should return false', function() {
            assert.equal(false, returned);
        });
    })();

    (function() {
        console.log('two new objects of same class with no properties, equal values.execute');
        var Foo = function() {};
        var foo = new Foo();
        var foo2 = new Foo();

        var returned = sut(foo, foo2);

        test('it should return false', function() {
            assert.equal(false, returned);
        });
    })();

    (function() {
        console.log('buffers with equal contents.execute');
        var returned = sut(new Buffer('abc'), new Buffer('abc'));

        test('it should return true', function() {
            assert.equal(true, returned);
        });

    })();

    (function() {
        console.log('buffer and non-buffer contents.execute');
        var returned = sut(new Buffer('abc'), 'abc');

        test('it should return false', function() {
            assert.equal(false, returned);
        });

    })();

    (function() {
        console.log('buffers with different contents.execute');
        var returned = sut(new Buffer('aba'), new Buffer('abc'));

        test('it should return false', function() {
            assert.equal(false, returned);
        });

    })();

    (function() {
        console.log('buffers partly equal contents.execute');
        var returned = sut(new Buffer('ab'), new Buffer('abc'));

        test('it should return false', function() {
            assert.equal(false, returned);
        });

    })();

    (function() {
        console.log('equal dates.execute');
        var returned = sut(new Date(2015,5,24), new Date(2015,5,24));

        test('it should return true', function() {
            assert.equal(true, returned);
        });

    })();

	(function() {
        console.log('non equal dates.execute');
        var returned = sut(new Date(2015,5,22), new Date(2015,5,24));

        test('it should return false', function() {
            assert.equal(false, returned);
        });

    })();

	(function() {
        console.log('date and undefined.execute');
        var returned = sut(undefined, new Date(2015,5,24));

        test('it should return false', function() {
            assert.equal(false, returned);
        });

    })();

})();
