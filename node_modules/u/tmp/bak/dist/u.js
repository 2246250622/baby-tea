;u = (function(_document, _Array, _Object, _encode, _decode, undefined){

var root   = (typeof exports !== 'undefined' ? exports : this)
,   _slice = [].slice
;

function strip(s){ 
    return s.replace(/(^\s+|\s+$)/g, '');
}

function reduce( o, fn, acc, cxt ){
    if ( !o )
        return acc;
    
    if ( o instanceof _Array )
        for( var i = 0, len = o.length, v = o[0]; i < len; v = o[++i] )
            acc = fn.call( cxt || o, acc, v, i, o );
    else 
        for ( var name in o )
            acc = fn.call( cxt || o, acc, o[ name ], name, o );
    
    return acc;
}

function map( o, fn, cxt ){
    if ( !o )
        return o;
    
    var acc;
    if ( o instanceof _Array )
        acc = new _Array(o.length);
    else
        acc = new (o.constructor || _Object)();
    
    return reduce(o, function(acc, v, k, o){
        acc[k] = fn.call(this, v, k, o);
        return acc;
    }, acc, cxt);
}

function toKV(o, del){
    return reduce(o, function(acc, v, k){
        acc.push( _encode(k) + '=' + _encode(v) ); return acc;
    }, []).join(del || "&");
}

function fromKV(q, del){
    return reduce(q.split(del || '&'), function(acc, pair){
        var kv = pair.split('='), k = kv[0], v = kv[1];
        if (k) acc[_decode(k)] = _decode(v);
        return acc;
    }, {});
}

// Takes any number of arguments and dumps their (k,v) pairs on A
function extend( A, B ){
    return reduce(_slice.call(arguments,1), function(A, donor){
        return reduce(donor, function(o, v, k){ 
            o[k] = v;
            return o;
        }, A);
    }, A);
}

function bind( fn, context ){
    var args = _slice.call(arguments,0), 
        fn = args.shift(), 
        context = args.shift();
    return function(){
        return fn.apply( context, args.concat(_slice.call(arguments,0)) );
    };
}

function setCookie(k, v, expires, path, domain, doc){
    doc = doc || _document;
    expires = 'expires='+(expires || "Sun, 24-Mar-2024 11:11:11 GMT");
    path = 'path='+(path || "/");
    domain = 'domain='+(domain || doc.domain);
    doc.cookie = [ k+'='+_encode(v), expires, domain, path ].join('; ');
    return fromKV(_document.cookie, '; ');
}

var u = {
    'strip'     : strip,
    'reduce'    : reduce,
    'map'       : map,
    'toKV'      : toKV,
    'fromKV'    : fromKV,
    'extend'    : extend,
    'bind'      : bind,
    'setCookie' : setCookie
};
extend(root, u);

return u;
})(document, Array, Object, encodeURIComponent, decodeURIComponent);
