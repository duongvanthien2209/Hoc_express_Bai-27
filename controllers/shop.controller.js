// Models
const Shop = require('../models/shop.model');
const Book = require('../models/book.model');

// Xem các sách mà shop đó bán
module.exports.getAll = async function(req,res) {
    var userId = req.signedCookies.userId;

    if(!userId) {
        req.redirect('/auth/login');
        return;
    }

    var shop = await Shop.findOne({ userId });

    if(!shop) {
        res.send('Có lỗi xảy ra');
        return;
    }

    var books = await Book.find({ shopId: shop.id });
    res.render('pages/shop/index', { books });
}

// Tạo shop
module.exports.getCreate = function(req,res) {
    res.render('pages/shop/create');
}

module.exports.postCreate = async function(req,res) {
    var name = req.body.name;
    var shop = await Shop.findOne({ name });
    if(shop) {
        res.render('pages/shop/create', { errors: ['Tên bạn nhập đã có người đăng ký'] });
        return;
    }

    var userId = req.signedCookies.userId;

    if(!userId) {
        res.send('Có lỗi xảy ra');
        return;
    }
    var description = req.body.description;
    var shop1 = new Shop({ name, description, userId });
    await shop1.save();

    res.redirect('/shops');
}

// Thêm sách
