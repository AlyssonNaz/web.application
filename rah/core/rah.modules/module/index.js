var db = requireCore('rah.db');

module.exports = {    
    create: function (model) {
        //validar campos, lowercase
        return new Promise(function (resolve, reject) {
            var Module = db.model('module');

            Module.create({
                name: model.name,
                desc: model.desc,
                data: model.data
            }).then(function (result) {
                resolve(result);
            }).catch(function (err) {
                reject(Error(err));
            });
        })
    }
}