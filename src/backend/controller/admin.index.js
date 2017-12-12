/**
 * @description 渲染后台主页面
 * @return null
 * @renderParams {String} title 标题
 * @renderParams {Object} userInfo 用户登录信息
 */
const index = async (ctx, next) => {
    await ctx.render('./backend/index', {
        title: '后台管理',
        userInfo: ctx.session.user
    });
}

export default {
    index
}