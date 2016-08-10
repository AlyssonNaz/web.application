define([
    'app'
    ], function(app)
{
    app.controller('AboutViewController',
    [
        '$scope',

        function($scope)
        {
            console.log('testando controller');
            $scope.page =
            {
                heading: 'About Udddddasdfasdfasss'
            };
        }
    ]);
});