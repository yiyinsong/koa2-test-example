import mongoose from 'mongoose';

const Schema = mongoose.Schema;

/**
 * @description 用户数据格式
 * @params {Number} _id 自定义用户id（唯一值，必须）
 * @params {String} username 用户名称（唯一值，必须）
 * @params {String} tel 手机号码（唯一值，必须）
 * @params {String} password 用户密码
 * @params {String} icon 用户头像
 * @params {Object} meta 用户信息注册时间&更新时间
 */
const UserSchema = new Schema({
    _id: {
        type: Number,
        unique: true,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    tel: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String
    },
    icon: String,
    meta: {
        createTime: {
            type: Date,
            default: Date.now()
        },
        updateTime: {
            type: Date,
            default: Date.now()
        }
    }
});
/**
 * @description 用户数据保存之前，进行时间更新
 */
UserSchema.pre('save', function(next)  {
    if(this.isNew) {
        this.meta.createTime = this.meta.updateTime = Date.now();
    } else {
        this.meta.updateTime = Date.now();
    }
    next();
});
/**
 * @description 静态方法
 */
UserSchema.statics = {
	/**
	 * @description 获取所有用户数据
	 * @method fetch
	 * @return {Object} 返回所有用户数据
	 */
    async fetch() {
        const r = await this.find({}).sort('meta.createTime');
        return r;
    },
	/**
	 * @description 通过用户名称找到对应数据库中用户数据
	 * @method findByName
	 * @params {String} name 用户名称
	 * @return {Object} 返回对应name用户数据
	 */
    async findByName(name) {
        const r = await this.findOne({username: name});
        return r;
    },
	/**
	 * @description 通过手机号码找到对应数据库中用户数据
	 * @method findByTel
	 * @params {String || Number} tel 手机号码
	 * @return {Object} 返回对应tel用户数据
	 */
    async findByTel(tel) {
        const r = await this.findOne({tel});
        return r;
    },
	/**
	 * @description 通过用户名称找到对应密码
	 * @method findPasswordByName
	 * @params {String} name 用户名称
	 * @return {String} 用户密码
	 */
    async findPasswordByName(name) {
        const r = await this.findOne({username: name});
        return (r && r.password) || null;
    },
	/**
	 * @description 通过手机号码找到对应密码
	 * @method findPasswordByTel
	 * @params {String || Number} tel 手机号码
	 * @return {String} 用户密码
	 */
    async findPasswordByTel(tel) {
        const r = await this.findOne({tel});
        return (r && r.password) || null;
    }
};

export default UserSchema;