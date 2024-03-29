'use strict'

const exec = require('child_process').exec
const path = require('path')
const assert = require('assert')
const fs = require('fs-extra')

const cwd = process.cwd()

var serve
let command_path = path.join(__dirname, "../lib/command.js")
let lib_path = path.join(__dirname, "../main.js")
module.exports.createTmpApp = done => {
    exec('node ' + command_path + ' new -d "tmp" -l "' + lib_path + '" appname', (error, stdout, stderr) => {
        assert(!error)
        assert(!stderr)
        done()
    })
}

module.exports.copyEchoBodyController = done => {
    fs.copy(cwd + '/test/controller_rawbody.js', cwd + '/tmp/app/controller/main.js', (err) => {
        if (err) throw err
        done()
    })
}
module.exports.copyDefaultController = done => {
    fs.copy(cwd + '/test/controller_main.js', cwd + '/tmp/app/controller/main.js', (err) => {
        if (err) throw err
        done()
    })
}

module.exports.getApp = (lib_path, config, base_dir) => {
    const kapp = require(lib_path)
    const Koa = require('koa')
    const app = new Koa()
    return kapp(app, config, base_dir)
}

module.exports.runDefaultApp = lib_path => {
    let config_custom = require(cwd + '/tmp/app/config.js')
    const kapp = require(lib_path)
    const Koa = require('koa')
    return kapp(new Koa(), config_custom, cwd + '/tmp').listen()
}
