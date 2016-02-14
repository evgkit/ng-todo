angular.module('listApp')
    .controller('mainCtrl', function($scope, dataService) {
        dataService.getData(function(response) {
            $scope.items = response.data;
        });

        $scope.save = function(item) {
            dataService.save(item);
        };

        $scope.delete = function(item, index) {
            dataService.delete(item);
            $scope.items.splice(index, 1);
        };

        $scope.add = function() {
            var item = {
                name: 'New item'
            };
            $scope.items.unshift(item);
        };
    });
