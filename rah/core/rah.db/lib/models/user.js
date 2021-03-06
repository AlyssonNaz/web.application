var settings = requireCore('rah.utils').settings;
var auth = requireCore('rah.auth');
var crypto = require('crypto');
var cryptoCore = requireCore('rah.utils').crypto;
var jwt = require('jsonwebtoken');

module.exports.model = function (seq) {
    return {
        columns: {
            //email do usuário
            email: {type: seq.STRING, unique: true, allowNull: false, caption: 'E-mail', readOnly: true},
            //nome de usuário
            username: {type: seq.STRING, unique: true, allowNull: false, caption: 'Usuário', readOnly: true},
            //salto da senha
            passowrd_salt: {type: seq.STRING, allowNull: false, private: true},
            //módulo pai (se houver)
            context_id: {
                type: seq.UUID,
                allowNull: false,
                caption: "Contexto",
                readOnly: false,
                references: {model: 'tb_context', key: "id"}
            },
            //campo de senha no formato hash
            password: {
                type: seq.STRING,
                allowNull: false,
                private: true,
                set: function (value) {
                    if (!value)
                        throw 'Invalid password';
                    //cria salt para decodificar o hash do password        
                    var salt = crypto.randomBytes(16).toString('hex');
                    //cria o hash do password junto com o salt para codificar o password
                    var hash = crypto.pbkdf2Sync(value, salt, 1000, 64).toString('hex');
                    //aramzena os valores nos campos
                    this.setDataValue('password', hash);
                    this.setDataValue('passowrd_salt', salt);
                }
            },
            //campo data (colunas dinâmicas)
            data: {
                type: seq.JSONB,
                allownull: true,
                fields: {
                    role: {
                        caption: 'Roles'
                    },
                    barContext: {
                        caption: 'barId'
                    }
                }
            },
        },
        options: {
            tableName: 'tb_user',
            timestamps: true,
            instanceMethods: {
                //valida se uma senha fornecida bate com a senha do banco de dados
                validPassword: function (password) {
                    var hash = crypto.pbkdf2Sync(password, this.passowrd_salt, 1000, 64).toString('hex');
                    return this.password === hash;
                },
                //gera o token para utilização na sessão
                generateToken: function () {
                    var today = new Date();
                    var exp = new Date();
                    exp.setDate(today.getDate() + 60);

                    var data = {
                        id: this.id,
                        username: this.username,
                        context: this.context_id,
                        barContext: this.barContext,
                        role: this.role
                    }

                    var encryptedData = cryptoCore.encrypt(JSON.stringify(data));

                    return jwt.sign({rahSecure: encryptedData}, settings.token.secret);
                }
            }
        },
        afterDefine: function (Models) {
            this.belongsTo(Models['context'], {as: 'Contexto', foreignKey: 'context_id'});
        }
    }
}