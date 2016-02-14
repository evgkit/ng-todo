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