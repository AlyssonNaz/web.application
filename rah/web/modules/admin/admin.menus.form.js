define([
    'app',
    '../base/table/table.view',
    '../base/header/header.view'
], function (app) {
    app.controller('MenusFormController',
        [
            '$scope',
            '$http',
            '$route',

            function ($scope, $http, $route) {
                $scope.isNew = $route.current.params.id == 'new';

                if (!$scope.isNew) {
                    $http.post('/api/model/menu/' + $route.current.params.id).then(function (data) {
                        $scope.model = data.data
                    });
                }

                $scope.create = function () {
                    $http.post('/api/model/menu/new', $scope.model).then(function (data) {
                        //$scope.model = data.data
                    });
                };

                $scope.save = function () {
                    $http.put('/api/model/menu/' + $route.current.params.id, $scope.model).then(function (data) {
                    });
                };

                $scope.model = {
                    modules: "[{'1'}]",
                    contexts: "[{'d7f960c0-7e10-11e6-9280-b747f09f49fc'}]"
                }

                $scope.HeaderButtons = [
                    {
                        caption: 'Novo',
                        onClick: function () {
                            alert('novo')
                        }
                    }
                ]
            }
        ]);
});