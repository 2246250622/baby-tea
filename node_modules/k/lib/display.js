'use strict'

const lodash = require('lodash')
module.exports = async (ctx, next) => {
    ctx.t = {}
    ctx.display = (relPath, locals = {}) => {
        return ctx.render(relPath, lodash.merge(ctx.t, locals))
    }
    await next()
}