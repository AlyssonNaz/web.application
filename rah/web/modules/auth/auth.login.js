define([
    'app',
], function(app)
{
    app.controller('LoginController',
    [
        '$scope',
        '$location',
        'auth',

        function($scope, $location, auth)
        {            
            $scope.logIn = function() {
                auth.logIn($scope.user).then(function(){
                     $location.path( "/dashboard/start" );
                });
            }
        }
    ]);
});