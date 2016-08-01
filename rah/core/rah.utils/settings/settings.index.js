var io = requireCore('rah.utils/io/io.index.js');

function requireSettings(){
    var settings = {};
    io.forEachDir(__dirname + '/settings', true, function(file, filePath){
        settings[file.replace('Settings.json', '')] = require(filePath);
    });
    return settings;
}

module.exports = requireSettings();