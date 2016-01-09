//define os métodos padrões da base de um modelo;

//cria um método de set para obter um campo dinâmico do modelo
function buildSetterMethod(column) {
    return function (value) {
        var data = this.getDataValue('data') || {}
        data[column] = value;
        this.setDataValue('data', data);
    };
}

//cria um método de get para atribuir um valor à um campo dinâmico do modelo
function buildGetterMethod(column) {
    return function () {
        var data = this.data || {}
        return data[column];
    };
}

module.exports = function (model) {

    //cria hop para percorrer todas as colunas
    model.forEachColumns = function (callback) {
        for (var column in model.columns) {
            //chama o método passado como parâmetro
            callback(model.columns[column]);
        }
    }
    
    //percorre as colunas dinâmincas para criar os métodos de get e set 
    model.forEachColumns(function (column) {
        //se a coluna for do tipo dinâmico deve percorrer o campo fields
        if (column.type.key == 'JSONB' && column.fields) {
            //se não houver métodos de get configurados inicia a variável
            if (!model.options.getterMethods)
                model.options.getterMethods = {}

            //se não houver métodos de set configurados inicia a variável
            if (!model.options.setterMethods)
                model.options.setterMethods = {};

            //para cada campo dinâmico do modelo, cria um método de get e set
            column.fields.forEach(function (field) {
                model.options.getterMethods[field.name] = buildGetterMethod(field.name);
                model.options.setterMethods[field.name] = buildSetterMethod(field.name);
            });
        }
    });

}
