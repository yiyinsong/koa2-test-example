import fetch from 'isomorphic-fetch';

const index = async (ctx, next) => {
    await ctx.render('./frontend/index', {
		title: '首页'
	});
};

const register = async (ctx, next) => {
	await ctx.render('./frontend/sign', {
		title: '注册'
	});
}

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
	register,
	goodsList
}; 