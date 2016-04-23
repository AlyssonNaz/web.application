var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// var routes = require('./routes/index');
var fs = require('fs');
var engine = require('ejs');

//my custom uses
var db = require('rah.db')
var routes = require('rah.routes')
var utils = require('rah.utils')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', engine.__express);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'https://seugarcom.herokuapp.com');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next()
};

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(allowCrossDomain);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/admin/modules/js', express.static(path.join(__dirname, '/views/admin/modules/js')));



// load automatic custom routes
routes.default(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        switch (err.name) {
            case 'UnauthorizedError': {
                return utils.templates.login(res, {
                    title: 'Login',
                });
            }
            default: {
                res.status(err.status || 500);
                res.render('error', {
                    message: err.message,
                    error: err
                });
            }
        }
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
