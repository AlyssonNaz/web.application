define([], function () {
    
    var buildPath = function (module, file) {
        return '/modules/' + module + '/' + module + '.' + file;
    }

    return {
        buildModule: buildPath,
        templateUrl: function (params) {
            if (params.module == 'auth')
                return '/modules/base/base.empty.view.html';
            else 
                return '/modules/base/base.view.html';
        },
        dependencies: function () {
            var definition =
                {
                    resolver: ['$q', '$rootScope', '$route', function ($q, $rootScope, $route) {
                        var resolve = function(){
                            if ($route.current.params.id)// && !isNaN($route.current.params.id)) 
                                return buildPath($route.current.params.module, $route.current.params.view+'.form.js');

                            return buildPath($route.current.params.module, $route.current.params.view+'.js');
                        };
                        var deferred = $q.defer();
                        require([
                            '/modules/base/base.view.js',
                            '/modules/base/base.header.bar.view.js',
                            '/modules/base/base.nav.bar.view.js',
                            resolve()], function () {
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