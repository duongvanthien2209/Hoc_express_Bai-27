// Models
const Session = require('../../models/session.model');

module.exports.getAll = async function(req,res) {
    var sessions = await Session.find();
    res.json(sessions);
}