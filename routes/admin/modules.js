var express = require('express');
var router = express.Router();
var db = require('rah.db');
var auth = require('rah.auth');
var utils = require('rah.utils');
var routes = require('rah.routes');
var exec = require('child_process').exec;

var list;
var modules = function () {
    if (!list) {
        list = utils.list.create(db, 'modules')
    }
    return list;
}

router.get('/', auth.cookie, function (req, res, next) {
    modules().getAll().then(function (result) {

        utils.templates.dashboard(res, {
            view: 'index',
            root: 'admin/modules',
            footer: 'index.footer',
            title: 'Módulos',
            data: { modules: result }
        })

    }, function (err) {
        console.log(err);
    })
});

router.get('/edit/:id', auth.cookie, function (req, res, next) {
    modules().get(req.params.id).then(function (result) {
        utils.templates.dashboard(res, {
            view: 'edit',
            root: 'admin/modules',
            header: 'edit.header',
            title: result.name,
            subtitle: 'Módulos',
            data: {
                module: result,
                routes: routes.parse(result.routes),
                views: routes.parseViews(result.routes)
            }
        });
    }, function (err) {
        console.log(err);
    });

});

router.post('/edit/:id/create', function (req, res, next) {
    // process.kill(process.pid, 'SIGUSR2');
    modules().get(req.params.id).then(function (result) {
        routes.create(result.routes, { method: req.body.method, url: req.body.url, auth: req.body.auth }).then(function (route) {
            res.json(route);
        }, function (err) {
            console.log(err);
        })
    }, function (err) {
        console.log(err);
    });
});


module.exports = router;