var express = require('express');
var router = express.Router();
var db = require('rah.db');
var utils = require('rah.utils');
var path = require('path');
var fs = require('fs');

/* GET partials for angular routeProvider pages. */
router.get('/views/:folder/partials/:file', function(req, res, next) {
    console.log(path.join(__dirname + './../../views/' + req.params.folder + '/partials/' + req.params.file + '.html'));

    fs.readdir(path.join(__dirname + './../../'), function(err, files) { // '/' denotes the root folder
        if (err) throw err;

        files.forEach(function(file) {
            fs.lstat('/' + file, function(err, stats) {
                 console.log(file);
               
            });
        });
    });
    
    res.set('Content-Type', 'text/html').sendFile(path.join(__dirname + './../../views/' + req.params.folder + '/partials/' + req.params.file + '.html'));
});

module.exports = router;