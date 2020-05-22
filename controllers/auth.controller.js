// Cloudinary - Dùng để upload file lên cloud
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

// Bcrypt
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Models
const User = require('../models/user.model');

// Login
module.exports.getLogin = function(req,res) {
    res.render('pages/auth/login');
}

module.exports.postLogin = function(req,res) {

}

// Create User
module.exports.getCreate = function(req,res) {
    res.render('pages/auth/create');
}

module.exports.postCreate = async function(req,res,next) {
    var avatar = req.file.fieldname;

    if(!avatar) {
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