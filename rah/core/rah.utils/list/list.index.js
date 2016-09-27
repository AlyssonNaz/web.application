
var int = requireCore('rah.utils/functions/int.index.js');


function get(model, id, opt) {
    return new Promise(function (resolve, reject) {
        id = int.TryParseInt(id, null);
        if (id === null) return reject('[RAH] Invalid Id');

        if (!opt)
            opt = {};

        opt.where = { id: id };

        model.findOne(opt).then(function (result) {
            resolve(result);
        }).catch(function (err) {
            reject(Error(err));
        });
    });
};

function getAll(model) {
    return new Promise(function (resolve, reject) {
        model.findAll().then(function (result) {
            resolve(result);
        }).catch(function (err) {
            reject(Error(err));
        });
    });
};

function create(db, modelName) {
    var model = db.model(modelName);

    return {
        get: function (id, opt) { return get(model, id, opt) },
        getAll: function () { return getAll(model) }
    }
}


module.exports = {
    create: create
}