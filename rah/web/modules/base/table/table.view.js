define([
    'app'
], function(app)
{
    app.directive('rahTable', function ($compile, $route, $http) {
        return {
            restrict: "E",
            replace: true,
            scope: {
                model: '@'
            },
            templateUrl: '/modules/base/table/table.view.html',
            link: function ($scope, element) 
            {
                $http.post('/api/model/'+$scope.model+'/list').success(function (data) {

                    //cria o cabeçalho da tabela
                    var $thead = $('<tr></tr>');

                    for (var column in data.metadata){
                         $thead.append('<th>'+ data.metadata[column].caption +'</th>');
                    }

                    //cria as rows
                    var $tbody = $('<tbody></tbody>');
                    
                    for (var i in data.itens){
                        var $tr = $('<tr></tr>');
                        for (var column in data.metadata){
                            $tr.append('<td>'+ data.itens[i][column] +'</td>');
                        }
                        $tbody.append($tr);
                    }

                    $table = $('<table></table>');
                    $table.addClass('table table-hover table-striped');
                    $table.append($('<thead></thead>').append($thead));
                    $table.append($tbody);

                    
                    $(element).append($('<div class="table-responsive"></div>').append($table));
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