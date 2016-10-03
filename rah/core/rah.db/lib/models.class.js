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
            if (this.tableAttributes[col].private)
                continue;

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

    classMethods.filterContext = function (where, rahSecure) {
        model.forEachColumns(function (column, columnName, isDataField) {
            var fieldName = isDataField ? 'data.' + columnName : columnName;

            if (column.rahContext)
                where[fieldName] = rahSecure.context;
            else if (column.rahBarContext)
                where[fieldName] = rahSecure.barContext;
        });
    }

    classMethods.setContext = function (newModel, rahSecure) {
        model.forEachColumns(function (column, columnName, isDataField) {
            if (isDataField) {
                if (!newModel['data'])
                    newModel['data'] = {};

                if (column.rahContext)
                    newModel['data'][columnName] = rahSecure.context;
                else if (column.rahBarContext)
                    newModel['data'][columnName] = rahSecure.barContext;
            }
            else {
                if (column.rahContext)
                    newModel[columnName] = rahSecure.context;
                else if (column.rahBarContext)
                    newModel[columnName] = rahSecure.barContext;
            }
        });
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
