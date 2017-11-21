import mongoose from 'mongoose';
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
    if(!data.username || data.username === '') {
		message = '参数异常，请传入用户名';
	} else if(!data.tel || data.tel === '') {
		message = '参数异常，请传入手机号码';
	} else if(!data.icon || data.icon === '') {
        message = '参数异常，请传入用户头像';
	} else if(data.password !== data.repassword) {
    	message = '密码与确认密码不一致';
	}

    if(message === '') {
        try {
            const r =  await ModelUser.findByName(data.username);
            if(r) {
                ctx.body = '用户名称已存在，请重新填写用户名';
            } else {
                const _data = {
                    username: data.username,
                    tel: data.tel,
                    icon: data.icon,
                    password: data.password
                };
                const modelUser = new ModelUser(_data);
                const  addResult = await  modelUser.save();
                console.log(addResult);
                ctx.body = '注册成功！';
            }
		} catch (err) {
			console.log(err);
		}
    } else {
        ctx.body = message;
    }
}

export default { 
	register,
	registerHandle,
    login
}; 