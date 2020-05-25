const express = require('express');
const router = express.Router();

// Controllers
const transactionController = require('../controllers/transaction.controller');

// Get All
router.get('/getAll', transactionController.getAll);

// Add from session
router.get('/addToTransaction', transactionController.addFromSession);

module.exports = router;