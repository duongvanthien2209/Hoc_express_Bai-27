// Models
const Transaction = require('../../models/transaction.model');

module.exports.getAll = async function(req,res) {
    var transactions = await Transaction.find();
    res.json(transactions);
}