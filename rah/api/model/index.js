var express = require('express');
var router = express.Router();
var db = requireCore('rah.db');
var auth = requireCore('rah.auth');

router.post('/:model/info', auth.req, function (req, res, next) {
    var model = db.model(req.params.model);
    if (model)
        res.json({"metadata": model.metaData()});
    else
        res.status(404).json({err: "Ivalid model name"});

});

router.post('/:model/new', auth.req, function (req, res, next) {
    var TModel = db.model(req.params.model);

    if (TModel.beforeSave)
        TModel.beforeSave(req.body);

    TModel.setContext(req.body, req.token.rahSecure);

    TModel.create(req.body).then(function (user) {
        res.json(user);
    }).catch(function (err) {
        res.status(404).json(err)
    });
});

router.post('/:model/list', auth.req, function (req, res, next) {
    var TModel = db.model(req.params.model);

    var options = {
        where: {},
        attributes: TModel.publicFields() //não permite selecionar campos privados
    };

    //permite que uma instancia filtre pelo contexto
    TModel.filterContext(options.where, req.token.rahSecure);

    TModel.findAll(options).then(function (items) {
        res.json({"metadata": TModel.metaData(), "itens": items});
    }).catch(function (err) {
        res.status(404).json(err)
    });
});

router.post('/:model/:id', auth.req, function (req, res, next) {
    var TModel = db.model(req.params.model);

    var options = {
        where: {},
        attributes: TModel.publicFields() //não permite selecionar campos privados
    };

    //permite que uma instancia filtre pelo contexto
    TModel.filterContext(options.where, req.token.rahSecure);

    //adiciona por padrão a clausula de where
    options.where.id = req.params.id;

    TModel.findOne(options).then(function (items) {
        res.json(items);
    }).catch(function (err) {
        res.status(404).json(err)
    });
});

router.put('/:model/:id', auth.req, function (req, res, next) {
   var User = db.model(req.params.model);
   User.update(req.body, { where: { id: req.params.id }}).then(function (users) {
        res.json(users);
    }).catch(function (err) {
        res.status(404).json(err)
    });
});


module.exports = router;