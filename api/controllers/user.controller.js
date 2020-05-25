// Models
const User = require('../../models/user.model');

module.exports.getAll = async function(req,res) {
    var users = await User.find();
    res.json(users);
}