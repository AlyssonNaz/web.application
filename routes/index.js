var express = require('express');
var router = express.Router();
var db = require('rah.db');
var path = require('path');

/* GET partials for angular routeProvider pages. */
router.get('/views/:folder/partials/:file', function (req, res, next) {
    Console.log(path.join(__dirname + './../../views/'+req.params.folder +'/partials/'+ req.params.file+'.html'));
    res.set('Content-Type', 'text/html').sendFile(path.join(__dirname + './../../views/'+req.params.folder +'/partials/'+ req.params.file+'.html'));
});

module.exports = router;