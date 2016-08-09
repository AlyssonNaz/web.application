define(['routes',    
    'services/dependencyResolverFor',
    'services/rah.core.auth'],
    function (config, dependencyResolverFor, app) {
        
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
                        templateUrl: dependencyResolverFor.templateUrl,
                        resolve: dependencyResolverFor.dependencies()
                    });

                    $routeProvider.otherwise({ redirectTo: '/dashboard/start' });
                }
            ]);

        //inject any instance 
        app.run(function ($rootScope, $location, auth) {
            $rootScope.$on('$routeChangeStart', function (next, current) {
                if (current.params.module == 'auth' && current.params.view != 'login')
                    return;
                    
                if (!auth.isLoggedIn())
                    $location.path( "/auth/login" );
            });
        });

        return app;
    });