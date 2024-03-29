
// Exports
var ujs =
    (external || _window)['ujs'] =
    (internal || {})['util'] = {};

ujs['slice']     = slice;
ujs['strip']     = strip;
ujs['reduce']    = reduce;
ujs['map']       = map;
ujs['toKV']      = toKV;
ujs['fromKV']    = fromKV;
ujs['extend']    = extend;
ujs['bind']      = bind;
ujs['setCookie'] = setCookie;
ujs['listen']    = listen;
ujs['unlisten']  = unlisten;

})($INTERNAL, $EXTERNAL, $ENVDICT);

