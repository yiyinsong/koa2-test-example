import mongoose from 'mongoose';

const Schema = mongoose.Schema;

/**
 * @description 自定义数据库序列数据格式
   @params {String} _id 自定义id
   @params {Object} _sequence_value 类型&值
 */
const SequenceSchema = new Schema({
    _id: String,
    sequence_value: {
        type: Number,
        default: 0
    }
});

/**
 * @description 静态方法
 */
SequenceSchema.statics = {
	/**
	 * @description 获取对应key的自定义序列
	 * @method getSequence
	 * @params {String} sequenceName 数据库中对应该序列的key
	 * @return {Number} 增长后的序列
	 */
     async getSequence(sequenceName) {
        const r = await  this.findOneAndUpdate(
            {_id: sequenceName },
            {$inc:{sequence_value: 1}},
            {new: true}
        ).exec();
        return r.sequence_value;
    }
};

export default SequenceSchema;