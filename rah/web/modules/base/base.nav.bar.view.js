define([
    'app'
], function(app)
{
    app.directive('rahNavBarView', function ($compile, $route) {
        return {
            restrict: "E",
            scope: {
                member: '='
            },
            templateUrl: '/modules/base/base.nav.bar.view.html',
            link: function ($scope, element) {
                $scope.menus = [
                    {   
                        name: 'Administração',
                        menus: [
                            { name: 'Usuários', link: '/admin/users' },
                            { name: 'Bares', link: '/admin/bars' },
                            // { name: 'AAA', link: '/admin/users' },
                            // { name: 'Usuádfasdfadrios', link: '/admin/users' },
                            // { name: 'Usufasdfários', link: '/admin/users' },
                            // { name: 'asdfasdf', link: '/admin/users' }
                        ]
                    }                 
                ];
            }
        }
    })
});