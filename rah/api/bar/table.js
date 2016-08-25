var express = require('express');
var router = express.Router();
var auth = requireCore('rah.auth');
var qr = require('qr-image');

router.post('/qr-code/:id', function (req, res) {
    var qr_svg = qr.image(req.params.id, {type: 'svg'});
    //qr_svg.pipe(require('fs').createWriteStream('i_love_qr.svg'));
    //res.writeHead(200, {'Content-Type': 'image/svg'});
    qr_svg.pipe(res);
});


module.exports = router;