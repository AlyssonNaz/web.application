var express = require('express');
var router = express.Router();
var db = require('rah.db');
var auth = require('rah.auth');
var utils = require('rah.utils');


router.get('/', auth.cookie, function (req, res, next) {
    utils.templates.dashboard(res, {
        view: 'main',
        root: 'dashboard',
        header: 'main.header',
        title: 'Painel de Administração'
    })
});

module.exports = router;