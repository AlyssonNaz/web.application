define([
    'app',
    '../base/table/table.view',
    '../base/header/header.view'
    ], function(app)
{
    app.controller('BarsController',
    [
        '$scope',
        '$http',

        function($scope, $http)
        {
            $scope.headerOptions = {
                title: 'Bares',
                description: 'Lista de bares cadastrados no sistema.',
                buttons: [
                    {
                        caption: 'Novo',
                        link: '/admin/bars/new'
                    }
                ]
            };
        }
    ]);
});