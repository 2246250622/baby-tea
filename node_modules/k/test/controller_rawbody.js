class main {
    async index(ctx){
        let body = ctx.request.rawBody
        await ctx.render('welcome', {'welcome' : body})
    }
}
module.exports = main