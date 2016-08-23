var settings = requireCore('rah.utils').settings;

module.exports.model = function (seq) {
    return {
        columns: {
            name: {type: seq.STRING, unique: true, allowNull: false},
        },
        options: {
            tableName: 'tb_bars',
            timestamps: true
        },
        afterDefine: function (Models) {
            this.metaData = {
                id: {caption: "ID", type: "int", readOnly: true},
                name: {caption: "Nome", type: "string", readOnly: false}
            };
        }
    }
}