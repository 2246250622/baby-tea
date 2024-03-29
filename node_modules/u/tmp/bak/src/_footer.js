
// Exports
var ujs = 
    (external || _window).ujs =
    (internal || {}).util = 
{
    slice     : slice,
    strip     : strip,
    reduce    : reduce,
    map       : map,
    toKV      : toKV,
    fromKV    : fromKV,
    extend    : extend,
    bind      : bind,
    setCookie : setCookie
};

})($INTERNAL, $EXTERNAL, $ENVDICT);

