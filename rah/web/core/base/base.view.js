define([
    'app',
    'base/base.resolve'
], function(app, resolve)
{
    app.directive('rahView', function ($compile, $route) {
        return {
            restrict: "E",
            scope: {
                member: '='
            },
            templateUrl: function(){
                //return 'teste.html';
                return resolve.buildModule($route.current.params.module, $route.current.params.view)+ '.html';
            },
            link: function (scope, element, attrs) {
                $compile(element.contents())(scope)
            }
        }
    })
});