const lodash = require('lodash')
const env = process.env.NODE_ENV || 'development'
let config = {
    'default': {
        'router_map': {
            '/index.html': 'main/index',
            '/': 'main/index',
        },
        'mysql' : {
            host     : '',
            user     : '',
            password : '',
            database : ''
        },
        'view_opts' : {
            'map' : {
                html: 'twig'
            }
        },
    },
    'development': {},
    'production': {}
}
module.exports = lodash.assign(config.default, config[env], {'default': {'env': env}})