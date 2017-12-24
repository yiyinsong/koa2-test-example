import PlaylistModel from '../models/playlist';
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
/**
 * @description 渲染后台管理面板
 * @return null
 * @renderParams {String} title 标题
 * @renderParams {Number} wyMusicCount 网易歌单数量
 */
 const main = async (ctx, next) => {
 	const _wyMusicCount = await PlaylistModel.find().count();
 	await ctx.render('./backend/main', {
 		title: '管理面板',
 		wyMusicCount: _wyMusicCount
 	});
 }

export default {
    index,
    main
}