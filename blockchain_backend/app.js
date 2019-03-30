var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const cors = require('cors');
const session = require('express-session');
const mongoose = require('mongoose');

require('dotenv').config();
const { DB_PASSWORD } = process.env;

//Models & routes
require('./models/Users');
require('./models/Parcels');
require('./config/passport');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/api/users');
var parcelRouter = require('./routes/api/parcels');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'blockchain-secret', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));
app.use(cors({
  'origin': "http://localhost:3000",
  'optionsSuccessStatus': 200
}))

//Configure mongoose
// mongoose.connect(`mongodb+srv://christabel:${DB_PASSWORD}@blockchain-ismdr.mongodb.net/test?retryWrites=true`);
mongoose.connect(`mongodb://parceladmin:${DB_PASSWORD}@68.183.184.3:27017/parceltracking`, {useNewUrlParser: true});
mongoose.set('debug', true);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/parcels', parcelRouter);

// app.use((err, req, res) => {
//   res.status(err.status || 500);

//   res.json({
//     errors: {
//       message: err.message,
//       error: {},
//     },
//   });
// });

app.listen(8000, () => console.log('Server running on http://localhost:8000/'));

module.exports = app;
