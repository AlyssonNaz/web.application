var express = require('express');
var router = express.Router();
var db = requireCore('rah.db');
var TUser = requireCore('rah.modules')('user');

router.post('/:model/list', function (req, res, next) {
   var User = db.model(req.params.model);
    User.findAll().then(function (users) {
        res.json({ "metadata": User.metaData, "itens": users});
    }).catch(function (err) {
        res.status(404).json(err)
    });
});

router.post('/:model/:id', function (req, res, next) {
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

router.post('/:model/new', function (req, res, next) {
   var User = db.model(req.params.model);
    User.create(req.body).then(function (user) {
        res.json(user);
    }).catch(function (err) {
        res.status(404).json(err)
    });
});

router.put('/:model/:id', function (req, res, next) {
   var User = db.model(req.params.model);
   User.update(req.body, { where: { id: req.params.id }}).then(function (users) {
        res.json(users);
    }).catch(function (err) {
        res.status(404).json(err)
    });
});



module.exports = router;