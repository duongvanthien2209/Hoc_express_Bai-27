const express = require('express');
const router = express.Router();

// Controllers
const userController = require('../controllers/user.controller');

// GetAll
router.get('/', userController.getAll);

// Reset
router.get('/resetWrongLoginCount/:id', userController.reset);

// Delete
router.get('/delete/:id', userController.delete);

module.exports = router;