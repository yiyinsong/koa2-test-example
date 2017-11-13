import Router from 'koa-router';
import MainController from '../controller/main';
import SignController from '../controller/sign';

const router = new Router();

router.get('/', MainController.index);

router.get('/register', SignController.register);
router.post('/admin/register', SignController.registerHandle);

router.post('/goodslist', MainController.goodsList);

export default router;