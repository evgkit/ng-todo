'use strict';
angular.module('listApp', []);

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

angular.module('listApp')
    .directive('items', function() {
        return {
            template: '' +
            '<div class="list">' +
                '<div class="add">' +
                   '<a href="" ng-click="add()">+ Add new task</a>' +
                '</div>' +
                '<div ng-repeat="item in items | orderBy: \'completed\'" ng-class="{' +
                    '\'editing-item\': editing,' +
                    '\'edited\': item.edited,' +
                    '\'completed\': item.completed' +
                '}" ng-init="item.completed = false" class="item">' +

                    '<input ng-model="item.completed" type="checkbox"/>' +
                    '<span ng-click="item.completed = !item.completed"></span>' +

                    '<label ng-model="item.name" ng-hide="editing" ng-click="editing = true">{{item.name}}</label>' +
                    '<input ng-model="item.name" ng-show="editing" ng-blur="editing = false" ng-change="item.edited = true" type="text" class="editing-label"/>' +
                    '<div class="actions">' +
                        '<a href="" ng-click="editing = !editing">edit</a>' +
                        '<a href="" ng-click="save(item)">save</a>' +
                        '<a href="" ng-click="delete(item, $index)" class="delete">delete</a>' +
                    '</div>' +
                '</div>' +
            '</div>',
            controller: 'mainCtrl',
            replace: true
        }
    });
angular.module('listApp')
    .service('dataService', function($http) {
        this.getData = function(callback) {
            $http.get('mocks/response.json')
                .then(callback);
        };

        this.save = function(item) {
            console.log('saved ' + item.name);
        };

        this.delete = function(item) {
            console.log('deleted ' + item.name);
        };
    });
//# sourceMappingURL=application.js.map
