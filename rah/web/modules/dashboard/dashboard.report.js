define([
    'app'
    ], function(app)
{
    app.controller('ReportViewController',
    [
        '$scope',

        function($scope)
        {
            console.log('testando controller');
            $scope.page =
            {
                heading: 'Report Udddddasdfasdfasss'
            };
        }
    ]);
});