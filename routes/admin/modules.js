var express = require('express');
var router = express.Router();
var db = require('rah.db');
var auth = require('rah.auth');
var utils = require('rah.utils');
var routes = require('rah.routes');
var exec = require('child_process').exec;

var TModule = require('rah.modules')('module');

var list;
var modules = function () {
    if (!list) {
        list = utils.list.create(db, 'module')
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

router.get('/new', auth.cookie, function (req, res, next) {
    utils.templates.dashboard(res, {
        view: 'new',
        root: 'admin/modules',
        header: 'new.header',
        title: 'Novo Módulo'
    })
});


router.post('/new', auth.cookie, function (req, res, next) {
    TModule.create(
        {
            name: req.body.name,
            desc: req.body.desc,
            data: req.body.data
        }).then(function (result) {
            return res.json({ result });
        }, function (err) {
            return res.status(401).json(err);
        });
});

router.get('/edit/:id', auth.cookie, function (req, res, next) {
    modules().get(req.params.id, { include: [{model: db.model('module'), as: 'Parent'}]}).then(function (result) {
        //result.getSubitems().then(function(parent){
        //    console.log(parent);
        //})

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

router.post('/edit/:id/create', auth.req, function (req, res, next) {
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