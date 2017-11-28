import mongoose from 'mongoose';

const Schema = mongoose.Schema;

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

UserSchema.pre('save', function(next)  {
    if(this.isNew) {
        this.meta.createTime = this.meta.updateTime = Date.now();
    } else {
        this.meta.updateTime = Date.now();
    }
    next();
});

UserSchema.statics = {
    async fetch() {
        const r = await this.find({}).sort('meta.createTime');
        return r;
    },
    async findByName(name) {
        const r = await this.findOne({username: name});
        return r;
    },
    async findByTel(tel) {
        const r = await this.findOne({tel});
        return r;
    },
    async findPasswordByName(name) {
        const r = await this.findOne({username: name});
        return (r && r.password) || null;
    },
    async findPasswordByTel(tel) {
        const r = await this.findOne({tel});
        return (r && r.password) || null;
    }
};

export default UserSchema;