const Router = require('koa-router');

const router = new Router();

router.get('/', async (ctx, next) => {
    await ctx.render('./frontend/index');
});

export default router;