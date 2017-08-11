/**
const path = require('path');
const Koa = require('koa');
const koaStatic = require('koa-static');
const koaViews = require('koa-views');
**/
import path from 'path';
import Koa from 'koa';
import koaStatic from 'koa-static';
import koaViews from 'koa-views';

import router from './routes/route';

const app = new Koa();
app.use(koaStatic(path.join(__dirname, '../public')));
app.use(koaViews(path.join(__dirname, '../views'), {
    map: {
        html: 'pug',
        pug: 'pug'
    },
    extension: 'pug'
}));

app.use(router.routes())
   .use(router.allowedMethods());

app.listen(3000);