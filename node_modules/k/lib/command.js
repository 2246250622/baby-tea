#!/usr/bin/env node
'use strict'

const program = require('commander')
const path = require('path')
const fs = require('fs-extra')
const tplpath = path.join(__dirname, '../tpl')
const async = require('async')
const dirs = {
    'model': '/app/model',
    'controller': '/app/controller',
    'config': '/app',
    'view': '/app/view',
    'public': '/public',
    'package': '/',
    'index': '/'
}

program.command('new [app_name]')
    .option('-d, --directory [dir]', "Which directory to create the app")
    .option('-l, --library [lib]', "Which directory to create the app")
    .description('create a new app.')
    .action((app_name, option) => {
        let dir = option.directory || process.cwd()
        let lib = option.library || 'k'
        let jobs = [
            [dir + dirs.package, 'package.json', tplpath + '/package.json', (data) => data.toString().replace(/_appname_/g, app_name)],
            [dir + dirs.config, 'config.js', tplpath + '/config.js'],
            [dir + dirs.model, 'user.js', tplpath + '/model.js', (data) => data.toString().replace(/_model_/g, 'user')],
            [dir + dirs.controller, 'main.js', tplpath + '/controller.js', (data) => data.toString().replace(/_main_/g, 'main')],
            [dir + dirs.view, 'welcome.html', tplpath + '/welcome.html'],
            [dir + dirs.public],
            [dir + dirs.index, 'index.js', tplpath + '/index.js', (data) => data.toString().replace(/_k_/g, lib.replace(/\\/g, '/'))]
        ]
        async.each(jobs, function(args, callback) {
            createFile(callback, ...args)
        }, function(err, result) {
            console.log('')
            console.log('  Please run `npm install`')
            console.log('')
        })
    })
program.command('m [model_name]')
    .option('-d, --directory [dir]', "Which directory to create the file")
    .description('create new model file.')
    .action((model_name, option) => {
        let dir = option.directory || process.cwd()
        createFile(()=>{}, dir + dirs.model, model_name + '.js', tplpath + '/model.js', (data) => data.toString().replace(/_model_/g, model_name))
    })
program.command('c [controller_name]')
    .option('-d, --directory [dir]', "Which directory to create the file")
    .description('create new controller file.')
    .action((controller_name, option) => {
        let dir = option.directory || process.cwd()
        createFile(()=>{}, dir + dirs.controller, controller_name + '.js', tplpath + '/controller.js', (data) => data.toString().replace(/_main_/g, controller_name))
    })
program.on('--help', function () {
    console.log('')
    console.log('  Examples:')
    console.log('')
    console.log('    $ k new blog')
    console.log('    $ k m posts')
})
program.parse(process.argv)

function createFile(callback, dir, filename, tplfile, datafn) {
    fs.mkdirp(dir, (err) => {
        if (err) throw err
        if (filename) {
            fs.readFile(tplfile, (err, data) => {
                if (err) throw err
                if (datafn && typeof datafn === 'function') {
                    data = datafn(data)
                }
                let filepath = path.join(dir, filename)
                fs.writeFile(filepath, data, (err) => {
                    if (err) throw err
                    console.log('generated: ' + filepath)
                    callback()
                })
            })
        }else{
            callback()
        }
    })
}