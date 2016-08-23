define([
    'app',
    '../base/table/table.view',
    '../base/header/header.view'
], function (app) {
    app.controller('UsersController',
        [
            '$scope',
            '$http',

            function ($scope, $http) {
                $scope.headerOptions = {
                    title: 'Usuários',
                    description: 'Lista de usários cadastrados no sistema.',
                    icon: 'pe-7s-users',
                    buttons: [
                        {
                            caption: 'Novo',
                            link: '/admin/users/new'
                        }
                    ]
                };
            }
        ]);
});