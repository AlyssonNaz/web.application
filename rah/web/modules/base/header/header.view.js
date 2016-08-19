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
                ctrl: '='
            },
            templateUrl: '/modules/base/header/header.view.html',
            link: function ($scope, element) 
            {
             
            }
        }
    })
});