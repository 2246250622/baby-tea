var assert = require('assert');
var test = require('../../test');
var newRequireMock = require('../../partialMock/simple/newRequireMock');

var sut = require('../tryAdd');

(function(){
	console.log('tryAddSpec');
	
	(function() {
		console.log('execute');
		var add = newRequireMock('./add');
		var didAdd;
		var callback = {};
		add.expect(context).expect(callback).whenCalled(onAdd).return(null);
		function onAdd() {
			didAdd = true;
		}

		sut(context,callback);
		
		test('it should forward to add',function() {
			assert.ok(didAdd);
		});
	});

	(function() {
		console.log('execute with missing callback');
		var add = newRequireMock('./add');		
		var didAdd;
		var callback;
		add.expect(context).expect(callback).whenCalled(onAdd).return(null);
		function onAdd() {
			throw 'not allowed to forward';
		}

		sut(context,callback);
		
		test('it should not forward to add',function() {
			assert.ok(true);
		});
	})();
})();
