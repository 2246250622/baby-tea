'use strict'

const lodash = require('lodash')
const serve = require('koa-static')
const views = require('koa-views')
const session = require('koa-session')
const bodyParser = require('koa-bodyparser')
const router = require('./lib/router.js')
const configDefault = require('./lib/config.default.js')
const model = require('./lib/model.js')
const display = require('./lib/display.js')
//const rawBody = require('./lib/rawBody.js')
const socket = require('./lib/socket.js')

module.exports = (app, config, base_dir) => {
    app.config = lodash.assign(configDefault(base_dir || process.cwd()), config)
    app.keys = app.config.appkeys
    app.use(serve(app.config.public_path))
    app.use(bodyParser())
    //app.use(rawBody())
    app.use(session(app.config.session_setting, app))
    app.use(views(app.config.view_path, app.config.view_opts))
    app.use(model(app.config.model_path, app.config.mysql))
    app.use(display)
    app.use(router(app.config.router_map, app.config.controller_path))
    if(app.config.enable_socket_io){
        return socket(app.config, app)
    }

    return app
}