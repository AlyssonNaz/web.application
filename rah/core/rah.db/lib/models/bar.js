var settings = requireCore('rah.utils').settings;
var uuid = require('node-uuid');


module.exports.model = function (seq) {
    return {
        columns: {
            id: {type: seq.UUID, primaryKey: true, allowNull: false, caption: 'Id', readOnly: true},
            name: {type: seq.STRING, unique: true, allowNull: false, caption: "Nome", readOnly: false},
        },
        options: {
            tableName: 'tb_bar',
            timestamps: true,
            classMethods: {
                beforeSave: function (fields) {
                    fields.id = uuid.v1();
                }
            }
        }
    }
}