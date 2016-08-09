define(['app'], function(app)
{
    app.directive('rahController', ['$compile', '$parse',function($compile, $parse) {
        return {
            restrict: 'A',
            terminal: true,
            priority: 100000,
            link: function(scope, elem) {
                var name = $parse(elem.attr('rah-controller'))(scope);
                elem.removeAttr('rah-controller');
                elem.attr('ng-controller', name);
                $compile(elem)(scope);
            }
        };
    }]);
});