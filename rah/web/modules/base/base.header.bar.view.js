define([
    'app'
], function(app)
{
    app.controller('rahHeaderBarViewController',
        [
            '$scope',
            'auth',

            function ($scope, auth) {
                $scope.logout = function () {
                    auth.logOut();
                }

            }
        ]);

    app.directive('rahHeaderBarView', function ($compile, $route) {
        return {
            restrict: "E",
            scope: {
                member: '='
            },
            templateUrl: '/modules/base/base.header.bar.view.html',
            link: function (scope, element, attrs) {
                //$compile(element.contents())(scope)
            }
        }
    })
});