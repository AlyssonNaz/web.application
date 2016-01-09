var express = require('express');
var router = express.Router();
var db = require('rah.db');
var jwt = require('express-jwt');

var auth = jwt(
    {
        secret: 'SECRET',
        getToken: function (req) {
            console.log(req);
            return req.headers['x-access-token'];
        }
    });

//gera um token de autenticação para um usuário através do nome de usuário ou e-mail, e a senha
router.post('/', function (req, res, next) {
    if (!req.body.username || !req.body.password) {
        return res.status(400).json({ message: 'Please fill out all fields' });
    }
    var User = db.model('user');

    User.findOne({ where: { username: req.body.username } }).then(function (user) {
        if (user.validPassword(req.body.password))
            return res.json({ token: user.generateToken() });
        else
            return res.status(400).json({ message: 'Invalid Password' });
    }).catch(function (err) {
        return res.status(401).json(err);
    });
});

//gera um cadastro com token para um novo usuário
router.post('/register', function (req, res, next) {
    var User = db.model('user');
    
    console.log(req.body.email);
    console.log(req.body.username);
    console.log(req.body.password);
    
    User.create({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    }).then(function (user) {
        console.log('aqui');
        return res.json({ token: user.generateToken() });
    }).catch(function (err) {
        return res.status(401).json(err);
    });

});
// 
// router.post('/verify', auth, function (req, res, next) {
//     res.end(JSON.stringify({ success: true }));
// });



module.exports = router;