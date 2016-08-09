define([], function () {
    
    var buildPath = function (module, file) {
        return '/modules/' + module + '/' + module + '.' + file;
    }

    return {
        templateUrl: function (params) {
            return buildPath(params.module, params.view) + '.html';
        },
        dependencies: function () {
            var definition =
                {
                    resolver: ['$q', '$rootScope', '$route', function ($q, $rootScope, $route) {
                        $rootScope.teste = "aaaaa";
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