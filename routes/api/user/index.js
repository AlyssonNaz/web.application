var express = require('express');
var router = express.Router();
var db = requireCore('rah.db');

/* GET home page. */
router.post('/', function(req, res, next) {
  console.log(db.model('user'));
  res.end();
});

module.exports = router;