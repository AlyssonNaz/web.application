var db = requireCore('rah.db');
var utils = requireCore('rah.utils');

module.exports = {
    authenticate: function (model) {
        //validar campos, lowercase
        return new Promise(function (resolve, reject) {
            var User = db.model('user');

            User.findOne({ where: { username: model.username } })
                .then(function (user) {
                    if (user && user.validPassword(model.password))
                        resolve(user.generateToken());
                    else
                        reject(Error("Invalid username or password"));
                }).catch(function (err) {
                    reject(Error(err));
                });
        });
    },
    create: function (model) {
        //validar campos, lowercase
        return new Promise(function (resolve, reject) {
            var User = db.model('user');

            User.create({
                email: model.email,
                username: model.username,
                password: model.password
            }).then(function (user) {
                resolve(user.generateToken());
            }).catch(function (err) {
                reject(Error(err));
            });
        })
    }
    // get(id) {
    //     return new Promise(function (resolve, reject) {
    //         id = utils.int.TryParseInt(id, null);
    //         if (id === null) return reject('Código do usuário inválido!');
    //
    //         var User = db.model('user');
    //         User.findOne({ where: { id: id } }).then(function (user) {
    //             resolve(user);
    //         }).catch(function (err) {
    //             reject(Error(err));
    //         });
    //     });
    // },
    // getAll: function () {
    //     return new Promise(function (resolve, reject) {
    //         var User = db.model('user');
    //         User.findAll().then(function (users) {
    //             resolve(users);
    //         }).catch(function (err) {
    //             reject(Error(err));
    //         });
    //     });
    // }
}