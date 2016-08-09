var express = require('express');
var router = express.Router();
var db = requireCore('rah.db');
var utils = requireCore('rah.utils');

/* GET login page. */
// router.get('/*', function (req, res, next) {
//     utils.templates.login(res, {
//         title: 'Login',
//     });
//     // res.render('auth/index', { pageTitle: 'SeuGarçom! | Login' });
// });

module.exports = router;