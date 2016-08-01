var express = require('express');
var router = express.Router();
var db = requireCore('rah.db');
var auth = requireCore('rah.auth');
var utils = requireCore('rah.utils');


router.get('/', auth.cookie, function (req, res, next) {
    utils.templates.dashboard(res, {
        view: 'main',
        root: 'dashboard',
        header: 'main.header',
        title: 'Painel de Administração'
    })
});

module.exports = router;