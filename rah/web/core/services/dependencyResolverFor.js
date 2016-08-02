define([], function () {
    
    var buildPath = function (module, view) {
        return '/modules/' + module + '/' + view;
    }

    return {
        templateUrl: function (params) {
            return buildPath(params.module, params.view) + '.html';
        },
        dependencies: function () {
            var definition =
                {
                    resolver: ['$q', '$rootScope', '$route', function ($q, $rootScope, $route) {
                        var deferred = $q.defer();
                        require([buildPath($route.current.params.module, $route.current.params.view+'.js')], function () {
                            $rootScope.$apply(function () {
                                deferred.resolve();
                            });
                        });

                        return deferred.promise;
                    }]
                }

            return definition;
        }
    }
});