const express = require('express');
const router = express.Router();

// Controllers
const shopController = require('../controllers/shop.controller');
const authController = require('../controllers/auth.controller');

// Xem tất cả các sách mà shop đó bán
router.get('/', shopController.getAll);

// Tạo shop
router.get('/create', shopController.getCreate);

router.post('/create', authController.postCreateShop, shopController.postCreate);

module.exports = router;