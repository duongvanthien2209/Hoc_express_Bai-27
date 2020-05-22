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

app.use('/auth', authRoute);

app.get('/', function (req, res) {
  res.send('hello world');
})

app.listen(3000);