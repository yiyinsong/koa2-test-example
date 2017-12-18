import PlaylistModel from '../models/playlist';
import SongModel from '../models/song';
/**
 * @description 渲染后台列表页面
 * @return null
 * @params {Number} limit 每页条数
 * @params {Number} page 当前页面
 * @renderParams {String} title 标题
 * @renderParams {Array} data 列表数据
 * @renderParams {Number} limit 每页条数
 * @renderParams {Number} page 第几页页码
 * @renderParams {Number} total 总共有多少页
 */
const list = async (ctx, next) => {
	const _query = ctx.request.query;
	let _page = _query.page && Number(_query.page);
	let _limit = _query.limit && Number(_query.limit);
	_limit = _limit || 20;
	_page = _page || 1;
	let r = await PlaylistModel.find().skip((_page - 1) * _limit).limit(_limit);
	let count = await PlaylistModel.count();
	r = r || []; 
	await ctx.render('./backend/list', {
		title: '歌单',
		data: r,
		limit: _limit || 20,
		page: _page,
		total: Math.ceil(count / _limit)
	});
}
/**
 * @description 删除单个歌单
 * @return 列表页面
 * @params {Number} id 歌单id
 */
const remove = async (ctx, next) => {
	const _query = ctx.request.query;
	const _id = _query.id;
	if(_id) {
		await PlaylistModel.removeOne({id: _id});
		return ctx.redirect('/admin/list');
	}
	console.log('删除失败');
}
/**
 * @description 删除多条歌单
 * @return 列表页面
 * @params {String} ids 多条歌单id，以逗号隔开
 */
const removeMulti = async (ctx, next) => {
	const _query = ctx.request.query;
	let _ids = _query.ids;
	if(_ids) {
		_ids = _ids.split(',');
		await PlaylistModel.removeMulti('id', _ids);  
		return ctx.redirect('/admin/list');
	}
	console.log('删除失败');
}
/**
 * @description 歌单详情
 * @params {String} id 歌单id
 * @return null
 */
const listDetail = async (ctx, next) => {
	const _query = ctx.request.query;
	let _id = _query.id;
	let _oid = _query.oid;
	if(_id) {
		const r = await PlaylistModel.findById(_id);
		const l = await SongModel.fetch(_oid);
		return await ctx.render('./backend/list-detail', {
			title: '歌单详情',
			data: r || {},
			list: l || []
		});
    }
	console.log('请传入歌单id');
}

export default {
	list,
	remove,
	removeMulti,
	listDetail
}