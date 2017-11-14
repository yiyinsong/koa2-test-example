import Router from 'koa-router';
import UtilsApi from '../controller/api/utils';
import MainController from '../controller/main';
import SignController from '../controller/sign';

const router = new Router();

router.get('/', MainController.index);

router.get('/register', SignController.register);
router.post('/admin/register', SignController.registerHandle);

router.post('/goodslist', MainController.goodsList);

//api 图片上传
router.post('/api/upload', UtilsApi.upload);

export default router;