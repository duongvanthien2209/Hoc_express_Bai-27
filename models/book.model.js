const mongoose = require('mongoose');
const schema = mongoose.Schema({
    name: String,
    image: String,
    description: String,
    shopId: String
});

var Book = mongoose.model('Book', schema, 'books');
module.exports = Book;