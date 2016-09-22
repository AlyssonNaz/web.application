var express = require('express');
var router = express.Router();
var auth = requireCore('rah.auth');


router.post('/', auth.req, function (req, res, next) {
    res.json({"metadata": 'lalala'});
});

module.exports = router;
