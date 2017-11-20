import fs from 'fs';
import config from '../utils/config';
import ModelUser from '../models/user';

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
    const data = ctx.request.body;
    let message = '';
    if(!data.name || data.name === '') {
		message = '参数异常，请传入用户名';
	} else if(!data.tel || data.tel === '') {
		message = '参数异常，请传入手机号码';
	} else if(!data.icon || data.icon === '') {
        message = '参数异常，请传入用户头像';
	} else if(data.password !== data.repassword) {
    	message = '密码与确认密码不一致';
	}
	ctx.body = message;

	const _data = {
		username: data.username,
		tel: data.tel,
		icon: data.icon,
		password: data.password
	};
	const modelUser = new ModelUser();
	// async () => {
        // const r = await modelUser.save();
	// }

	ctx.body = '注册成功！';
}

export default { 
	register,
	registerHandle,
    login
}; 