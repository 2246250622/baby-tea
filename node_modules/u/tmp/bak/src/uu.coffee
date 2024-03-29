
undefined:
_euc: encodeURIComponent
_duc: decodeURIComponent
_asl: Array.prototype.slice

noop: (->)

slice: (a) ->
    _asl.apply(a, _asl.call(arguments, 1))


strip: (s) ->
    s.replace(/(^\s+|\s+$)/g, '')


reduce: (o, fn, acc, cxt) ->
    return acc if not o
    cxt: or o
    
    if ( o instanceof Array )
        for v, i in o
            acc: fn.call( cxt, acc, v, i, o )
    else 
        for name, v of o
            acc: fn.call( cxt, acc, v, name, o )
    
    return acc


map: (o, fn, cxt) ->
    return o if not o
    
    acc: 
    if o instanceof Array
        new Array(o.length)
    else
        new (o.constructor or Object)()
    
    return reduce( o,
        (acc, v, k, o) ->
            acc[k]: fn.call(this, v, k, o)
            return acc
        acc, cxt )


toKV: (o, del) ->
    reduce( o,
        (acc, v, k) ->
            acc.push( _euc(k) + '=' + _euc(v) )
            return acc
        [] ).join(del or "&");


fromKV: (q, del) ->
    reduce(
        q.split(del or '&'),
        (acc, pair) ->
            [ k, v ]: pair.split('=')
            acc[_duc(k)]: _duc(v) if k
            return acc
        {})


attr: (o, k, v) ->
    if not v?
        getattr(o, k)
    else
        setattr(o, v, k)
getattr: (o, k) -> o[k]
setattr: (o, v, k) -> o[k]: v; o


# Takes any number of arguments and dumps their (k,v) pairs on A
extend: (A, donors...) ->
    reduce(
        donors,
        (A, donor) -> reduce(donor, setattr, A)
        A )


bind: (fn, context, args...) ->
    (_args...) ->
        fn.apply( context, args.concat(_args) )


fork: (fns...) ->
    (args...) ->
        self: this
        map(fns, 
            (fn) ->
                if fn instanceof Function
                    fn.apply(self, args)
                else
                    undefined
            )


setCookie: (k, v, expires, path) ->
    expires: 'expires='+(expires or "Sun, 24-Mar-2024 11:11:11 GMT")
    path: 'path='+(path or "/")
    document.cookie: [ _euc(k)+'='+_euc(v), expires, path ].join('; ')
    return fromKV(document.cookie, '; ')


_isAttach: !!window.attachEvent
_listen: (un, obj, evt, fn) ->
    return obj if not obj
    
    if ( _isAttach )
        obj[(if un then 'detach' else 'attach') + 'Event']('on'+evt, fn)
    else
        obj[(if un then 'remove' else 'add') + 'EventListener'](evt, fn, false)
    
    return obj

listen:   (obj, evt, fn) -> _listen(0, obj, evt, fn)
unlisten: (obj, evt, fn) -> _listen(1, obj, evt, fn)

extend( exports ? this, {
    "noop"      : noop,
    "strip"     : strip,
    
    "reduce"    : reduce,
    "map"       : map,
    
    "toKV"      : toKV,
    "fromKV"    : fromKV,
    
    "attr"      : attr,
    "getattr"   : getattr,
    "setattr"   : setattr,
    
    "extend"    : extend,
    
    "bind"      : bind,
    "fork"      : fork,
    
    "setCookie" : setCookie,
    
    "listen"    : listen,
    "unlisten"  : unlisten
})



