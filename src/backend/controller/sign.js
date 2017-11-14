import fs from 'fs';
import config from '../utils/config';

const register = async (ctx, next) => {
	await ctx.render('./frontend/sign', {
		title: '注册',
        type: 0
	});
}

const login = async (ctx, next) => {
	await ctx.render('./frontend/sign', {
		title: '登录',
        type: 1
	});
}

const registerHandle = async (ctx, next) => {
    console.log(ctx.request.body);
	next(); 
}

export default { 
	register,
	registerHandle,
    login
}; 