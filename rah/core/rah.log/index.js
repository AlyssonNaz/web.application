var colors = require('colors');

function formatLog(message) {
    return '[RAH][' + Date() + '] ' + message;
}

module.exports = {
    event: function (message) {
        console.log(formatLog(message).blue);
    },
    error: function (message) {
        console.log(formatLog(message).red);
    }
}