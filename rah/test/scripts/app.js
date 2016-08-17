define(['routes','services/dependencyResolverFor'], function(config, dependencyResolverFor)
{
    var app = angular.module('app', ['ngRoute']);

    app.config(
    [
        '$routeProvider',
        '$locationProvider',
        '$controllerProvider',
        '$compileProvider',
        '$filterProvider',
        '$provide',

        function($routeProvider, $locationProvider, $controllerProvider, $compileProvider, $filterProvider, $provide)
        {
	        app.controller = $controllerProvider.register;
	        app.directive  = $compileProvider.directive;
	        app.filter     = $filterProvider.register;
	        app.factory    = $provide.factory;
	        app.service    = $provide.service;

            $locationProvider.html5Mode(true);

            $routeProvider.when('/teste/:teste', { 

                    templateUrl: function(params){
                        console.log(params.teste); 
                        return '/views/' + params.teste + '.html'; 
                    },
                    resolve: dependencyResolverFor(['controllers/AboutViewController', 'directives/app-color'])
            });

            $routeProvider.otherwise({ redirectTo: '/'});

            if(config.routes !== undefined)
            {
                angular.forEach(config.routes, function(route, path)
                {
                    console.log(path)
                    $routeProvider.when(path, { 
                        templateUrl: route.templateUrl,
                        resolve: dependencyResolverFor(route.dependencies)
                    });
                });
            }
        }
    ]);

   return app;
});