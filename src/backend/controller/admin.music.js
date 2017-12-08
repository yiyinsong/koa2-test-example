import superagent from 'superagent';
/**
 * @description 渲染后台列表页面
 * @return null.
 */
const list = async (ctx, next) => {
	await ctx.render('./backend/list', {
		title: '歌单'
	});
}
/**
 * @description 从网易云音乐获取歌单信息，更新本地列表
 */
const updateList = async (ctx, next) => {
	
}

export default {
	list
}