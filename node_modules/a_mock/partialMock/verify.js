function verify(mockContext) {	
	var count = mockContext.expectCount;
	if (count > 0)
		throw new Error('mock has ' + count + ' pending functions');
	return true;
}

module.exports = verify;