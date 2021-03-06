define([], function()
{
    var app = angular.module('app', ['ngRoute', 'route-segment', 'view-segment']);

    return app.factory('auth', ['$http', '$window', '$location', function ($http, $window, $location) {
        var auth = {};

        auth.saveToken = function (token) {
            $window.localStorage['x-access-token'] = token;
            //$cookies.put('x-access-token', token);
        };

        auth.getToken = function () {
            return $window.localStorage['x-access-token'];
            // return $cookies.get('x-access-token');
        }

        auth.logOut = function () {
            $window.localStorage.removeItem('x-access-token');
            $window.localStorage.removeItem('gui.menus');
            $http.defaults.headers.common['x-access-token'] = '';
            $location.path("/auth/login");

        };

        auth.isLoggedIn = function () {
            var token = auth.getToken();
            if (token) {
                $http.defaults.headers.common['x-access-token'] = token;
                return true;
                // var payload = JSON.parse($window.atob(token.split('.')[1]));
                // return payload;
            } else {
                return false;
            }
        };

        auth.currentUser = function () {
            if (auth.isLoggedIn()) {
                var token = auth.getToken();
                var payload = JSON.parse($window.atob(token.split('.')[1]));

                return payload.username;
            }
        };

        auth.register = function (user) {
            return $http.post('/api/auth/register', user).success(function (data) {
                auth.saveToken(data.token);
            });
        };

        auth.logIn = function (user) {
            return $http.post('/api/auth', user).success(function (data) {
                auth.saveToken(data.token);
                $http.defaults.headers.common['x-access-token'] = data.token;
            });
        };

        return auth;
    }]);
});