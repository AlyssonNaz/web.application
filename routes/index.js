var express = require('express');
var router = express.Router();
var db = require('rah.db');
var path = require('path');

/* GET partials for angular routeProvider pages. */
router.get('/views/:folder/partials/:file', function (req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    
    res.set('Content-Type', 'text/html').sendFile(path.join(__dirname + './../../views/'+req.params.folder +'/partials/'+ req.params.file+'.html'));
});

module.exports = router;