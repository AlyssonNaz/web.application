var settings = requireCore('rah.utils').settings;
var uuid = require('node-uuid');

module.exports.model = function (seq) {
    return {
        columns: {
            name: {type: seq.STRING, unique: true, allowNull: false, caption: "Nome", readOnly: false},
            code: {type: seq.UUID, unique: true, allowNull: false, caption: "Código", readOnly: false}
        },
        options: {
            tableName: 'tb_table',
            timestamps: true,
            classMethods: {
                beforeSave: function (fields) {
                    fields.code = uuid.v1();
                }
            }
        }
    }
}