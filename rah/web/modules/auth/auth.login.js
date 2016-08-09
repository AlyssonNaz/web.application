define([
    'app',
    'directives/rah.dynamic.controller'
], function(app)
{
    app.controller('LoginController',
    [
        '$scope',
        'auth',

        function($scope, auth)
        {            
            $scope.longIn = function() {
                auth.logIn($scope.user);
            }
        }
    ]);
});