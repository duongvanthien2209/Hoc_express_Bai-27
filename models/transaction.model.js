const mongoose = require('mongoose');

const schema = mongoose.Schema({
    bookId: String,
    userId: String,
    sluong: Number
});

var Transaction = mongoose.model('Transaction', schema, 'transactions');
module.exports = Transaction;