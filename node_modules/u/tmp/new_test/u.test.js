var assert, u;
assert = require('assert');
u = require('u');
exports.testsStringLength = function(){
  return assert.equal(6, 'foobar'.length);
};
