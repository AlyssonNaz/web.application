//define os métodos padrões da classe de um modelo;

module.exports = function (model) {
    var classMethods = model.options.classMethods;
    
    //inicializa as propriedades do modelo caso não estejam inicializadas
    if (!classMethods) {
        classMethods = {};
    }

    model.options.classMethods = classMethods;
}
