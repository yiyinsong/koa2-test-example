import path from 'path';
import Koa from 'koa';
import koaStatic from 'koa-static';
import koaViews from 'koa-views';
import koaBody from 'koa-body';
import monk from 'monk';

import router from './backend/routes/route';

const app = new Koa();

app.use(koaStatic(path.join(__dirname, '../public')));
app.use(koaViews(path.join(__dirname, '../views'), {
    map: {
        html: 'pug',
        pug: 'pug'
    },
    extension: 'pug'
}));
app.use(koaBody({multipart: true}));
 
//const db = monk('localhost/music');
//const user = db.get('user');
//user.find().then((r) => {
//    console.log('----------' + r); 
//});
//db.close();

app.use(router.routes())
   .use(router.allowedMethods());

app.listen(3000);