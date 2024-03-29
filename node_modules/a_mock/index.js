require('./util');
require('./buffer');

module.exports = {
	mock: require('./mock'),
	expectRequire: require('./expectRequire'),
	requireMock: require('./requireMock'),
	then: require('./newThen')
};

