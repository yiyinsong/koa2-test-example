import mongoose from 'mongoose';
import config from '../utils/config';
import password from '../utils/password';
import ModelUser from '../models/user';
import ModelSequence from '../models/sequence';

/**
 * @description 渲染注册页面
 * @return null.
 * @renderParams {String} title 标题
 * @renderParams {Number} type 0=>注册 1=>登录
 */
const register = async (ctx, next) => {
	await ctx.render('./frontend/sign', {
		title: '注册',
        type: 0
	});
}
/**
 * @description 渲染登录页面
 * @return null.
 * @renderParams {String} title 标题
 * @renderParams {Number} type 0=>注册 1=>登录
 */
const login = async (ctx, next) => {
	await ctx.render('./frontend/sign', {
		title: '登录',
        type: 1
	});
} 
/**
 * @description 注册功能处理
 * @return null.
 */
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
            const usernameExit = await ModelUser.findByName(data.username);
            const telExit = await ModelUser.findByTel(data.tel);
            if(usernameExit) {
                ctx.body = '用户名称已存在，请重新填写用户名';
            } else if(telExit) {
                ctx.body = '手机号码已存在，请重新填写手机号码';
            } else {
                const _encryptPassword = await password.encrypt(data.password);
                const _id = await  ModelSequence.getSequence('userid');
                const _data = {
                    _id: _id,
                    username: data.username,
                    tel: data.tel,
                    icon: data.icon,
                    password: _encryptPassword
                };
                const modelUser = new ModelUser(_data);
                const  addResult = await  modelUser.save();
                await ctx.redirect('/login');
            }
		} catch (err) {
			console.log(err);
		}
    } else {
        ctx.body = message;
    }
}
/**
 * @description 登录功能处理
 * @return null.
 */
const loginHandle = async (ctx, next) => {
    const data = ctx.request.body;
    let message = '';
    if(!data.username || data.username === '') {
		message = '参数异常，请传入用户账号';
	}
    if(message === '') {
        try {
            const usernameExit = await ModelUser.findByName(data.username);
            const telExit = await ModelUser.findByTel(data.username);
            if(!usernameExit && !telExit) {
                return ctx.body = '账号错误，请重新输入';
            }
            
            let passwordHash = '';
            if(usernameExit) {
                passwordHash = await ModelUser.findPasswordByName(data.username);
            } else {
                passwordHash = await ModelUser.findPasswordByTel(data.username);
            }
            
            const passwordCompare = await password.validate(data.password, passwordHash);
            
            
            if(!passwordCompare) { 
                return ctx.body = '密码错误，请重新输入';
            }
            ctx.session.user = usernameExit || telExit; 
            ctx.redirect('/');

		} catch (err) {
			console.log(err);
		}
    } else {
        ctx.body = message;
    }
}
/**
 * @description 退出登录
 * @return null.
 */
const logoutHandle = async (ctx, next) => {
    ctx.session = null;
    ctx.redirect('/');
}
/**
 * @description 验证是否已经登录
 * @return null.
 */
const isLogged = async (ctx, next) => {
    if(!ctx.session.user) {
        return ctx.redirect('/login');
    }
    return next();
}

export default { 
	register,
	registerHandle,
    login,
    loginHandle,
    logoutHandle,
    isLogged
}; 