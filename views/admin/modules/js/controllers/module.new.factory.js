(function (angular) {
    var app = angular.module('seugarcom');

    app.factory('rah.fac.modules.new', ['$http', '$window', function ($http, $window) {
        var module = {}

        module.createModule = function (newModule) {
            return $http.post($window.location.pathname, newModule);
        };

        return module;
    }])
} (angular))


