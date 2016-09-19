//define os métodos padrões da classe de um modelo;

module.exports = function (model) {
    var classMethods = model.options.classMethods;

    //inicializa as propriedades do modelo caso não estejam inicializadas
    if (!classMethods) {
        classMethods = {};
    }

    //meta-data
    classMethods.metaData = function () {
        var info = {};

        for (var col in this.tableAttributes) {
            var column = this.tableAttributes[col];
            info[col] = {
                caption: column.caption,
                type: column.type.__proto__.__proto__.key,
                length: column.type._length,
                readOnly: column.readOnly,
                private: column.private,
                allowNull: column.allowNull,
                primaryKey: column.primaryKey,
                foreignKey: column.foreignKey
            };
        }
        return info;
    }


    classMethods.publicFields = function () {
        var result = [];
        for (var col in this.tableAttributes) {
            if (!this.tableAttributes[col].private)
                result.push(col);
        }
        return result;
    }

    model.options.classMethods = classMethods;
}
