'use strict'
const lodash = require('lodash')
const assert = require('assert')
const supertest = require('supertest')
const helper = require('./helper.js')
const cwd = process.cwd()
const lib_path = cwd + '/main.js'

describe('Application Base', () => {
    describe('Configuration Test', () => {
        beforeEach((done) => {
            helper.createTmpApp(done)
        })
        it('Test the default configuration', done => {
            let config = require(cwd + '/lib/config.default.js')
            let app = helper.getApp(lib_path, {}, cwd + '/tmp')
            app.config.session_setting = {}
            assert.deepEqual(config(cwd + '/tmp'), app.config)
            done()
        })
        it('Test the custom configuration', done => {
            let config_custom = require(cwd + '/tmp/app/config.js')
            let config_default = require(cwd + '/lib/config.default.js')
            let configuration = lodash.assign(config_default(cwd + '/tmp'), config_custom)
            let app = helper.getApp(lib_path, config_custom, cwd + '/tmp')
            app.config.session_setting = {}
            assert.deepEqual(configuration, app.config)
            done()
        })
    })
    describe('Run Application Test', () => {

        it('Hello world test', done => {
            const app = helper.runDefaultApp(lib_path)
            const request = supertest(app)
            helper.copyDefaultController(() => {
                request
                    .get('/index.html')
                    .expect(200)
                    .end((err, res) => {
                        if (err) return done(err)
                        assert.equal(res.text, 'hello world!')
                        app.close()
                        done()
                    })
            })
        })

        it('RawBody received test', done => {
            const app = helper.runDefaultApp(lib_path)
            const request = supertest(app)
            helper.copyEchoBodyController(() => {
                let send_body = 'I am body'
                request
                    .post('/index.html')
                    .send(send_body)
                    .expect(200)
                    .end((err, res) => {
                        if (err) return done(err)
                        assert.equal(res.text, send_body)
                        app.close()
                        done()
                    })
            })
        })
    })


})