import mongoose from 'mongoose';

const Schema = mongoose.Schema;

/**
 * @description 歌单数据格式
   @params {Number} id 自定义id
   @params {String} img 歌单封面
   @params {String} title 歌单标题
   @params {String} playNum 播放次数
   @params {String} author 作者
   @params {String} desc 歌单描述
 */
const PlayListSchema = new Schema({ 
    id: {
		type: Number,
		unique: true,
        required: true
	},
	img: String,
	title: String,
	playNum: String,
	author: String,
	desc: String,
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
PlayListSchema.pre('save', function(next)  {
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
PlayListSchema.statics = {
	/**
	 * @description 清空歌单列表集合
	 * @method clear
	 * @return null
	 */
     async clear() {
        return await this.remove({});
    },
	/**
	 * @description 清空歌单某一条数据
	 * @method remove
	 * @return null
	 */
	async removeOne(c) {
		return await this.remove(c);
	},
	/**
	 * @description 删除歌单多条数据
	 * @params {String} key 要删除的字段名称
	 * @params {Array} arr 要删除的多条数据的值
	 */
	async removeMulti(key, arr) {
		let _c = {};
		_c[key] = { $in: arr};
		return await this.remove(_c);
	},
	/**
	 * @description 获取歌单详情
	 * @method findById
	 * @params {Number} id
	 * @return {Object} 对应歌单id详情
	 */
	async findById(id) {
		return await this.findOne({id});
	},
};

export default PlayListSchema;