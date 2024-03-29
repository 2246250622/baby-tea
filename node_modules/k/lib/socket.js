'use strict'
const http = require('http')
const socket = require('socket.io')
const fs = require('fs-extra')
const model = require('./model.js')
const display = require('./display.js')
let isDefaultHandlerExists = false

module.exports = (config, app) => {
    const server = http.createServer(app.callback())
    const io = socket(server)
    io.on('connection', (socket) => {
        let defaultHandlerPath = config.handler_path + '/handler.js'
        if(isDefaultHandlerExists || fs.existsSync(defaultHandlerPath)){
            let defaultHandlerClass = require(defaultHandlerPath)
            let defaultHandlerObject = new defaultHandlerClass()
            if(typeof defaultHandlerObject['connect'] !== undefined){
                defaultHandlerObject['connect']({io:io, socket : socket})
            }
            if(typeof defaultHandlerObject['disconnect'] !== undefined){
                socket.on('disconnect', () => {
                    defaultHandlerObject['disconnect']({io:io, socket : socket})
                })
            }
            isDefaultHandlerExists = true
        }

        socket.onAny((event, ...args) => {
            let [handler_name, method_name] = event.split('/')
            let handlerClass = require(config.handler_path + '/' + handler_name + '.js')
            let handerObject = new handlerClass()
            let ctx = {}
            model(config.model_path, config.mysql)(ctx, ()=>{})
            display(ctx, ()=>{})
            handerObject[method_name]({
                io : io,
                socket : socket,
                event : event,
                model : ctx.model,
                display : ctx.display
            }, ...args)
        })
    })
    return server
}