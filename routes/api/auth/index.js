var express = require('express');
var router = express.Router();
var db = require('rah.db');
var auth = require('rah.auth');
var TUser = require('rah.modules')('user');

//MARK: Routes

//gera um token de autenticação para um usuário através do nome de usuário ou e-mail, e a senha
router.post('/', auth.crypto, function (req, res, next) {
    return Login(res, req.body.username, req.body.password);
});

//cria um novo usuário com token
router.post('/register', auth.crypto, function (req, res, next) {    
    Register(res, req.body.email, req.body.username, req.body.password);
});

//MARK: Methods
function Login(res, username, password) {
    if (!username)
        return res.status(400).json({ error: 'Usuário não informado.'});

    if (!password)
        return res.status(400).json({ error: 'Senha não informada.' });

    TUser.authenticate(
        {
            username: username,
            password: password
        }
    ).then(function (token) {
        return res.json({ token });
    }, function (err) {
        return res.status(401).json(err);
    });    
}

function Register(res, email, username, password) {
    TUser.create(
        {
            username: username,
            email: email,
            password: password
        }).then(function (token) {
            return res.json({ token });
        }, function (err) {
            return res.status(401).json(err);
        });
}

module.exports = router;