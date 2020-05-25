// Models
const User = require('../models/user.model');
const Session = require('../models/session.model');
const Book = require('../models/book.model');

module.exports.checkLogin = async function (req, res, next) {
    var userId = req.signedCookies.userId;
    if (!userId) {
        res.redirect('/auth/login');
        return;
    }

    var user = await User.findById(userId);
    if (!user) {
        res.send('Có lỗi xảy ra');
        return;
    }

    res.locals.user = user;
    next();
}

module.exports.checkSession = async function (req, res, next) {
    var sessionId = req.signedCookies.sessionId;
    if (!sessionId) {
        var session = new Session({ cart: {} });
        await session.save();
        res.cookie('sessionId', session.id, { signed: true });
        res.locals.cart = [];
        next();
        return;
    }
    var cart = [];
    var session = await Session.findById(sessionId);

    if (session.cart) {
        for (var item in session.cart) {
            var book = await Book.findById(item);
            cart.push(book.name);
        }
    }
    res.locals.cart = cart;
    next();
}