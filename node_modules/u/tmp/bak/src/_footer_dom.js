
// Exports
var ujs =
    (external || _window).ujs =
    (internal || {}).util = 
{
    slice     : slice,
    strip     : strip,
    reduce    : reduce,
    toKV      : toKV,
    fromKV    : fromKV,
    extend    : extend,
    bind      : bind,
    setCookie : setCookie,
    listen    : listen,
    unlisten  : unlisten
};

})($INTERNAL, $EXTERNAL, $ENVDICT);

