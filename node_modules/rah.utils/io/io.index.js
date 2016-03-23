var fs = require('fs');

function forEachDir(path, allowSubDir, callback) {
    fs.readdirSync(path).forEach(function (file) {
        var filepath = path + '/' + file;
        if (allowSubDir && fs.statSync(filepath).isDirectory()) {
            forEachDir(filepath, allowSubDir, callback);
        }
        else {
            callback(file, filepath);
        }
    });
}

module.exports = {
    forEachDir
}
