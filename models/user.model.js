const mongoose = require('mongoose');
const schema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    avatar: String,
    isAdmin: Boolean,
    wrongLoginCount: Number
});

var User = mongoose.model('User', schema, 'users');
module.exports = User;