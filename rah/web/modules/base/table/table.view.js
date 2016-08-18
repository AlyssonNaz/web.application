define([
    'app'
], function(app)
{
    app.directive('rahTable', function ($compile, $route, $http) {
        return {
            restrict: "E",
            replace: true,
            scope: {
                model: '='
            },
            templateUrl: '/modules/base/table/table.view.html',
            link: function ($scope, element) 
            {

                $http.post('/api/model/user/list').success(function (data) {
                    $(element).append('<div>Conteúdo dinâmico</div>');
                    //$scope.users = data.rows;
                });
//                   <table class="table table-striped">
//     <thead>
//       <tr>
//         <th>Firstname</th>
//         <th>Lastname</th>
//         <th>Email</th>
//       </tr>
//     </thead>
//     <tbody>
//       <tr>
//         <td>John</td>
//         <td>Doe</td>
//         <td>john@example.com</td>
//       </tr>
//       <tr>
//         <td>Mary</td>
//         <td>Moe</td>
//         <td>mary@example.com</td>
//       </tr>
//       <tr>
//         <td>July</td>
//         <td>Dooley</td>
//         <td>july@example.com</td>
//       </tr>
//     </tbody>
//   </table>
            }
        }
    })
});