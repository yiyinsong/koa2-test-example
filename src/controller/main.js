import fetch from 'isomorphic-fetch';

const index = async (ctx, next) => {
    await ctx.render('./frontend/index');
};

const goodsList = async (ctx, next) => {
    let r = await fetch('http://jdhdev4.jdhui.com/apic/web/index.php?r=goods/goods-list/list', {
        method: 'GET'
    });
    r = await r.json();
	ctx.body = r;
    console.log(r);
}

export default { index, goodsList }; 