define([
    'app',
    '../base/table/table.view',
    '../base/header/header.view'
], function (app) {
    app.controller('CategoriesFormController',
        [
            '$scope',
            '$http',
            '$route',
            '$element',
            'form',
            function ($scope, $http, $route, $element, form) {
                $scope.isNew = $route.current.params.id == 'new';

                if (!$scope.isNew) {
                    form.get('category').then(function (category) {
                        $scope.model = category.data;
                    });
                }

                $scope.saveOrCreate = function () {
                    form.saveOrCreate('category', $scope.model, $route.current.params.id);
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