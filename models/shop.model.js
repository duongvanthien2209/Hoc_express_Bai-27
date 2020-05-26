const mongoose = require('mongoose');
const schema = mongoose.Schema({
    name: String,
    description: String,
    userId: String
});

var Shop = mongoose.model('Shop', schema, 'shops');
module.exports = Shop;