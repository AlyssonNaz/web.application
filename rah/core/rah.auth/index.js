var jwt = require('express-jwt');
var settings = requireCore('rah.utils').settings;
var crypto = requireCore('rah.utils').crypto;

function createToken(data) {
    var token = jwt.sign({ data }, settings.token.secret);
    return token;
}

function validToken(type, module) {
    return jwt(
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
    req: validToken('header'),
    cookie: validToken('cookie'),
    crypto: validCrypto
}