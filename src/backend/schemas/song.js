import mongoose from 'mongoose';

const Schema = mongoose.Schema;

/**
 * @description 歌曲数据格式
   @params {Number} id 自定义id
   @params {String} img 歌曲封面
   @params {String} title 歌曲标题
   @params {String} singer 歌手
   @params {String} pid 歌单id
   @params {String} album 专辑
   @params {String} length 时长
   @params {Object} frompl 歌曲所关联的歌单
 */
const SongSchema = new Schema({
  id: {
		type: String,
		unique: true, 
    required: true
	},
	img: String,
	title: String,
	singer: String,
  album: String,
  length: String,
  pid: String,
  frompl: {
		type: Schema.Types.ObjectId,
		ref: 'playlist'
	},
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
SongSchema.pre('save', function(next)  {
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
SongSchema.statics = {
	/**
	 * @description 清空歌单列表集合
	 * @method clear
	 * @return null
	 */
  async clear(oid) {
    return await this.remove({pid: oid}); 
  },
    /**
     * @description 获取歌单歌曲列表
     * @method fetch
     * @return {Array} 歌单列表
     */
  async fetch(oid) {
    return await this.find({pid: oid});  
  }, 
	/**
	 * @description 清空歌曲列表某一条数据
	 * @method remove
	 * @return null
	 */
	async removeOne(c) {
		return await this.remove(c);
	},
	/**
	 * @description 删除歌曲多条数据
	 * @params {String} key 要删除的字段名称
	 * @params {Array} arr 要删除的多条数据的值
	 */
	async removeMulti(key, arr) {
		let _c = {};
		_c[key] = { $in: arr};
		return await this.remove(_c);
	},
// 	/**
// 	 * @description 获取歌单详情
// 	 * @method findById
// 	 * @params {Number} id
// 	 * @return {Object}  对应歌单id详情
// 	 */
// 	async findById(id) {
// 		return await this.findOne({id});
// 	},
};

export default SongSchema;