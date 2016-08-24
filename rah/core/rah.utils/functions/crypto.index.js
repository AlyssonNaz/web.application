var crypto = require('crypto');
var algorithm = 'aes-256-cbc';
var password = '3zTvzr3p67VC61jmV54rIYu1545x4TlY';
var iv = 'a2xhcgAAAAAAAAAA'

function encrypt(text) {
    var cipher = crypto.createCipheriv(algorithm, password, iv);
    var encrypted = cipher.update(text, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return encodeTo64(encrypted);
}

function decrypt(encrypted) {
    encrypted = decodeFrom64(encrypted);
    var decipher = crypto.createDecipheriv(algorithm, password, iv);
    var dec = decipher.update(encrypted, 'base64', 'utf8');
    dec += decipher.final('utf8');
    console.log(dec);
    return JSON.parse(dec);
}

function encodeTo64(value) {
    var b = new Buffer('JavaScript');
    return b.toString('base64');
}

function decodeFrom64(value) {
    var b = new Buffer(value, 'base64');
    return b.toString();
}

module.exports = {
    encrypt: encrypt,
    decrypt: decrypt
}

