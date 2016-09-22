define([
    'app',
    '../base/table/table.view',
    '../base/header/header.view'
], function (app) {
    app.controller('MenusController',
        [
            '$scope',
            '$http',

            function ($scope, $http) {
                $scope.headerOptions = {
                    title: 'Menus',
                    description: 'Lista de menus cadastrados no sistema.',
                    buttons: [
                        {
                            caption: 'Novo',
                            link: '/admin/menus/new'
                        }
                    ]
                };
            }
        ]);
});