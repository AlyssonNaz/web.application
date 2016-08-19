define([
    'app',
    '../base/table/table.view',
    '../base/header/header.view'
    ], function(app)
{
    app.controller('UsersController',
    [
        '$scope',
        '$http',

        function($scope, $http)
        {
            $scope.c = "this";

            return {
                testF: function (){
                    console.log('blalalblalbalbla');
                }
            }
            
        }
    ]);
});