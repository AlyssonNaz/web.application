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
            'form',
            function ($scope, $http, $route, $element, form) {
                $scope.isNew = $route.current.params.id == 'new';

                if (!$scope.isNew) {
                    form.get('table').then(function (data) {
                        $scope.model = data.data

                        $http.post('/api/bar/table/qr-code/' + data.data.code).then(function (data) {
                            $('<div style="background: white;"></div>').append($(data.data).attr('width', '100px')).appendTo('#qr-code');
                        });
                    });
                }

                $scope.saveOrCreate = function () {
                    form.saveOrCreate('table', $scope.model, $route.current.params.id);
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