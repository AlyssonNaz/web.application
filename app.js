var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var engine = require('ejs');

var core = require('rah.core');
core.config();

var app = express();

//my custom uses
var db = requireCore('rah.db');
var routes = requireCore('rah.routes');
var utils = requireCore('rah.utils');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', engine.__express);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/admin/modules/js', express.static(path.join(__dirname, '/views/admin/modules/js')));

/* Configurações NOVAS */
app.use(express.static(path.join(__dirname, '/rah/web')));
// app.use('/images/', express.static(path.join(__dirname, '/rah/web/images')));
// app.use('/scripts/', express.static(path.join(__dirname, '/rah/web/scripts')));
// app.use('/styles/', express.static(path.join(__dirname, '/rah/web/styles')));
// app.use('/vendor/', express.static(path.join(__dirname, '/rah/web/vendor')));

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
