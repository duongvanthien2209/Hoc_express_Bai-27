const express = require('express');
const router = express.Router();

// Controllers
const sessionController = require('../controllers/session.controller');

router.get('/', sessionController.getAll);

module.exports = router;