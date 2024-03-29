'use strict'

const pathToRegexp = require('path-to-regexp')
const createError = require('http-errors')

module.exports = (router_map, controller_path) => {
    return (ctx, next) => {
        let not_found = true
        for(let path in router_map){
            let keys = []
            let matched = pathToRegexp(path, keys).exec(ctx.path)
            if (matched) {
                not_found = false
                const args = matched.slice(1).map(safeDecodeURIComponent)
                for (let k in keys) {
                    ctx.query[keys[k]['name']] = args[k]
                }
                let [controller_name, action_name] = router_map[path].split('/')
                let controlClass = require(controller_path + '/' + controller_name + '.js')
                let controller = new controlClass(ctx, next)
                return controller[action_name](ctx, next)
            }
        }
        if (not_found) {
            throw new createError.NotFound()
        }
    }
}

function safeDecodeURIComponent(text) {
    try {
        return decodeURIComponent(text)
    } catch (e) {
        return text
    }
}