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
            $http.post('/api/model/user/1').then(function(data){
                $scope.model = data.data
            });

            $scope.headerOpt = {
                "aaa": 'TTTT'
            };
        
        }
    ]);
});