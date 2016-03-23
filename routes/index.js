var express = require('express');
var router = express.Router();
var db = require('rah.db');
var utils = require('rah.utils');
var path = require('path');

/* GET partials for angular routeProvider pages. */
router.get('/views/:folder/partials/:file', function (req, res, next) {
    console.log(path.join(__dirname + './../../views/'+req.params.folder +'/partials/'+ req.params.file+'.html'));
    
    utils.io.forEachDir('/../../views/', true, function (file, filePath) {
            console.log(filePath);
        });
    res.set('Content-Type', 'text/html').sendFile(path.join(__dirname + './../../views/'+req.params.folder +'/partials/'+ req.params.file+'.html'));
});

module.exports = router;