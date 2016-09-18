var express = require('express');
var router = express.Router();
var db = requireCore('rah.db');
var auth = requireCore('rah.auth');

router.post('/:model/list', auth.req, function (req, res, next) {
   var User = db.model(req.params.model);
    User.findAll().then(function (users) {
        res.json({ "metadata": User.metaData, "itens": users});
    }).catch(function (err) {
        res.status(404).json(err)
    });
});

router.post('/:model/info', auth.req, function (req, res, next) {
    var model = db.model(req.params.model);
    if (model)
        res.json({"metadata": model.metaData});
    else
        res.status(404).json({err: "Ivalid model name"});

});

router.post('/:model/:id', auth.req, function (req, res, next) {
    if(req.params.id == 'new')
        return next();

   var User = db.model(req.params.model);
    User.findOne({ 
        where: { id: req.params.id },
        attributes: User.publicFields()
     }).then(function (users) {
        res.json(users);
    }).catch(function (err) {
        res.status(404).json(err)
    });
});

router.post('/:model/new', auth.req, function (req, res, next) {
   var User = db.model(req.params.model);

    if (User.beforeSave)
        User.beforeSave(req.body);

    User.create(req.body).then(function (user) {
        res.json(user);
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