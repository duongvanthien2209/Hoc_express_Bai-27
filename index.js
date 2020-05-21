require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

// Setup template engine
app.use('view engine', 'pug');
app.use('views','./views');

// Đọc cookies
app.use(cookieParser(process.env.COOKIE_SECRET));

// Đọc file từ form
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.send('hello world');
})

app.listen(3000);