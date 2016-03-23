(function (angular) {
    var app = angular.module('seugarcom');

    app.factory('rah.fac.modules', ['$http', '$window', function ($http, $window) {
        var module = {}

        module.getId = function () {
            var pathData = $window.location.pathname.split('/');

            if (pathData[pathData.length - 1].length == 0)
                return parseInt(pathData[pathData.length - 2]);

            return parseInt(pathData[pathData.length - 1]);
        }

        module.createRoute = function (route) {
            return $http.post($window.location.pathname + '/create', route);
        };

        module.loadView = function (id) {
            return $http.post($window.location.pathname + '/view/'+ id);
        };

        return module;
    }])
} (angular))


