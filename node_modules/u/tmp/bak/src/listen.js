function __listen(un, obj, evt, fn){
    if ( !obj )
        return;
    if ( !!_window.attachEvent )
        obj[(un ? 'detach' : 'attach') + 'Event']('on'+evt, fn);
    else
        obj[(un ? 'remove' : 'add') + 'EventListener'](evt, fn, false);
}

function listen(obj, evt, fn){
    __listen(0, obj, evt, fn);
}

function unlisten(obj, evt, fn){
    __listen(1, obj, evt, fn);
}

