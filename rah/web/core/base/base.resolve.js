define([], function () {
    
    var buildPath = function (module, file) {
        return '/modules/' + module + '/' + module + '.' + file;
    }

    return {
        buildModule: buildPath,
        templateUrl: function (params) {
            return '/modules/base/base.view.html';
        },
        dependencies: function () {
            var definition =
                {
                    resolver: ['$q', '$rootScope', '$route', function ($q, $rootScope, $route) {

                        var deferred = $q.defer();
                        require(['/core/base/base.view.js', buildPath($route.current.params.module, $route.current.params.view+'.js')], function () {
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