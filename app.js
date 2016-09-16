var app = angular.module('app', [])
    .config(function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
 })
    .controller('MainController', MainController);

function MainController($http, $sce, $timeout, $q) {

    var vm = this;
    var reqParams = {
        method: 'flickr.photos.search',
        api_key: 'd4c71e6ee9ee6054a14021ec4d7375a4',
        tags: 'macbook-air',
        safe_search: 3,
        per_page: 20,
        format: 'json',
        nojsoncallback: 1,
        content_type: 1
    };
    var httpConfig = {
        method: 'GET',
        url: 'https://api.flickr.com/services/rest/',
        params: reqParams
    };

    vm.search = function(keyword) {
        vm.searching = true;
        vm.search.keyword = keyword;
        if(keyword) reqParams.tags = keyword;
        vm.search.results = wait().then(function(){

            $http(httpConfig).then(function(resp) {

                if (resp.status === 200) {
                    vm.search.results = resp.data.photos.photo;
                    vm.search.results.total = resp.data.photos.total;
                    vm.searching = false;
                }
                else {
                    console.log(resp.statusText);
                    vm.search.error = resp.statusText;
                }
            }).catch(function(err) {
                console.log(err);
                vm.search.error = err;
            });
        });

    };

    function wait() {
        var defer = $q.defer();
        $timeout(function() {
            defer.resolve();
        }, 2000);
        return defer.promise;

    }
}

