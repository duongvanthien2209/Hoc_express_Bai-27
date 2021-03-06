require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const port = process.env.PORT || 3000;

const app = express();

// Liên kết database MongoDB atlas dùng mongoose
mongoose.connect(process.env.MONGODB_URL);

// Setup template engine
app.set('view engine', 'pug');
app.set('views','./views');

// Đọc file từ form
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Đọc cookies
app.use(cookieParser(process.env.COOKIE_SECRET));

// Setup file static
app.use(express.static('public'));

// Routes
const authRoute = require('./routes/auth.route');
const userRoute = require('./routes/user.route');
const bookRoute = require('./routes/book.route');
const transactionRoute = require('./routes/transaction.route');
const apiRoute = require('./routes/api.route');
const shopRoute = require('./routes/shop.route');

// Middlewares
const authMiddleware = require('./middlewares/auth.middleware');

app.use('/auth', authRoute);

app.use('/api', apiRoute);

app.use(authMiddleware.checkSession);

app.use('/books', bookRoute);

app.use(authMiddleware.checkLogin);

app.use('/shops', shopRoute);

app.use('/transactions', transactionRoute);

app.use('/users', authMiddleware.checkAdmin, userRoute);

app.listen(port);