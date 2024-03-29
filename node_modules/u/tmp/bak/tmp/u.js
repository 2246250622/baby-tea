// u.js -- Dave's Micro-Basis
// This whole file should be sealed in your closure before your code.

var 
undefined,
slice = Array.prototype.slice,
isIE = !!(window.attachEvent && navigator.userAgent.indexOf('Opera') === -1),
enc = encodeURIComponent, dec = decodeURIComponent,

reduce = function( o, fn, acc, cxt ){
    if ( !o )
        return acc;
    
    if ( o instanceof Array )
        for( var i = 0, len = o.length, v = o[0]; i < len; v = o[++i] )
            acc = fn.call( cxt || o, acc, v, i, o );
    else 
        for ( var name in o )
            acc = fn.call( cxt || o, acc, o[ name ], name, o );
    
    return acc;
},
map = function( o, fn, cxt ){
    if ( !o )
        return o;
    
    var acc;
    if ( o instanceof Array )
        acc = new Array(o.length);
    else
        acc = new (o.constructor || Object)();
    
    return reduce(o, function(acc, v, k, o){
        acc[k] = fn.call(this, v, k, o);
        return acc;
    }, acc, cxt);
},

toKV = function(o, del){
    return reduce(o, function(acc, v, k){
        acc.push( enc(k) + '=' + enc(v) ); return acc;
    }, []).join(del || "&");
},
fromKV = function(q, del){
    return reduce(q.split(del || '&'), function(acc, pair){
        var kv = pair.split('='), k = kv[0], v = kv[1];
        if (k) acc[k] = dec(v);
        return acc;
    }, {});
},

extend = function( A, B ){
    return reduce(B, function(o, v, k){ 
        o[k] = v; 
        return o; 
    }, A); 
},

bind = function( fn, context ){
    var args = slice.call(arguments,0), 
        fn = args.shift(), 
        context = args.shift();
    return function(){
        return fn.apply( context, args.concat(slice.call(arguments,0)) );
    };
},

fork = function(fn){
    var fns = slice.call(arguments, 0);
    return function(){
        var self = this, args = slice.call(arguments, 0);
        return map(fns, function(fn){
            if (fn instanceof Function)
                return fn.apply(self, args);
            else
                return undefined;
        });
    };
},


setCookie = function(k, v, expires, path){
    expires = 'expires='+(expires || "Sun, 24-Mar-2024 11:11:11 GMT");
    path = 'path='+(path || "/");
    document.cookie = [ k+'='+enc(v), expires, path ].join('; ');
    return fromKV(document.cookie, '; ');
};


(function(){

var isAttach = window.attachEvent;

function _listen(un, obj, evt, fn){
    if ( !obj )
        return;
    if ( isAttach )
        obj[(un ? 'detach' : 'attach') + 'Event']('on'+evt, fn);
    else
        obj[(un ? 'remove' : 'add') + 'EventListener'](evt, fn, false);
}

window.listen = function(obj, evt, fn){
    _listen(0, obj, evt, fn);
};
window.unlisten = function(obj, evt, fn){
    _listen(1, obj, evt, fn);
};

})();


// end u.js //
