const express = require('express');
const router = express.Router();

// Routes
const bookRoute = require('../api/routes/book.route');
const sessionRoute = require('../api/routes/session.route');
const transactionRoute = require('../api/routes/transaction.route');
const userRoute = require('../api/routes/user.route');
const authRoute = require('../api/routes/auth.route');

router.use('/auth', authRoute);

router.use('/books', bookRoute);

router.use('/sessions', sessionRoute);

router.use('/transactions', transactionRoute);

router.use('/users', userRoute);

module.exports = router;