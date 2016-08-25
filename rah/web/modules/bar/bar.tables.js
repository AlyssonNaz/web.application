define([
    'app',
    '../base/table/table.view',
    '../base/header/header.view'
], function (app) {
    app.controller('TablesController',
        [
            '$scope',
            '$http',

            function ($scope, $http) {
                $scope.headerOptions = {
                    title: 'Mesas',
                    description: 'Lista de mesas do bar.',
                    buttons: [
                        {
                            caption: 'Novo',
                            link: '/bar/tables/new'
                        }
                    ]
                };
            }
        ]);
});