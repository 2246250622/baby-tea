'use strict'

module.exports = (baseDir) => {
    return {
        'env': 'development',
        'appkeys': 'secret k key',
        'router_map': {},
        'view_opts': {},
        'mysql': {},
        'public_path': baseDir + '/public',
        'controller_path': baseDir + '/app/controller',
        'view_path': baseDir + '/app/view',
        'model_path': baseDir + '/app/model',
        'session_setting': {},
        'enable_socket_io' : false,
        'handler_path': baseDir + '/app/handler',
    }
}
