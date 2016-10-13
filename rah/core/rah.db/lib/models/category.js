var settings = requireCore('rah.utils').settings;
var uuid = require('node-uuid');

module.exports.model = function (seq) {
    return {
        columns: {
            id: {type: seq.UUID, primaryKey: true, allowNull: false, caption: 'Id', readOnly: true},

            //campo data (colunas dinâmicas)
            data: {
                type: seq.JSONB,
                allownull: true,
                fields: {
                    name: {type: seq.STRING, unique: false, allowNull: false, caption: 'Nome', readOnly: false},
                    description: {
                        type: seq.STRING,
                        unique: false,
                        allowNull: false,
                        caption: 'Descrição',
                        readOnly: false
                    }
                },
            },
        },

        options: {
            tableName: 'tb_category',
            timestamps: true,
            classMethods: {
                beforeSave: function (fields) {
                    fields.id = uuid.v1();
                }
            }
        }
    }
}