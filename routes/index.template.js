var express = require('express');
var router = express.Router();
var auth = requireCore('rah.auth');
var utils = requireCore('rah.utils');

/* Rota sem autenticação */
router.get('*', function (req, res, next) {
});

/* Rota com autenticação de requisição */
router.get('*', auth.req, function (req, res, next) {
});

/* Rota com autenticação de cookie */
router.get('*', auth.cookie, function (req, res, next) {
});

/* Rota com template */
router.get('*', auth.cookie, function (req, res, next) {
    utils.templates.dashboard(res, {
        view: 'main',
        root: 'dashboard',
        header: 'main.header',
        footer: 'main.header',
        data: {},
        title: 'Painel de Administração'
    })
});




module.exports = router;