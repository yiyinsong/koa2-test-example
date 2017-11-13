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
    const file = ctx.request.body.files;
    const fileName = new Date().getTime() + file.imgs.name.substr(file.imgs.name.lastIndexOf('.'));
    const reader = fs.createReadStream(file.imgs.path);
    const writer = fs.createWriteStream(config.uploadPath + fileName);
    reader.pipe(writer);
    const currentPath = config.uploadLocalPath + fileName
    ctx.body = currentPath;
}

export default { 
	register,
	registerHandle,
    login
}; 