(function (angular) {
  var app = angular.module('seugarcom', []);
  app.controller('next-update-stats-controller', function ($http, $scope) {
    $scope.packageName = 'check-types';
    
    $scope.resultado = '...';
    
    $scope.verifyToken = function () {
      $http.post('./api/auth/verify', [], { headers: {'x-access-token': $scope.token } }).success(function(result){
        $scope.resultado = result;
      })
    };
  });
}(angular));