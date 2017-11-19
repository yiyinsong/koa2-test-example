import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    id: Schema.type.ObjectId(),
    username: {
        type: String,
        unique: true
    },
    tel: {
        type: Number,
        unique: true
    },
    password: {
        type: String
    },
    image: String
});