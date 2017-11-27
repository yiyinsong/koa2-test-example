import fetch from 'isomorphic-fetch';

const index = async (ctx, next) => {
    // await ctx.render('./frontend/index', {
	// 	title: '首页
	// });
//    let user = ctx.session.user;
//    ctx.body = ctx.session;
//    console.log(ctx.session);
    let n = ctx.session.views || 0;
  ctx.session.views = ++n;
  ctx.body = n + ' views';
};

const goodsList = async (ctx, next) => {
    let r = await fetch('http://jdhdev4.jdhui.com/apic/web/index.php?r=goods/goods-list/list', {
        method: 'GET' 
    });
    r = await r.json();
	ctx.body = r;
    console.log(r);
}

export default { 
	index,
	goodsList
}; 