import Router from 'koa-router';
import UtilsApi from '../controller/api/utils';
import MainController from '../controller/main';
import SignController from '../controller/sign';

import AdminMusicApi from '../controller/api/admin.music';
import AdminIndexController from '../controller/admin.index';
import AdminMusicController from '../controller/admin.music';

const router = new Router();

// 前台页面
router.get('/', MainController.index);

router.get('/register', SignController.register);
router.get('/login', SignController.login);
/**
 * @url admin/register
 * @params {String} username 用户账号
 * @params {Number} tel 手机号码
 * @params {String} icon 头像路径
 * @params {String} password 用户密码
 */
router.post('/admin/register', SignController.registerHandle);
/**
 * @url admin/login
 * @params {String | Number} username 用户账号
 * @params {String} password 用户密码
 */
router.post('/admin/login', SignController.loginHandle);
router.get('/logout', SignController.logoutHandle);

// 后台管理
router.get('/admin', SignController.isLogged, AdminIndexController.index);
router.get('/admin/list', SignController.isLogged, AdminMusicController.list);
/**
 * @url api/admin/listupdate
 * @params {String} source 网易云音乐歌单链接
 * @params {Number} size   每页数量
 */
router.post('/api/admin/listupdate', AdminMusicApi.getMuiscListFromWY);
/**
 * @url api/admin/listdetailupdate
 * @params {String} source 网易云音乐歌曲链接
 * @params {Number} id   歌单id
 */
router.post('/api/admin/listdetailupdate', AdminMusicApi.getMusicDetailFromWY); 
/**
 * @url admin/list/remove
 * @params {Number} id 歌单id
 */
router.get('/admin/list/remove', AdminMusicController.remove);
/**
 * @url admin/list/removemulti
 * @params {Number} ids 多个歌单id，以逗号隔开 如：1,2,3,4,5...
 */
router.get('/admin/list/removemulti', AdminMusicController.removeMulti);
/**
 * @url admin/list/detail
 * @params {Number} id 歌单id
 */
router.get('/admin/list/detail', AdminMusicController.listDetail);

//api 图片上传
router.post('/api/upload', UtilsApi.upload);

export default router;