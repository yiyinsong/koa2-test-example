const Koa = require('koa');
const koaStatic = require('koa-static');
const koaViews = require('koa-views');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

app.use(koaStatic(__dirname + '/public'));

app.use(koaViews(__dirname + '/views', {
    map: {
        html: 'pug',
        pug: 'pug'
    },
    extension: 'pug'
}));

app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});


router.get('/', async (ctx, next) => {
    await ctx.render('./frontend/index');
});

app.use(router.routes())
    .use(router.allowedMethods())

app.listen(3000);