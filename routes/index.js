var express = require('express');
var router = express.Router();
var db = require('rah.db');
var utils = require('rah.utils');
var path = require('path');
var fs = require('fs');

/* GET partials for angular routeProvider pages. */
router.get('/views/:folder/partials/:file', function(req, res, next) {   
    console.log(process.env.ROOT_DIR);
    res.set('Content-Type', 'text/html').sendFile('/views/' + req.params.folder + '/partials/' + req.params.file + '.html',  { root: process.env.ROOT_DIR });
});

module.exports = router;