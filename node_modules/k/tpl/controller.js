class _main_ {
    async index(ctx){
        //let obj = ctx.model('user')
        await ctx.render('welcome', {'welcome' : "hello world!"})
    }
}
module.exports = _main_