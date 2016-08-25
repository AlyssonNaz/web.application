define([
    'app',
    '../base/table/table.view',
    '../base/header/header.view'
    ], function(app)
{
    app.controller('BarsFormController',
    [
        '$scope',
        '$http',
        '$route',

        function($scope, $http, $route)
        {
            $scope.isNew = $route.current.params.id == 'new';
            
            if (!$scope.isNew) {
                $http.post('/api/model/bar/'+$route.current.params.id).then(function(data){
                    $scope.model = data.data
                });
            }

            $scope.create = function(){
                $http.post('/api/model/bar/new', $scope.model).then(function(data){
                    //$scope.model = data.data
                });
            };

            $scope.save = function(){
                $http.put('/api/model/bar/'+$route.current.params.id, $scope.model).then(function(data){
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