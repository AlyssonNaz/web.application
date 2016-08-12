define([
    'app'
], function(app)
{
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