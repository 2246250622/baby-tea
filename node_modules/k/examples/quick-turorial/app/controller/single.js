class single {
    async index(ctx){
        let condition = {"id" : ctx.request.query.upid}
        let guestbook = ctx.model('guestbook')
        let result = await guestbook.find(condition)

        if(result){
            ctx.set('Content-Type', 'application/json')
            ctx.body = JSON.stringify(result)
        }else{
            ctx.throw(404)
        }
    }

    async like(ctx){
        let condition = {"id" : ctx.request.query.upid}
        let guestbook = ctx.model('guestbook')

        let result = await guestbook.find(condition)
        if(result){
            let dig = result["dig"]+1
            let newrow = {"dig" : dig}
            await guestbook.update(condition, newrow)
            ctx.body = dig
        }else{
            ctx.throw(404)
        }
    }

    async del(ctx){
        let condition = {"id" : ctx.request.query.upid}
        let guestbook = ctx.model('guestbook')
        guestbook.delete(condition)
        ctx.body = "ok"
    }
}
module.exports = single