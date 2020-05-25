require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

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

// Middlewares
const authMiddleware = require('./middlewares/auth.middleware');

app.use('/auth', authRoute);

app.use('/api', apiRoute);

app.use(authMiddleware.checkSession);

app.use('/books', bookRoute);

app.use(authMiddleware.checkLogin);

app.use('/transactions', transactionRoute);

app.get('/', function (req, res) {
  res.send('hello world');
})

app.use('/users', userRoute);

app.listen(3000);