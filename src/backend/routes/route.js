import Router from 'koa-router';
import UtilsApi from '../controller/api/utils';
import MainController from '../controller/main';
import SignController from '../controller/sign';

import AdminMusicApi from '../controller/api/admin.music';
import AdminIndexController from '../controller/admin.index';
import AdminMusicController from '../controller/admin.music';

const router = new Router();

//前台页面
router.get('/', MainController.index);

router.get('/register', SignController.register);
router.get('/login', SignController.login);
router.post('/admin/register', SignController.registerHandle);
router.post('/admin/login', SignController.loginHandle);
router.get('/logout', SignController.logoutHandle);

router.post('/goodslist', MainController.goodsList);

//后台管理
router.get('/admin', SignController.isLogged, AdminIndexController.index);
router.get('/admin/list', SignController.isLogged, AdminMusicController.list);
router.post('/api/admin/listupdate', AdminMusicApi.getMuiscListFromWY);
router.get('/admin/list/remove', AdminMusicController.remove);
router.get('/admin/list/removemulti', AdminMusicController.removeMulti); 

//api 图片上传
router.post('/api/upload', UtilsApi.upload);

export default router;