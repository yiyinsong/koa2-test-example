const index = async (ctx, next) => {
    await ctx.render('./backend/index', {
        title: '后台管理',
        userInfo: ctx.session.user
    });
}

export default {
    index
}