define([
    'app',
    '../base/table/table.view',
    '../base/header/header.view'
], function (app) {
    app.controller('ContextsController',
        [
            '$scope',
            '$http',

            function ($scope, $http) {
                $scope.headerOptions = {
                    title: 'Contextos',
                    description: 'Lista de contexts cadastrados no sistema.',
                    icon: 'pe-7s-users',
                    buttons: [
                        {
                            caption: 'Novo',
                            link: '/admin/contexts/new'
                        }
                    ]
                };
            }
        ]);
});