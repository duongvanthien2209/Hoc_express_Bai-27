const express = require('express');
const router = express.Router();

// Controllers
const bookController = require('../controllers/book.controller');

router.get('/', bookController.getAll);

module.exports = router;