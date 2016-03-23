(function (angular) {
    var app = angular.module('seugarcom', ['ngRoute', 'ngCookies', 'ui.bootstrap']);

    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.
            when('/:id', {
                controller: 'rah.modules'
            })
    }]);

    app.controller('rah.modules', ['$scope', '$window', 'rah.fac.modules', function ($scope, $window, $modules) {
        $scope.route = {
            url: '/',
            method: 'get',
            auth: 'auth.cookie'
        };

        $scope.createRoute = function () {
            $modules.createRoute($scope.route).error(function (error) {
                $scope.error = error;
            }).then(function (data) {
                console.log(data.data);
            });
        }

        $scope.loadView = function (id) {
            $modules.loadView(id).error(function (error) {
                $scope.error = error;
            }).then(function (data) {
                console.log(data.data);
            });
        }
    }]);

    // app.directive("ngModal", ["$interval", function ($interval) {
    //     return {
    //         restrict: "A",
    //         link: function (scope, elem, attrs) {
    //             //On click
    //             $(elem).click(function () {
    //                 console.log('teste');
    //             });
    //         }
    //     }
    // }]);
} (angular));