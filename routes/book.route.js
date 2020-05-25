const express = require('express');
const router = express.Router();

// Controllers
const bookController = require('../controllers/book.controller');

// Get in Page
router.get('/', bookController.getAll);

// Add to Session
router.get('/add/:id', bookController.addToSession);

module.exports = router;