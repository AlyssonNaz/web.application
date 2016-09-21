var settings = requireCore('rah.utils').settings;

module.exports.model = function (seq) {
    return {
        columns: {
            id: {type: seq.INTEGER, unique: true, allowNull: false, primaryKey: true, caption: "Id"},
            //nome do módulo
            name: {type: seq.STRING, unique: true, allowNull: false, caption: "Nome", readOnly: false},
            //decrição do módulo
            desc: {type: seq.STRING, unique: true, allowNull: false, caption: "Descrição", readOnly: false},
            //módulo pai (se houver)
            parent: {
                type: seq.INTEGER,
                allowNull: true,
                caption: "Módulo Pai",
                readOnly: false,
                references: {model: 'tb_modules', key: "id"}
            },
            data: {
                type: seq.JSONB,
                fields: [{
                    //diretório das rotas (admin/modules.js)
                    name: 'routes'
                }]
            }
        },
        options: {
            tableName: 'tb_modules', 
            timestamps: true
        },
        afterDefine: function(Models){
            this.belongsTo(this, { as: 'Parent', foreignKey: 'parent'});
        }
    }
}