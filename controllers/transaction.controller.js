// Models
const Transaction = require('../models/transaction.model');
const Session = require('../models/session.model');
const User = require('../models/user.model');
const Book = require('../models/book.model');

module.exports.getAll = async function(req,res) {
    var userId = req.signedCookies.userId;
    if(!userId) {
        res.send('Có lỗi xảy ra');
        return;
    } 
    
    var user = await User.findById(userId);

    var transactions

    if(user.isAdmin) {
        transactions = await Transaction.find();
    }else transactions = await Transaction.find({ userId });

    var transactions1 = [];

    for(var item of transactions) {
        var book = await Book.findById(item.bookId);
        if(item.userId) {
            transactions1.push({ id: item.id, userName: user.name, bookName: book.name, sluong: item.sluong });
        }else
            transactions1.push({ id: item.id, bookName: book.name, sluong: item.sluong });
    }

    res.render('pages/transaction/index', { transactions: transactions1 });
}

module.exports.addFromSession = async function(req,res) {
    var sessionId = req.signedCookies.sessionId;
    var userId = req.signedCookies.userId;

    var session = await Session.findById(sessionId);
    var cart = session.cart;

    for(var item in cart) {
        var transaction
        if(userId) {
            transaction = new Transaction({
                bookId: item,
                userId,
                sluong: cart[item]
            });
        }else {
            transaction = new Transaction({
                bookId: item,
                sluong: cart[item]
            });
        }

        await transaction.save();
    }

    await Session.findByIdAndUpdate(sessionId, { $set: { cart: {} } });
    res.redirect('/books');
}