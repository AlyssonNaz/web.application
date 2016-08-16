var express = require('express');
var router = express.Router();
var db = requireCore('rah.db');
var TUser = requireCore('rah.modules')('user');

//MARK: Routes

//gera um token de autenticação para um usuário através do nome de usuário ou e-mail, e a senha
router.get('/:model/list', function (req, res, next) {
   var User = db.model(req.params.model);
    User.findAll().then(function (users) {
        res.json(users);
    }).catch(function (err) {
        res.status(404).json(err)
    });
});


module.exports = router;