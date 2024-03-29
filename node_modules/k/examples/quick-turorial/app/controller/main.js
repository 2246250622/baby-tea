const moment = require("moment")

class main {
    async index(ctx) {
        let page = (ctx.request.query.p == undefined) ? 1 : ctx.request.query.p
        let guestbook = ctx.model('guestbook')
        let records = await guestbook.findAll("", "createtime DESC", "*", [page, 10])
        moment.locale('zh-cn')
        if (records) {
            for (let r in records) {
                records[r]['createtime'] = moment(records[r]['createtime'], "X").format('MMMM Do h:mm A')
            }
        }
        await ctx.render('guestbook', {'records': records, 'page':guestbook.page})
    }

    async write(ctx) {
        //console.log(ctx.request.body)
        let newrow = {
            "title": ctx.request.body.title,
            "contents": ctx.request.body.contents,
            "username": ctx.request.body.username,
            "createtime": moment().format('X')
        }
        //console.log(newrow)
        let guestbook = ctx.model('guestbook')
        let newid = await guestbook.create(newrow)
        if (newid) {
            this.tips(ctx, "hello", "/index.html")
            //ctx.redirect('/index.html')
        } else {
            ctx.throw(502)
        }
    }

    tips(ctx, msg, url) {
        ctx.body = "<html><head><meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\"><script>function sptips(){alert(\"" + msg + "\");location.href=\"" + url + "\"}</script></head><body onload=\"sptips()\"></body></html>"
    }

    jump(ctx, url) {
        ctx.body = "<html><head><meta http-equiv='refresh' content='0;url=" + url + "'></head><body></body></html>"
    }
}

module.exports = main