(function (angular) {
    var app = angular.module('seugarcom', ['ngRoute', 'ngCookies']);

    app.config(['$routeProvider', '$locationProvider',
        function ($routeProvider, $locationProvider) {
            $routeProvider
                .when('/auth/login', {
                    controller: 'rah.auth',
                    templateUrl: '../views/auth/partials/login'
                })
                .when('/auth/register', {
                    controller: 'rah.auth',
                    templateUrl: '../views/auth/partials/register'
                })

                .otherwise({ redirectTo: '/auth/login' });

            $locationProvider.html5Mode(true).hashPrefix('!');
        }]).
        run(['$rootScope', '$location', '$window', 'auth', function ($rootScope, $location, $window, auth) {
            $rootScope.$on("$routeChangeStart", function (event, next, current) {
                if (auth.isLoggedIn()) {
                    $window.location.href = '/dashboard';
                }
            });
        }]);

    app.controller('rah.auth', ['$scope', '$window', 'auth', function ($scope, $window, auth) {
        $scope.user = {};

        angular.element(document).find('input').iCheck({
            checkboxClass: 'icheckbox_square-blue',
            radioClass: 'iradio_square-blue',
            increaseArea: '20%' // optional
        });

        $scope.register = function () {
            auth.register($scope.user).error(function (error) {
                $scope.error = error;
            }).then(function () {
                $window.location.href = '/dashboard';
            });
        };

        $scope.logIn = function () {
            auth.logIn($scope.user).error(function (error) {
                $scope.error = error;
            }).then(function () {
                $window.location.href = '/dashboard';
            });
        };
    }])
} (angular));