//define os métodos padrões de uma instância da classe de um modelo;

module.exports = function (model) {
    var instanceMethods = model.options.instanceMethods;
    
    //inicializa as propriedades do modelo caso não estejam inicializadas
    if (!instanceMethods) {
        instanceMethods = {};
    }

    // instanceMethods.

    model.options.instanceMethods = instanceMethods;
}
