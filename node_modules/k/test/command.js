'use strict'

const assert = require('assert')
const path = require('path')
const exec = require('child_process').exec
const fs = require('fs-extra')
const cwd = process.cwd()

describe('Command Test', () => {
    let command_path = path.join(__dirname, "../lib/command.js")
    let lib_path = path.join(__dirname, "../main.js")
    it('Create new app in tmp directory', done => {
        exec('node ' + command_path + ' new -d "tmp" -l "' + lib_path + '" appname', (error, stdout, stderr) => {

            assert(!error)
            assert(!stderr)

            assert(fs.existsSync(cwd + '/tmp/index.js'))
            assert(fs.existsSync(cwd + '/tmp/app/config.js'))
            assert(fs.existsSync(cwd + '/tmp/app/model/user.js'))
            assert(fs.existsSync(cwd + '/tmp/app/controller/main.js'))
            assert(fs.existsSync(cwd + '/tmp/app/view/welcome.html'))
            assert(fs.existsSync(cwd + '/tmp/package.json'))
            done()
        })
    })

    it('Create new model file in tmp app', done => {
        exec('node ' + command_path + ' m -d "tmp" mymodel', (error, stdout, stderr) => {
            assert(!error)
            assert(!stderr)
            assert(fs.existsSync(cwd + '/tmp/app/model/mymodel.js'))
            done()
        })
    })

    it('Create new controller file in tmp app', done => {
        exec('node ' + command_path + ' c -d "tmp" admin', (error, stdout, stderr) => {
            assert(!error)
            assert(!stderr)
            assert(fs.existsSync(cwd + '/tmp/app/controller/admin.js'))
            done()
        })
    })

    after(() => {
        fs.remove(cwd + '/tmp/')
    })
})
