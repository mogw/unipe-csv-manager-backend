const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    age: Number,
    sex: String,
}, { versionKey: false });

mongoose.model('User', UserSchema);
