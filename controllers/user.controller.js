// Models
const User = require('../models/user.model');
// const Book = require('../models/book.model');

module.exports.getAll = async function (req, res) {
    var users = await User.find();
    res.render('pages/user/index', { users });
}

module.exports.reset = async function (req, res) {
    var id = req.params.id;
    if (!id) {
        res.send('Có lỗi xảy ra');
        return;
    }
    try {
        var user = await User.findById(id);
        if (!user) {
            res.send('Có lỗi xảy ra');
            return;
        }
        user.wrongLoginCount = 0;
        await user.save();
    } catch (error) {
        res.send(error);
        return;
    }
    res.redirect('/users');
}

module.exports.delete = async function (req, res) {
    var id = req.params.id;
    if (!id) {
        res.send('Có lỗi xảy ra');
        return;
    }
    try {
        await User.findByIdAndDelete(id);
    } catch (error) {
        res.send(error);
        return;
    }
    res.redirect('/users');
}