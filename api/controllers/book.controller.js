// Models
const Book = require('../../models/book.model');

module.exports.getAll = async function(req,res) {
    var books = await Book.find();
    res.json(books);
}
