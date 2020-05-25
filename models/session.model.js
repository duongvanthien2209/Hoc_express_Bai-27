const mongoose = require('mongoose');

const schema = mongoose.Schema({
    cart: {}
});

var Session = mongoose.model('Session', schema, 'sessions');
module.exports = Session;