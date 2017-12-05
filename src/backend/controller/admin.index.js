const index = async (ctx, next) => {
    await ctx.render('./backend/index', {
        title: '后台管理'
    });
}

export default {
    index
}