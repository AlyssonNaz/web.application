define([
    'app',
    '../base/table/table.view',
    '../base/header/header.view'
], function (app) {
    app.controller('TablesFormController',
        [
            '$scope',
            '$http',
            '$route',
            '$element',

            function ($scope, $http, $route, $element) {
                $scope.isNew = $route.current.params.id == 'new';

                if (!$scope.isNew) {
                    $http.post('/api/model/table/' + $route.current.params.id).then(function (data) {
                        $scope.model = data.data

                        $http.post('/api/bar/table/qr-code/' + data.data.code).then(function (data) {
                            $('<div style="background: white;"></div>').append($(data.data).attr('width', '100px')).appendTo('#qr-code');
                        });
                    });


                }

                $scope.create = function () {
                    $http.post('/api/model/table/new', $scope.model).then(function (data) {
                        //$scope.model = data.data
                    });
                };

                $scope.save = function () {
                    $http.put('/api/model/table/' + $route.current.params.id, $scope.model).then(function (data) {
                    });
                };

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