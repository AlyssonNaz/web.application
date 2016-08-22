define([
    'app'
], function(app)
{
    app.directive('rahHeader', function ($compile, $route, $http) {
        return {
            restrict: "E",
            replace: true,
            scope: {
                title: '@',
                desc: '@',
                icon: '@',
                options: '='
            },
            templateUrl: '/modules/base/header/header.view.html',
            link: function ($scope, element) 
            {
                element.parent().controller
                    // console.log($scope.parent);
            }
        }
    })
});