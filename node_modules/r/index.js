exports.r = function r(p){
	return p[0]==">" ? 
		require(process.cwd() + p.substr(1, p.length-1)) : 
		require(p);
}