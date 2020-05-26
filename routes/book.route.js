const express = require('express');
const router = express.Router();

// Controllers
const bookController = require('../controllers/book.controller');
const authController = require('../controllers/auth.controller');

// Get in Page
router.get('/', bookController.getAll);

// Add to Session
router.get('/add/:id', bookController.addToSession);

// Thêm sách
router.get('/addBook', bookController.getAddBook);

router.post('/addBook', authController.addBook, bookController.postAddBook);

module.exports = router;