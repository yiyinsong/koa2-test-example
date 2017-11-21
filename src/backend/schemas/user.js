import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    tel: {
        type: Number,
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
    fetch() {
        return this.find({}).sort('meta.createTime');
    },
    findByName(name) {
        return this.findOne({username: name});
    }
};

export default UserSchema;