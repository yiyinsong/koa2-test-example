import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const SequenceSchema = new Schema({
    _id: String,
    sequence_value: {
        type: Number,
        default: 0
    }
});

SequenceSchema.statics = {
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