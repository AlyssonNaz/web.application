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
                    barContextId: {caption: 'barId'},
                    categoryId: {caption: 'Id da Categoria'},
                    name: {type: seq.STRING, unique: false, allowNull: false, caption: 'Nome', readOnly: false},
                    description: {
                        type: seq.STRING,
                        unique: false,
                        allowNull: false,
                        caption: 'Descrição',
                        readOnly: false
                    },
                    value: {type: seq.FLOAT, allowNull: true, caption: 'Preço'}
                },
            },
        },

        options: {
            tableName: 'tb_product',
            timestamps: true,
            classMethods: {
                beforeSave: function (fields) {
                    fields.id = uuid.v1();
                }
            }
        }
    }
}