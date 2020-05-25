// Models
const Book = require('../models/book.model');
const Session = require('../models/session.model');

module.exports.getAll = async function(req,res) {
    const n = 20;
    var page = req.query.page?parseInt(req.query.page):1;
    var start = (page-1)*n;
    var end = start + n;
    var books = await Book.find();
    books = books.slice(start,end);
    res.render('pages/book/index', {books});
}

module.exports.addToSession = async function(req,res) {
    var sessionId = req.signedCookies.sessionId;
    if(!sessionId) {
        res.send('Có lỗi xảy ra');
        return;
    }
    var session = await Session.findById(sessionId);
    var bookId = req.params.id;
    var count = session.cart?session.cart[bookId]?session.cart[bookId]:0:0;
    var str = 'cart.' + bookId;
    await Session.findByIdAndUpdate(session.id, { $set: { [str]: count + 1 } });
    res.redirect('/books');
};