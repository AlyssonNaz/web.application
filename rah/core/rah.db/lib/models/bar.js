var settings = requireCore('rah.utils').settings;

module.exports.model = function (seq) {
    return {
        columns: {
            name: {type: seq.STRING, unique: true, allowNull: false, caption: "Nome", readOnly: false},
        },
        options: {
            tableName: 'tb_bars',
            timestamps: true
        }
    }
}