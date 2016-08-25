var settings = requireCore('rah.utils').settings;
var uuid = require('node-uuid');

module.exports.model = function (seq) {
    return {
        columns: {
            name: {type: seq.STRING, unique: true, allowNull: false},
            code: {type: seq.UUID, unique: true, allowNull: false},
        },
        options: {
            tableName: 'tb_table',
            timestamps: true,
            classMethods: {
                beforeSave: function (fields) {
                    fields.code = uuid.v1();
                }
            }
        },
        afterDefine: function (Models) {
            this.metaData = {
                id: {caption: "ID", type: "int", readOnly: true},
                name: {caption: "Nome", type: "string", readOnly: false},
                code: {caption: "Código", type: "string", readOnly: false}
            };
        }
    }
}