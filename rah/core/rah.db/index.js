
//TODO: Passar strings de configuração para utilizar criptografia
var env = process.env.NODE_ENV || 'development';
var config = require('./lib/config/config.json')[env];

var Sequelize = require('sequelize');
    
var sequelize = new Sequelize(config.database, config.username, config.password, config);

var Models = require('./lib/models')
var Migrations = require('./lib/migrations')


require('pg').types.setTypeParser(1114, function (stringValue) {
    return new Date(stringValue + "+3000");
    // e.g., UTC offset. Use any offset that you would like.
});

function connect(callback, error) {
    sequelize.authenticate()
        .then(function (err) {
            callback(err);
        }, function (err) {
            error(err);
        });
}

connect(function () {
    Migrations.sync(Sequelize, sequelize, Models);
}, function(e) {
    throw e
});

module.exports = {
    //connec to database
    connect: connect,
    model: function (model) {
        return Models.getModel(model, Sequelize, sequelize);
    }
}