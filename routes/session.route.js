const express = require('express');
const router = express.Router();

// Controllers
const sessionController = require('../controllers/session.controller');

// GetAll
router.get('/', sessionController.getAll);

// Get by user
router.get('/:userId', sessionController.getbyUserId);

module.exports = router;