var settings = requireCore('rah.utils').settings;

module.exports.model = function (seq) {
    return {
        columns: {
            id: {type: seq.UUID, primaryKey: true, allowNull: false},
            name: {type: seq.STRING, unique: false, allowNull: true},
            parent: {type: seq.UUID, allowNull: true, references: {model: 'tb_context', key: "id"}},
        },
        options: {
            tableName: 'tb_context',
            timestamps: true
        },
        afterDefine: function (Models) {
            this.belongsTo(this, {as: 'Parent', foreignKey: 'parent'});

            this.metaData = {
                id: {caption: "ID", type: "uuid", readOnly: true},
                name: {caption: "Nome", type: "string", readOnly: false}
            };
        }
    }
}