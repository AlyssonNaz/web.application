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
                var params = $route.current.params;

                if (params.id && !isNaN(params.id)) //module/view/2
                    return resolve.buildModule(params.module, params.view)+ '.form.html';

                return resolve.buildModule(params.module, params.view)+ '.html';
            },
            link: function (scope, element, attrs) {
                //$compile(element.contents())(scope)
            }
        }
    })
});