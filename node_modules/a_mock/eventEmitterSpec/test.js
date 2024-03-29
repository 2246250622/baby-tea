var assert = require('assert');
var test = require('../test')
var newRequireMock = require('../partialMock/simple/newRequireMock');
var newMock = require('../partialMock/simple/newMock');

var newEmitterContext = newRequireMock('./eventEmitter/emitterContext');
var emit = newRequireMock('./eventEmitter/emit');
var tryAdd = newRequireMock('./eventEmitter/tryAdd');
var add = newRequireMock('./eventEmitter/add');
var remove = newRequireMock('./eventEmitter/remove');
var tryRemove = newRequireMock('./eventEmitter/tryRemove');

var newSut = require('../eventEmitter');

(function(){
	console.log('newEventEmitter');
	var context = {};
	newEmitterContext.expect().return(context);
	var sut = newSut();

	(function() {
		console.log('add');
		var callback = {};
		var didAdd;
		add.expect(context).expect(callback).whenCalled(onAdd).return();
		var returned = sut.add(callback);

		function onAdd() {
			didAdd = true;
		}

		test('it forwards to add',function() {
			assert.ok(didAdd);
		});

		test('it returns self',function() {
			assert.equal(returned,sut);
		});

	})();

	(function() {
		console.log('tryAdd');
		var callback = {};
		var didAdd;
		tryAdd.expect(context).expect(callback).whenCalled(onAdd).return();
		var returned = sut.tryAdd(callback);

		function onAdd() {
			didAdd = true;
		}

		test('it it forwards to tryAdd',function() {
			assert.ok(didAdd);
		});

		test('it returns self',function() {
			assert.equal(returned,sut);
		});

	})();

	(function() {
		console.log('remove');
		var callback = {};
		var didRemove;
		remove.expect(context).expect(callback).whenCalled(onRemove).return();
		var returned = sut.remove(callback);

		function onRemove() {
			didRemove = true;
		}

		test('it it forwards to remove',function() {
			assert.ok(didRemove);
		});

		test('it returns self',function() {
			assert.equal(returned,sut);
		});

	})();

	(function() {
		console.log('tryRemove');
		var callback = {};
		var didtryRemove;
		tryRemove.expect(context).expect(callback).whenCalled(ontryRemove).return();
		var returned = sut.tryRemove(callback);

		function ontryRemove() {
			didtryRemove = true;
		}

		test('it it forwards to tryRemove',function() {
			assert.ok(didtryRemove);
		});

		test('it returns self',function() {
			assert.equal(returned,sut);
		});

	})();

	(function() {
		console.log('emit');
		var callback = {};
		var didemit;
		var callback = newMock();
		var callback2 = newMock();
		var didInvokeCallback;
		var didInvokeCallback2;
		var arg = {};
		context.callbacks = [callback,callback2]		
		callback.expect(arg).whenCalled(onInvoke).return();
		callback2.expect(arg).whenCalled(onInvoke2).return();
		
		function onInvoke() {
			didInvokeCallback = true;
		}

		function onInvoke2() {
			didInvokeCallback2 = true;
		}
		var returned = sut.emit(arg);

		test('it it should invoke callback',function() {
			assert.ok(didInvokeCallback);
		});

		test('it it should invoke callback2',function() {
			assert.ok(didInvokeCallback2);
		});

		test('it returns self',function() {
			assert.equal(returned,sut);
		});

	})();

})();

