var fs = require('fs');
var utils = requireCore('rah.utils');

var baseMethods = require('./models.base');
var classMethods = require('./models.class');
var instanceMethods = require('./models.instance');

var Models = {};

function addModel(file, Seq, sequelize) {
    var modelname = file.replace('.js', '');
	
    // TODO ... implementar verificacao se ja nao existe o modelo carregado
    //obtém o modelo de acordo com o caminho especificado
    var model = require(utils.settings.models.modelsPath + '/' + file).model(Seq);
    
    //configura os métodos da base do modelo
    baseMethods(model);
    
    //configura os métodos da classe do modelo
    classMethods(model);
    
    //configura os métodos da instancia do modelo
    instanceMethods(model);
    
    //armazena o modelo em cache e registra no sequelize
    Models[modelname] = sequelize.define(modelname, model.columns, model.options);

    Models[modelname].afterDefine = model.afterDefine;
}

module.exports = {
    create: function (Seq, sequelize) {
        utils.io.forEachDir(utils.settings.models.rootPath + utils.settings.models.modelsPath, true, function (file, filePath) {
            if (file == "index.js") return;
            addModel(file, Seq, sequelize);
        });

        for(var model in Models){
            if (Models[model].afterDefine)
                Models[model].afterDefine(Models);
        }
    },
    getModel: function (model, Seq, sequelize) {
        var _model = Models[model];
        if (!_model) {
            throw 'Modelo não existe!';
        }

        return _model;
    }
}
