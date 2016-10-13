define([
    'app',
    '../base/table/table.view',
    '../base/header/header.view'
], function (app) {
    app.controller('ProductsController',
        [
            '$scope',
            '$http',
            function ($scope) {

                $scope.headerOptions = {
                    title: 'Produtos',
                    description: 'Lista de produtos do bar.',
                    buttons: [
                        {
                            caption: 'Novo',
                            link: '/bar/products/new'
                        }
                    ]
                };

            }
        ]);
});