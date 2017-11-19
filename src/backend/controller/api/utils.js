import fs from 'fs';
import path from 'path';
import config from '../../utils/config';

const upload = async (ctx, next) => {
    console.log(ctx.request.body);
	const fields = ctx.request.body.fields;
    const file = ctx.request.body.files.file;
	let r = {};
	if(!file){
        r = {
			code: 0,
			message: '参数错误',
			path: ''
		};
    } else if(!fields.rootPath) {
		r = {
			code: 0,
			message: '请传入rootPath',
			path: ''
		};
	} else {
		//判断系统是否存在rootPath路径，没有先循环创建目录
		const rootPaths = (config.uploadPath + fields.rootPath).split('/');
		let p = '';
		while(rootPaths.length) { 
			p += rootPaths.shift() + '/';
			if (!fs.existsSync(p)) {
				fs.mkdirSync(p);
			}
		}
		//上传图片
		const fileName = new Date().getTime() + file.name.substr(file.name.lastIndexOf('.'));
		const reader = fs.createReadStream(file.path);
		const writer = fs.createWriteStream(config.uploadPath + fields.rootPath + '/' + fileName);
		reader.pipe(writer);
		const currentPath = config.uploadLocalPath + fields.rootPath + '/' + fileName;
		r = {
			code: 1,
			message: '上传成功',
			path: currentPath 
		}
	}
	ctx.body = r;
}

export default { 
	upload
}; 