define([
    'app',
    '../base/table/table.view',
    '../base/header/header.view'
], function (app) {
    app.controller('CategoriesController',
        [
            '$scope',
            '$http',
            function ($scope) {

                $scope.headerOptions = {
                    title: 'Categorias',
                    description: 'Lista de categorias dos produtos.',
                    buttons: [
                        {
                            caption: 'Novo',
                            link: '/admin/categories/new'
                        }
                    ]
                };

            }
        ]);
});