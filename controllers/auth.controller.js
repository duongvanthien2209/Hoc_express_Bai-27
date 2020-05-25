require('dotenv').config();

// Cloudinary - Dùng để upload file lên cloud
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

// Sendgrid - Dùng để gởi email đến người dùng khi họ nhập sai quá số lần quy định
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Bcrypt
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Models
const User = require('../models/user.model');

// Login
module.exports.getLogin = function(req,res) {
    res.render('pages/auth/login');
}

module.exports.postLogin = async function(req,res) {
    var errors = [];

    var email = req.body.email;
    var user = await User.findOne({email});
    if(!user) {
        errors.push('Bạn nhập sai email');
        res.render('pages/auth/login', {errors});
        return;
    }

    if(user.wrongLoginCount >= 4) {
        const msg = {
            to: email,
            from: 'duongvanthienbkhoa@gmail.com',
            subject: 'Sending with Twilio SendGrid is Fun',
            text: 'and easy to do anywhere, even with Node.js',
            html: '<strong>Cảnh báo! Bạn đã nhập sai quá số lần quy định</strong>',
        };
        try {
            await sgMail.send(msg);
        } catch (error) {
            console.log(errors);
        }
        errors.push('Bạn nhập sai quá sô lần quy định');
        res.render('pages/auth/login', {errors});
        return;
    }


    var password = req.body.password;
    var result = await bcrypt.compare(password, user.password);
    if(!result) {
        user.wrongLoginCount += 1;
        await user.save();
        errors.push('Bạn nhập sai password');
        res.render('pages/auth/login', {errors});
        return;
    }

    res.cookie('userId', user.id, { signed: true });
    res.redirect('/books');
}

// Create User
module.exports.getCreate = function(req,res) {
    res.render('pages/auth/create');
}

module.exports.postCreate = async function(req,res,next) {
    var avatar;

    if(!req.file) {
        avatar = 'https://loremflickr.com/320/240/dog';
    }else {
        var result = await cloudinary.uploader.upload(req.file.path);
        avatar = result.url;
    }

    var password = await bcrypt.hash(req.body.password, saltRounds);
    var user = new User({ name: req.body.name, password, email: req.body.email, avatar, wrongLoginCount: 0 });

    await user.save();
    res.redirect('/auth/login');
}