(function (angular) {
    var app = angular.module('seugarcom', ['ngRoute', 'ngCookies']);


    // app.config(['$routeProvider', '$locationProvider',
    //     function ($routeProvider, $locationProvider) {
    //         $routeProvider
    //             .when('/dashboard', {
    //                 controller: 'rah.dashboard',
    //             })
    //             .otherwise({
    //                 controller: function ($http) {
    //                     console.log(window.location);
    //                     return $http.get(window.location.path).success(function (data) {
    //                     });
    //                 },
    //                 template: "<div></div>"
    //             });
    //         $locationProvider.html5Mode(true).hashPrefix('!');
    //     }]).
    //     run(['$rootScope', '$location', '$window', 'auth', function ($rootScope, $location, $window, auth) {
    //         $rootScope.$on("$routeChangeStart", function (event, next, current) {
    //             if (!auth.isLoggedIn()) {
    //                 $window.location.href = '/auth';
    //             }
    //         });
    //     }]);

    app.controller('rah.dashboard', ['$scope', '$window', 'auth', function ($scope, $window, auth) {
        if (!auth.isLoggedIn()) {
            $window.location.href = '/auth';
        }

        $scope.logOut = function () {
            auth.logOut();
            $window.location.href = '/auth';
        }
    }])
} (angular));