var express = require('express');
var router = express.Router();
var db = require('rah.db');
var auth = require('rah.auth');
var path = require('path');

router.get('/', auth.cookie, function (req, res, next) {
    res.render('dashboard/index', {pageTitle: 'SeuGarçom! | Painel de Administração', view: 'partials/main.html'});
});

module.exports = router;