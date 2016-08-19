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

                    $thead.append('<th class="text-center">Ação</th>');
                    

                    //cria as rows
                    var $tbody = $('<tbody></tbody>');
                    
                    for (var i in data.itens){
                        var $tr = $('<tr></tr>');
                        for (var column in data.metadata){
                            $tr.append('<td>'+ data.itens[i][column] +'</td>');
                        }

                        $tr.append('<td class="text-center"><a href="/admin/users/'+data.itens[i]['id']+'" class="btn btn-default btn-xs">Abrir</a></td>')
                        $tbody.append($tr);
                    }

                    $table = $('<table style="font-size: 14px !important;"></table>');
                    $table.addClass('table');
                    $table.append($('<thead></thead>').append($thead));
                    $table.append($tbody);

                    var $panel = $('<div class="panel panel-filled"></div>');
                    var $panelBody = $('<div class="panel-body"></div>');
                    var $tableResponsive = $('<div class="table-responsive"></div>');
                    
                    $tableResponsive.append($table);
                    $panelBody.append($tableResponsive);
                    $panel.append($panelBody);

                    $(element).empty();
                    $(element).append($panel);
                });
            }
        }
    })
});