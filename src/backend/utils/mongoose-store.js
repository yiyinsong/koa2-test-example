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

class MongooseStore {
    constructor() {
        this.SessionModel = mongoose.model('session', SessionSchema);
    }

    async get(key) {
        try {
            const r = await this.SessionModel.findOne({_id: key});
            return JSON.parse(r.value);
        } catch(err) {
            return err;
        }
    }

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