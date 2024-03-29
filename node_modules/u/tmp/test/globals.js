window['$INTERNAL'] = window['$EXTERNAL'] = window['$ENVDICT'] = {};

$(function(){

var
results = $('#results'),
okNames = [ 'ujs' ];

for (var name in window) okNames.push(name);

$('#info').html('<p>'+okNames.length+' Starting Names:</p><p>'+okNames.join(', ')+'</p>');

function testLeaks(dist){
    var ok = dist.ok.slice(0) || [],
        notOk = [],
        test = { dist:dist, num:0, done:false },
        leaks = test.leaks = [];
    
    for (var name in window) {
        test.num++;
        if (okNames.indexOf(name) >= 0) continue;
        if ( !(delete window[name]) ) notOk.push(name);
        if (ok.indexOf(name) < 0) leaks.push(name);
    }
    
    function cleanup(){
        var _test = test,
            _ok = ok,
            _notOk = notOk;
        
        while( ok.length ) {
            var name = ok.shift();
            if (window[name]) {
                if (!(delete window[name])) {
                    notOk.push(name);
                    console.log('Unable to delete window['+name+'] ==', window[name], "?!");
                }
            }
        }
        
        ok.splice.apply(ok, [0,0].concat(notOk.splice(0,notOk.length)));
        if (ok.length){
            setTimeout(cleanup, 100);
        } else {
            console.log('Test done!', dist.src);
            test.done = true;
        }
    }
    setTimeout(cleanup, 100);
    
    return test;
}

var i = 0,
ok2leak = [ 'ujs',
    'slice', 'strip', 'reduce', 'map',
    'toKV', 'fromKV', 'extend', 'bind',
    'setCookie'
],
ok2leakDom = ok2leak.concat([
    'listen', 'unlisten'
]),
dists = [
    { src:'u-dom.global.js', ok:ok2leakDom },
    { src:'u-dom.gmin.js' },
    { src:'u-dom.js' },
    { src:'u-dom.min.js' },
    { src:'u.gmin.js' },
    { src:'u.js' },
    { src:'u.min.js' },
    { src:'u.global.gmin.js', ok:ok2leak },
    { src:'u.global.js', ok:ok2leak },
    { src:'u.global.min.js', ok:ok2leak },
    { src:'u-dom.global.gmin.js', ok:ok2leakDom },
    { src:'u-dom.global.min.js', ok:ok2leakDom }
];

(function(){
    var next = arguments.callee,
        dist = dists.shift(),
        result = $('<li id="result_'+(i++)+'"><h3>'+dist.src+'</h3></li>');
    
    $('<script/>').attr({
        'src': '../dist/'+dist.src,
        'type': 'text/javascript'
    }).appendTo(result);
    
    results.append(result);
    setTimeout(function(){
        var o = testLeaks(dist);
        result.append(o.num+' names seen. ');
        if (o.leaks.length)
            result.append('Found '+o.leaks.length+' Leak(s): <pre>'+o.leaks.join('\n')+'</pre>');
        else
            result.append('No leaks!');
        
        if (dists.length)
            (function(){
                $('#status').html('zzz '+dist.src);
                setTimeout(o.done ? next : arguments.callee, 100);
            })();
    }, 100);
})();


});
