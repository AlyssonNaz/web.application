define([
    'app',
    '../base/table/table.view'
    ], function(app)
{
    app.controller('UsersController',
    [
        '$scope',
        '$http',

        function($scope, $http)
        {
            // $http.post('/api/model/user/list').success(function (data) {
            //     $scope.users = data.rows;
            // });
        }
    ]);
});