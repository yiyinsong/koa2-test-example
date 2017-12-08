import fetch from 'isomorphic-fetch';

/**
 * @description 渲染前台主页面
 * @return null.
 */
const index = async (ctx, next) => {
    await ctx.render('./frontend/index', {
        title: '首页',
        userInfo: ctx.session.user
    })
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