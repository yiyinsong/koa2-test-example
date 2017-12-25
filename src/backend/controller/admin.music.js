import PlaylistModel from '../models/playlist';
import DiylistModel from '../models/diylist';
import SongModel from '../models/song';
import ModelSequence from '../models/sequence';
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
 * @description 删除多个歌单
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

/**
 * @description 删除单个歌曲
 * @return null
 * @params {Number} sid 歌曲id
 * @params {Number} pid 歌单id
 */
const removeSong = async (ctx, next) => {
	const _query = ctx.request.query;
	const _id = _query.sid;
	if(_id) {
		await SongModel.removeOne({id: _id});
		return ctx.redirect(ctx.request.header.referer);
	}
	console.log('删除失败');
}
/**
 * @description 删除多条歌单
 * @return 列表页面
 * @params {String} ids 多条歌单id，以逗号隔开
 * @params {Number} pid 歌单id
 */
const removeSongMulti = async (ctx, next) => {
	const _query = ctx.request.query;
	let _ids = _query.ids;
	if(_ids) {
		_ids = _ids.split(',');
		await SongModel.removeMulti('id', _ids);  
		return ctx.redirect(ctx.request.header.referer);
	}
	console.log('删除失败');
}

/**
 * @description 自建歌单列表
 * @return null
 */
 const diyList = async (ctx, next) => {
 	const _query = ctx.request.query;
	let _page = _query.page && Number(_query.page);
	let _limit = _query.limit && Number(_query.limit);
	_limit = _limit || 20;
	_page = _page || 1;
	let _data = ctx.request.query; 
 	try {
 		let r = await DiylistModel.find({title: new RegExp(_data.title)}).sort({'meta.updateTime': -1}).skip((_page - 1) * _limit).limit(_limit);
		let count = await DiylistModel.count();
		r = r || []; 
		await ctx.render('./backend/diy-list', {
			title: '自建歌单',
			data: r,
			limit: _limit || 20,
			page: _page,
			total: Math.ceil(count / _limit),
			init: {
				keyword: _data.title || ''
			}
		});
 	} catch(err) {
 		console.log(err);
 	}
 }
/**
* @description 新建自建歌单
*/
 const diyListAdd = async (ctx, next) => {
 	await ctx.render('./backend/diy-list-add', {
 		title: '新建歌单'
 	});
 }
 /**
* @description 添加歌单处理
* @params {Object} data
* @paramsAttribute data.img 封面图片
* @paramsAttribute data.title 歌单名称
* @paramsAttribute data.author 歌单作者
* @paramsAttribute data.desc 歌单描述
* @return 自建歌单列表
*/
const diyListAddAction = async (ctx, next) => {
	const data = ctx.request.body.data;
	if(!data) {
		return ctx.body = '参数错误';
	} else if(!data.img || data.img == '') {
		return ctx.body = '请传入歌单封面'
	} else if(!data.title || data.title == '') {
		return ctx.body = '请传入歌单名称'
	} else if(!data.author || data.author == '') {
		return ctx.body = '请传入歌单作者'
	} else if(!data.desc || data.desc == '') {
		return ctx.body = '请传入歌单描述'
	}
	try {
		const _id = await  ModelSequence.getSequence('diylistid');
		data.id = _id;
		const modelDiyList = new DiylistModel(data);
		const r = await modelDiyList.save();
		await ctx.redirect('/admin/diylist');
	} catch(err) {
		console.log(err);
	}
}

/**
 * @description 删除单个自建歌单
 * @return 列表页面
 * @params {Number} id 歌单id
 */
const diyRemove = async (ctx, next) => {
	const _query = ctx.request.query;
	const _id = _query.id;
	if(_id) {
		await DiylistModel.removeOne({id: _id});
		return ctx.redirect('/admin/diylist');
	}
	console.log('删除失败');
}
/**
 * @description 删除多个自建歌单
 * @return 列表页面
 * @params {String} ids 多条歌单id，以逗号隔开
 */
const diyRemoveMulti = async (ctx, next) => {
	const _query = ctx.request.query;
	let _ids = _query.ids;
	if(_ids) {
		_ids = _ids.split(',');
		await DiylistModel.removeMulti('id', _ids);  
		return ctx.redirect('/admin/diylist');
	}
	console.log('删除失败');
}

export default {
	list,
	remove,
	removeMulti,
	listDetail,
	removeSong,
	removeSongMulti,
	diyList,
	diyListAdd,
	diyListAddAction,
	diyRemove,
	diyRemoveMulti
}