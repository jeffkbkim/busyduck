var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var uri = "mongodb://superuser:G2fOzqDqKIb8yTIC@pocha-shard-00-00-upvmz.mongodb.net:27017,pocha-shard-00-01-upvmz.mongodb.net:27017,pocha-shard-00-01-upvmz.mongodb.net:27017/busyduck?ssl=true&replicaSet=Pocha-shard-0&authSource=admin";
mongoose.connect(uri, {
    useMongoClient: true
});

console.log("Mongoose connection state " + mongoose.connection.readyState); // Output - 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting

var indexRoutes = require('./routes/index');
var userRoutes = require('./routes/user');
var workPositionRoutes = require('./routes/work-position');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});

app.use('/work-position', workPositionRoutes);
app.use('/user', userRoutes);
app.use('/', indexRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.render('index');
});

module.exports = app;
