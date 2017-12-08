import bcryptjs from 'bcryptjs';
import config from './config';

/**
 * @description 密码加盐加密
 * @methods genSalt hash
 * @params {String} password 用户输入密码
 * @return {String} 加密后的密码.
 */
const encrypt = async (password) => {
    const salt = await  bcryptjs.genSalt(config.passwordSaltRounds);
    const hash = await bcryptjs.hash(password, salt);
    return hash;
}
/**
 * @description 比对密码与加密后代码是否一致
 * @methods compare
 * @params {String} password 用户输入密码
           {String} hash     加密后的密码
 * @return {Boolean} 密码对比结果
 */
const validate = async (password, hash) => {
    return await bcryptjs.compare(password, hash);
}

export default {
    encrypt,
    validate
}