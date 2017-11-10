import Router from 'koa-router';
import MainController from '../controller/main';

const router = new Router();

router.get('/', MainController.index);

router.get('/register', MainController.register); 

router.post('/goodslist', MainController.goodsList);

export default router;