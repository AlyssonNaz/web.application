var express = require('express');
var router = express.Router();
var db = require('rah.db');
var TUser = require('rah.modules')('user');

//gera um token de autenticação para um usuário através do nome de usuário ou e-mail, e a senha
router.post('/', function (req, res, next) {
    if (!req.body.username)
        return res.status(400).json({ error: 'Usuário não informado.' });
    
    if (!req.body.password)
        return res.status(400).json({ error: 'Senha não informada.' });

    TUser.authenticate(
        {
            username: req.body.username,
            password: req.body.password
        }
        ).then(function (token) {
            return res.json({ token });
        }, function (err) {
            return res.status(401).json(err);
        });
});

//cria um novo usuário com token
router.post('/register', function (req, res, next) {
    TUser.create(
        {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        }).then(function (token) {
            return res.json({ token });
        }, function (err) {
            return res.status(401).json(err);
        });
});

module.exports = router;