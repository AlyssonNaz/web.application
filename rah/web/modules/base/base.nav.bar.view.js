define([
    'app'
], function (app) {
    app.directive('rahNavBarView', function ($compile, $route, $http, $window) {
        return {
            restrict: "E",
            scope: {
                member: '='
            },
            templateUrl: '/modules/base/base.nav.bar.view.html',
            link: function ($scope, element) {
                if ($window.localStorage['gui.menus']) {
                    $scope.menus = JSON.parse($window.localStorage['gui.menus']);
                }
                else {
                    $http.post('/api/gui/menu').then(function (data) {
                        $scope.menus = [];

                        function findMenu(id) {
                            return $scope.menus.filter(function (item) {
                                return item.id == id;
                            })
                        }

                        for (var context in data.data.menus) {
                            var item = data.data.menus[context]

                            $scope.menus.push({
                                id: item.menu.id,
                                name: item.menu.name,
                                path: item.menu.path,
                                menus: item.menus.map(function (submenu) {
                                    return {
                                        name: submenu.name,
                                        path: submenu.path
                                    }
                                })
                            });
                        }

                        // data.data.menus.map(function (item) {
                        //     if (item.Parent && !findMenu(item.Parent.id).length) {
                        //         $scope.menus.push({
                        //             id: item.Parent.id,
                        //             name: item.Parent.name,
                        //             path: item.Parent.path
                        //         });
                        //     }
                        //
                        //     if (!item.Parent) {
                        //         if (!findMenu(item.id).length) {
                        //             $scope.menus.push({
                        //                 id: item.id,
                        //                 name: item.name,
                        //                 path: item.path
                        //             });
                        //         }
                        //     }
                        //     else {
                        //         var i = $scope.menus.indexOf(findMenu(item.Parent.id)[0]);
                        //         if (!$scope.menus[i].menus)
                        //             $scope.menus[i].menus = [];
                        //
                        //         $scope.menus[i].menus.push({
                        //             name: item.name,
                        //             path: item.path
                        //         })
                        //     }
                        // });

                        $window.localStorage['gui.menus'] = JSON.stringify($scope.menus);

                    });
                }
            }
        }
    })
});