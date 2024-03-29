'use strict'

const supertest = require('supertest')
const helper = require('./helper.js')
const cwd = process.cwd()
const lib_path = cwd + '/main.js'
const fs = require('fs-extra')

var app
describe('Default Middleware Base', () => {
    before(done => {
        helper.createTmpApp(done)
        app = helper.runDefaultApp(lib_path)
    })
    it('Test koa-static', done => {
        fs.copy(cwd + '/k.jpg', cwd + '/tmp/public/k.jpg', (err) => {
            if (err) throw err
            const request = supertest(app)
            request.get('/k.jpg').expect(200, done)
        })
    })
    after(() => {
        app.close()
    })
})