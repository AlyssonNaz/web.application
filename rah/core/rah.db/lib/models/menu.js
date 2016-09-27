var settings = requireCore('rah.utils').settings;
var uuid = require('node-uuid');

module.exports.model = function (seq) {
    return {
        columns: {
            id: {type: seq.UUID, primaryKey: true, allowNull: false, caption: 'Id', readOnly: true},
            name: {type: seq.STRING, unique: false, allowNull: false, caption: 'Nome', readOnly: false},
            path: {type: seq.STRING, unique: false, allowNull: false, caption: 'Caminho', readOnly: false},
            parent: {
                type: seq.UUID,
                allowNull: true,
                caption: 'Menu Pai',
                readOnly: false,
                references: {model: 'tb_menu', key: "id"}
            },
            data: {
                type: seq.JSONB,
                allownull: true,
                fields: [{
                    name: 'modules',

                },
                    {
                        name: 'context'
                    }]
            },
        },
        options: {
            tableName: 'tb_menu',
            timestamps: true,
            classMethods: {
                beforeSave: function (fields) {
                    fields.id = uuid.v1();
                }
            }
        },
        afterDefine: function (Models) {
            this.belongsTo(this, {as: 'Parent', foreignKey: 'parent'});
        }
    }
}