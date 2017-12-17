import superagent from 'superagent';
import cheerio from 'cheerio';

import PlayListModel from '../../models/playlist';
import SongModel from '../../models/song';

const task_get_music = async (musicList, url, size, page) => {
	const r = await superagent.get(`${url}&limit=${size}&offset=${size * page}`);
	const $ = cheerio.load(r.text, {decodeEntities: false});
	$('#m-pl-container li').each((k, v) => {
		musicList.push({
			id: $(v).find('.icon-play').data('res-id'),
			img: $(v).find('.j-flag').eq(0).attr('src'),
			title: $(v).find('.dec a').html(),
			playNum: $(v).find('.bottom .nb').html(),
			author: $(v).find('.nm-icn').html() 
		});
	});
	if ($('#m-pl-container li').length == size) {
		return await task_get_music(musicList, url, size, ++page);
	} else {
		return musicList;
	}
}
/**
 * @type 接口
 * @description 更新后台歌单列表
 * @params {String} source 爬取数据目标链接
 * @params {Number} size 每页爬取条数，最多35（网易云音乐每页最多35条数据）
 * @return {Object} {
		code: 状态码 0 错误 1 成功
		message: 提示信息
		data: 歌单列表
   }
 */
const getMuiscListFromWY = async (ctx, next) => {
	const _url = ctx.request.body.source;
	const _size = ctx.request.body.size;
	if(!_url || _url === '' || !_size || _size === '') {
		return ctx.body = {
			code: 0,
			message: '参数异常',
			data: {}
		}
	}
	let musicList = [];
	
	musicList = await task_get_music(musicList, _url, _size, 0);
	const removeResult = await PlayListModel.clear();
	const saveResult = await PlayListModel.collection.insertMany(musicList); 
	ctx.body = { 
		code: 1,
		message: '更新成功',
		data: musicList
	};
}
/**
 * @type 接口
 * @description 更新单个歌单歌曲列表
 * @params {String} source 爬取数据目标链接
 * @params {Number} id 歌单id
 * @return {Object} {
		code: 状态码 0 错误 1 成功
		message: 提示信息
		data: 歌单列表
   }
 */
const getMusicDetailFromWY = async (ctx, next) => {
	const _url = ctx.request.body.source;
	const _id = ctx.request.body.id;
	const _oid = ctx.request.body.oid;
    const r = await superagent.get(`${_url}?id=${_id}`);
    const $ = cheerio.load(r.text, {decodeEntities: false});
    let data = [];
    const dom = $('#m-playlist');

    dom.find('#song-list-pre-cache .f-hide li').each((k, v) => {
    	let _href = $(v).find('a').attr('href');
    	data.push({
    		id: _href.substr(_href.indexOf('=')+1),
    		title: $(v).find('a').html(), 
    		playlist: _oid
    	});
    });
    const removeResult = await SongModel.clear();
	const saveResult = await SongModel.collection.insertMany(data);
	if(saveResult) {
		ctx.body = { 
			code: 1,
			message: '更新成功',
			data: data 
		};
	} else {
		ctx.body = { 
			code: 0,
			message: '更新失败',
			data: '' 
		};
	}   
}

export default {
	getMuiscListFromWY,
	getMusicDetailFromWY
}