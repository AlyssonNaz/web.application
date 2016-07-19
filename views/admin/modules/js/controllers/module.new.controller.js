(function (angular) {
    var app = angular.module('seugarcom', ['ngRoute', 'ngCookies', 'ui.bootstrap']);

    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.
            when('/', {
                controller: 'rah.modules'
            })
    }]);

    app.controller('rah.modules.new', ['$scope', '$window', 'rah.fac.modules.new', function ($scope, $window, $modules) {
        $scope.newModule = {
            name: 'aaaaa',
            desc: '',
            data: ''
        };

        $scope.createModule = function () {            
            $modules.createModule($scope.newModule).error(function (error) {
                $scope.error = error;
            }).then(function (data) {
                console.log(data.data);
            });
        }
    }]);
} (angular));