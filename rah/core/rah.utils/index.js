var io = requireCore('rah.utils/io/io.index.js');

function requireModules() {
    var modules = {};
    io.forEachDir(__dirname, true, function (file, filePath) {
        if (file.indexOf('.index.js') > -1) {
            modules[file.replace('.index.js', '')] = require(filePath);
        }
    });
    return modules;
}

module.exports = requireModules();

