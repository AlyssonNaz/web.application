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
            link: function (scope, element, attrs) {
                //$compile(element.contents())(scope)
            }
        }
    })
});