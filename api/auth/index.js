var express = require('express');
var router = express.Router();
var db = require('rah.db');
var TAuth = require('rah.modules/auth');

//gera um token de autenticação para um usuário através do nome de usuário ou e-mail, e a senha
router.post('/', function (req, res, next) {
    if (!req.body.username || !req.body.password) {
        return res.status(400).json({ message: 'Please fill out all fields' });
    }

    TAuth.login(
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

//gera um cadastro com token para um novo usuário
router.post('/register', function (req, res, next) {
    TAuth.register(
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