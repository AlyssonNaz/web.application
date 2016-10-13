define([
    'app'
], function (app) {
    return app.factory('form', ['$http', '$route', function ($http, $route) {

        var coreModel = {};
        var apiModelUrl = function (model) {
            return '/api/model/' + model + '/';
        };

        coreModel.isNew = $route.current.params.id == 'new';

        coreModel.get = function (model, id) {
            return $http.post(apiModelUrl(model) + (id ? id : $route.current.params.id));
        };

        coreModel.create = function (model, data) {
            return $http.post(apiModelUrl(model) + 'new', data);
        };

        coreModel.save = function (model, data, id) {
            return $http.put(apiModelUrl(model) + (id ? id : $route.current.params.id), data)
        };

        coreModel.saveOrCreate = function (model, data, id) {
            return coreModel.isNew
                ? coreModel.create(model, data)
                : coreModel.save(model, data, id);
        }

        return coreModel
    }])
});

