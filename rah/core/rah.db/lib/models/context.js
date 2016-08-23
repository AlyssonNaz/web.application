var settings = requireCore('rah.utils').settings;

module.exports.model = function (seq) {
    return {
        columns: {
            id: {type: seq.UUID, primaryKey: true, allowNull: false},
            name: {type: seq.STRING, unique: false, allowNull: true}
        },
        options: {
            tableName: 'tb_context',
            timestamps: true
        },
        afterDefine: function (Models) {
            this.metaData = {
                id: {caption: "ID", type: "uuid", readOnly: true},
                name: {caption: "Nome", type: "string", readOnly: false}
            };
        }
    }
}