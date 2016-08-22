//define os métodos padrões da classe de um modelo;

module.exports = function (model) {
    var classMethods = model.options.classMethods;
    
    //inicializa as propriedades do modelo caso não estejam inicializadas
    if (!classMethods) {
        classMethods = {};
    }

    classMethods.publicFields = function(){
        var result = [];
        for (var col in this.tableAttributes)
        {
            if (!this.tableAttributes[col].private)
                result.push(col);
        }
        return result;
    }

    model.options.classMethods = classMethods;
}
