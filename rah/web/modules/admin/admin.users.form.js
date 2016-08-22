define([
    'app',
    '../base/table/table.view',
    '../base/header/header.view'
    ], function(app)
{
    app.controller('UsersFormController',
    [
        '$scope',
        '$http',
        '$route',

        function($scope, $http, $route)
        {
            $scope.isNew = $route.current.params.id == 'new';
            
            console.log($scope.isNew);

            if (!$scope.isNew) {
                $http.post('/api/model/user/'+$route.current.params.id).then(function(data){
                    $scope.model = data.data
                });
            }

            

            $scope.create = function(){
                $http.post('/api/model/user/new', $scope.model).then(function(data){
                    //$scope.model = data.data
                });
            };

            $scope.save = function(){
                $http.put('/api/model/user/'+$route.current.params.id, $scope.model).then(function(data){
                });
            };

            $scope.HeaderButtons = [
                {
                    caption: 'Novo',
                    onClick: function() { alert('novo') }
                }
            ]
        }
    ]);
});