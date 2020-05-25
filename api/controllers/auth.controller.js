// Bcrypt
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Models
const User = require('../../models/user.model');

module.exports.postLogin = async function(req,res) {
    var email = req.body.email;

    if(!email) {
        res.json({ errors: ['Bạn chưa nhập email'] });
        return;
    }

    var user = await User.findOne({ email });

    if(!user) {
        res.json({ errors: ['Bạn nhập sai email'] });
        return;
    }

    var password = req.body.password;
    var result = await bcrypt.compare(password, user.password);

    if(!result) {
        res.json({ errors: ['Bạn nhập sai mật khẩu'] });
        return;
    }

    res.cookie('userId', user.id, { signed: true });
    res.json({ success: ['Bạn đã đăng nhập thành công'] });
}