// Models
const User = require('../models/user.model');

module.exports.postLogin = function(req,res,next) {
    var errors = [];

    var email = req.body.email;
    if(!email) {
        errors.push('Bạn chưa nhập email');
    }

    var password = req.body.password;
    if(!password) {
        errors.push('Bạn chưa nhập password');
    }

    if(errors.length > 0) {
        res.render('pages/auth/login', { errors, ...req.body });
        return;
    } 

    next();
}

module.exports.postCreate = async function(req,res,next) {
    var errors = [];

    var name = req.body.name;
    if(!name) {
        errors.push('Bạn chưa nhập tên');
    }

    var email = req.body.email;
    if(!email) {
        errors.push('Bạn chưa nhập email');
    }

    var user = await User.find({email});

    if(user.length !== 0) {
        errors.push('Email bạn nhập đã có người sửa dụng');
    }

    var password = req.body.password;
    if(!password) {
        errors.push('Bạn chưa nhập password');
    }

    if(errors.length > 0) {
        res.render('pages/auth/create', { errors, ...req.body });
        return;
    } 

    next();
}