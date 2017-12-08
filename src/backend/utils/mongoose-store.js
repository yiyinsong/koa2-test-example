'use strict';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const SessionSchema = new Schema({
    _id: {
        type: String,
        unique: true,
        require: true
    },
    value: String
});
/**
 * @class MongooseStore
 * @description koa session monogoose store，管理mongodb保持session持久性
 */
class MongooseStore {
    constructor() {
        this.SessionModel = mongoose.model('session', SessionSchema);
    }
	/**
	 * @description 通过session id 或 session key获取用户数据
	 * @method get
	 * @params {String} key session key，对应数据库中_id
	 * @return {Object} key对应数据库中的用户数据
	 */
    async get(key) {
        try {
            const r = await this.SessionModel.findOne({_id: key});
            return JSON.parse(r.value);
        } catch(err) {
            return err;
        }
    }
	/**
	 * @description 把用户数据存入数据库中的session collection
	 * @method set
	 * @params {String} key  session key，对应数据库中_id
	 *         {Object} sess session对象
	 *         {Number} ttl  时间戳
	 * @return {Object} 修改数据库中用户数据，返回修改后的值
	 */
    async set(key, sess, ttl) {
        sess = {...sess};
        const maxAge = sess.cookie && (sess.cookie.maxAge || sess.cookie.maxage);
        sess.ttl = new Date((ttl || ('number' == typeof maxAge
            ? maxAge : 86400000)) + Date.now());
        try {
            const r = await (new this.SessionModel({_id: key, value: JSON.stringify(sess)})).save();
            return r;
        } catch(err) {
            console.log(err);
            return err;
        }
    }
	/**
	 * @description 销毁session调用
	 * @method destroy
	 * @params {String} key session key，对应数据库中_id
	 * @return {Object} 从数据库中销毁session key对应数据后放回值
	 */
    async destroy(key) {
        console.log('........................destroy......................');
        try {
            const r = await this.SessionModel.findOneAndRemove({_id: key});
            return r;
        } catch(err) {
            return err;
        }

    }
}

export default MongooseStore;