define([
    'routes',    
    'base/base.resolve',
    'auth/auth'],

    function (config, resolve, app) {
        
        // var app = angular.module('app', ['ngRoute', 'ui.router']);

        app.config(
            [
                '$routeProvider',
                '$locationProvider',
                '$controllerProvider',
                '$compileProvider',
                '$filterProvider',
                '$provide',

                function ($routeProvider, $locationProvider, $controllerProvider, $compileProvider, $filterProvider, $provide) {
                    app.controller = $controllerProvider.register;
                    app.directive = $compileProvider.directive;
                    app.filter = $filterProvider.register;
                    app.factory = $provide.factory;
                    app.service = $provide.service;

                    $locationProvider.html5Mode(true);

                    $routeProvider.when('/:module/:view', {
                        templateUrl: resolve.templateUrl,
                        resolve: resolve.dependencies()
                    }).when('/:module/:view/:id', {
                        templateUrl: resolve.templateUrl,
                        resolve: resolve.dependencies()
                    });

                    $routeProvider.otherwise({ redirectTo: '/dashboard/start' });
                }
            ]);

        //inject any instance 
        app.run(function ($rootScope, $location, auth) {
            $rootScope.$on('$routeChangeStart', function (next, current) {
                if (!auth.isLoggedIn())
                    $location.path( "/auth/login" );
                else if (current.params.module == 'auth')
                    $location.path( "/dashboard/start" );
            });
        });

        return app;
    });