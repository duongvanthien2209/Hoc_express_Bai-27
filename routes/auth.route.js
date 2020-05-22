const express = require('express');

// Dùng multer để upload file lên server
const multer = require('multer');
var upload = multer({ dest: './public/uploads/profile/avatar' });

const router = express.Router();

// Controllers
const authController = require('../controllers/auth.controller');

// Validations
const authValidate = require('../validations/auth.validate');

// Login
router.get('/login', authController.getLogin);
router.post('/login', authValidate.postLogin, authController.postLogin);

// Create
router.get('/create', authController.getCreate);

// Có một lỗi là nếu người dùng upload bất cứ ảnh nào cũng nhận
router.post('/create', upload.single('avatar'), authValidate.postCreate, authController.postCreate);  

module.exports = router;