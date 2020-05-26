// Models
const Book = require('../models/book.model');
const Session = require('../models/session.model');
const Shop = require('../models/shop.model');

module.exports.getAll = async function (req, res) {
    const n = 20;
    var page = req.query.page ? parseInt(req.query.page) : 1;
    var start = (page - 1) * n;
    var end = start + n;
    var books = await Book.find();
    books = books.slice(start, end);
    res.render('pages/book/index', { books });
}

module.exports.addToSession = async function (req, res) {
    var sessionId = req.signedCookies.sessionId;
    if (!sessionId) {
        res.send('Có lỗi xảy ra');
        return;
    }
    var session = await Session.findById(sessionId);
    var bookId = req.params.id;
    var count = session.cart ? session.cart[bookId] ? session.cart[bookId] : 0 : 0;
    var str = 'cart.' + bookId;
    await Session.findByIdAndUpdate(session.id, { $set: { [str]: count + 1 } });
    res.redirect('/books');
};

// Thêm sách
module.exports.getAddBook = async function (req, res) {
    var userId = req.signedCookies.userId;

    if (!userId) {
        res.send('Có lỗi xảy ra');
        return;
    }

    var shop = await Shop.findOne({ userId });  // Mỗi người chỉ có thể tạo 1 shop
    
    if(!shop) {
        res.send('Chỉ có chủ shop mới có quyền thêm sách');
        return;
    }

    res.render('pages/book/create');
}

module.exports.postAddBook = async function (req, res) {
    var name = req.body.name;
    var book = await Book.findOne({ name });

    if (book) {
        res.render('pages/book/create', { errors: ['Tên bạn nhập đã có người đăng ký'] });
        return;
    }

    var userId = req.signedCookies.userId;

    var shop = await Shop.findOne({ userId });

    if(!shop) {
        res.send('Có lỗi xảy ra');
        return;
    }

    var shopId = shop.id;
    var description = req.body.description;

    var book1 = new Book({ name, description, shopId, image: 'https://loremflickr.com/320/240' });
    await book1.save();

    res.redirect('/shops');
}