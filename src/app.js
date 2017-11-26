import path from 'path';
import Koa from 'koa';
import koaStatic from 'koa-static';
import koaViews from 'koa-views';
import koaBody from 'koa-body';
//koa-session 服务器记录用户登录
import session from 'koa-session';
// import monk from 'monk';  暂时使用mongoose
import mongoose from 'mongoose';
//koa-generic-session-mongo 使用mongodb使登录信息持久有效
import MongoStore from 'koa-generic-session-mongo';

import router from './backend/routes/route';

const app = new Koa(); 
const dbUrl = 'mongodb://localhost:27017/music';
const dbConnectOptions = {
    useMongoClient: true,
    server: {
        auto_reconnect: true,
        poolSize: 10 
    }
};

app.keys = ['user'];
 
const sessionConfig = {
    key: 'KOAMUSIC', 
    store: new MongoStore({
        url: dbUrl,
        collection: 'sessions'
    }),
    signed: true
};


app.use(koaStatic(path.join(__dirname, '../public')));
app.use(koaViews(path.join(__dirname, '../views'), {
    map: {
        html: 'pug',
        pug: 'pug'
    },
    extension: 'pug'
}));
app.use(koaBody({multipart: true})); 
app.use(session(sessionConfig, app));
 
mongoose.connect(dbUrl, dbConnectOptions, (err, res) => {
    if(err) {
        console.log(err);
    } else {
        console.log(`connect ${dbUrl} success!`);
    }
});

app.use(router.routes())
   .use(router.allowedMethods());

app.listen(3000);