var express = require('express');
var router = express.Router();
var auth = require('rah.auth');
var TUser = require('rah.modules')('user');
var utils = require('rah.utils');

/* GET users page. */
router.get('/', auth.cookie, function (req, res, next) {
    TUser.getAll().then(function (users) {
        utils.templates.dashboard(res, {
            view: 'users',
            root: 'admin/users',
            header: 'users.header',
            footer: 'users.footer',
            title: 'Usuários',
            data: { users }
        });
    }, function (err) {
        console.log(err);
    });
});

router.get('/edit/:id', auth.cookie, function (req, res, next) {
    TUser.get(req.params.id).then(function (user) {
        utils.templates.dashboard(res, {
            view: 'edit',
            root: 'admin/users',
            // header: 'users.header',
            // footer: 'users.footer',
            title: 'Usuário > Editar',
            data: { user }
        });
    }, function (err) {
        console.log(err);
    });

});

router.get('/edit/:id/access', auth.cookie, function (req, res, next) {
    utils.templates.dashboard(res, {
        view: 'access',
        root: 'admin/users',
        // header: 'users.header',
        // footer: 'users.footer',
        title: 'Usuário > Editar > Acesso',
        // data: { user }
    });
});

module.exports = router;