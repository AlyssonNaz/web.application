var jwtExpress = require('express-jwt');
var jwt = require('jsonwebtoken');
var settings = requireCore('rah.utils').settings;
var crypto = requireCore('rah.utils').crypto;

function createToken(data) {
    var token = jwt.sign({data: data}, settings.token.secret);
    return token;
}

function validToken(type, module) {
    return jwtExpress(
        {
            secret: settings.token.secret,
            getToken: function (req) {
                var token = null;
                switch (type) {
                    case 'header':
                        token = req.headers['x-access-token'];
                    case 'cookie':
                        token = req.cookies['x-access-token'];
                }

                return token;
            }
        });
}

var corsOptionsDelegate = function(req, callback){
  var corsOptions;
  corsOptions = { origin: false }; // reflect (enable) the requested origin in the CORS response  
  callback(null, corsOptions); // callback expects two parameters: error and options
};


function validCrypto(req, res, next) {
    if (req.body.crypto) {
        req.body = crypto.decrypt(req.body.crypto);
        console.log(req.body);
    }
    next();
}

module.exports = {
    createToken: function (data) { return createToken(data); },
    req: function (req, res, next) {
        jwt.verify(req.headers['x-access-token'], settings.token.secret, function (err, decoded) {
            if (err) {
                return res.status(500).json({success: false, message: 'HAHAHA... Onde está sua autorização? hein?'});
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });
    },
    cookie: validToken('cookie'),
    crypto: validCrypto
}