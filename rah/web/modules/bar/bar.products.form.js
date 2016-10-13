define([
    'app',
    '../base/table/table.view',
    '../base/header/header.view'
], function (app) {
    app.controller('ProductsFormController',
        [
            '$scope',
            '$http',
            '$route',
            '$element',
            'form',
            function ($scope, $http, $route, $element, form) {
                $scope.isNew = $route.current.params.id == 'new';

                if (!$scope.isNew) {
                    form.get('product').then(function (product) {
                        $scope.model = product.data;
                    });
                }

                $scope.saveOrCreate = function () {
                    form.saveOrCreate('product', $scope.model, $route.current.params.id);
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