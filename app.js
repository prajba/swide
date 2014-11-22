var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var stylus = require('stylus');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var mongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');

var settings = require('./settings');
var routes = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// website icon
app.use(favicon(path.join(__dirname, 'public/icbc.ico')));

app.use(logger('dev'));
//var fs = require('fs');
//var accessLogfile = fs.createWriteStream('access.log', {flags: 'a'});
//var errorLogfile = fs.createWriteStream('error.log', {flags: 'a'});
//app.use(logger({stream: accessLogfile}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// static elements
app.use(stylus.middleware({
  src:  __dirname + "/public/stylus",
  dest: __dirname + "/public/css",
  debug: true,
  compile : function(str, path) {
    console.log('compiling');
    return stylus(str)
      .set('filename', path)
      .set('warn', true)
      .set('compress', true);
  }
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use(flash());

// session
app.use(session({
  secret: settings.cookieSecret,
  store: new mongoStore({
    db: settings.db
  }),
  resave: true,
  saveUninitialized: true
}));

app.use(function(req, res, next){
  res.locals.user = req.session.user;
  res.locals.post = req.session.post;
  var error = req.flash('error');
  res.locals.error = error.length ? error : null;
  var success = req.flash('success');
  res.locals.success = success.length ? success : null;
  next();
});

// router
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
