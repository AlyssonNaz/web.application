var express = require('express');
var router = express.Router();
var db = require('rah.db');
var path = require('path');

/* GET login page. */
router.get('/*', function (req, res, next) {
    // res.set('Content-Type', 'text/html').sendFile(path.join(__dirname + '../../../public/views/auth/index.html'));
    res.render('auth/index', { pageTitle: 'Seu Garçom! | Login' });

});

module.exports = router;