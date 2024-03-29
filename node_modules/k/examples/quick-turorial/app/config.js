const lodash = require('lodash')
const env = process.env.NODE_ENV || 'development'
let config = {
    'default': {
        'router_map': {
            '/index.html': 'main/index',
            '/write' : 'main/write',
            '/single' : 'single/index',
            '/like' : 'single/like',
            '/del' : 'single/del',
            '/': 'main/index',
        },
        'mysql' : {
            host     : 'localhost',
            user     : 'root',
            password : '123456',
            database : 'test'
        },
        'view_opts' : {
            'map' : {
                html: 'twig'
            },
            "options" : {
                allowInlineIncludes: true
            }
        },
    },
    'development': {},
    'production': {}
}
module.exports = lodash.assign(config.default, config[env], {'default': {'env': env}})