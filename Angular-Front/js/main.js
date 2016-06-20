(function(){

    var spa = angular.module('spa', ['iconesSVG','ngRoute']);

    spa.controller('SlidenavCtrl', function($scope, $timeout, $mdSidenav, $mdUtil, $log) {
        $scope.toggleLeft = buildToggler('left');
        function buildToggler(navID) {
            var debounceFn = $mdUtil.debounce(function() {
                $mdSidenav(navID)
                    .toggle()
            }, 300);
            return debounceFn;
        }
    });

    spa.controller('LeftSlidenavCtrl', function($scope, $timeout, $mdSidenav, $log) {
        $scope.close = function() {
            $mdSidenav('left').close()
        };
    });

    spa.controller('MenuItemsCtrl', function($scope) {
                            //{name:'exemple', link:'http://exemple.com or #/exemple', icon:'assets-cache.js name'},
        $scope.MenuItems = [{name:'Início', link:'#/', icon:'ic_chevron_right_24px'},
                            {name:'Personagens', link:'#/personagens', icon:'ic_person_24px'},
                            {name:'Naves', link:'#/naves', icon:'favorite'}]
    }); 

    spa.controller('SplashScreenCtrl', function($scope) {          
            setInterval(function () {
                document.getElementById("splashScreen").style.display = "none";
                document.getElementById("app").style.display = "block";
            }, 000);
    }); 

    spa.config(function($routeProvider){
        $routeProvider
        .when('/', {
            templateUrl: 'includes/home.html',
            controller: 'HomeCtrl'
        })

        .when('/personagens', {
            templateUrl: 'includes/personagens.html',
            controller: 'PersonagensCtrl'
        })

        .when('/naves', {
            templateUrl: 'includes/naves.html',
            controller: 'NavesCtrl'
        })


        .otherwise({ redirectTo: '/'});
    });

    spa.controller('HomeCtrl', ['$scope', '$log', function($scope, $log){
        $scope.name = 'Star Wars Info';
    }]);

    spa.controller('PersonagensCtrl', ['$scope', '$location', '$http', 
    function MainCtrl($scope, $location, $http) {
        $scope.name = 'Personagens';
        var url = "http://localhost:4000/personagens";

        $http.get(url)
            .then(function(response) {
                $scope.personagens = response.data;
        });
    }]);

    spa.controller('NavesCtrl', ['$scope', '$location', '$http', 
    function MainCtrl($scope, $location, $http) {
        $scope.name = 'Naves';
        var url = "http://localhost:4000/naves";

        $http.get(url)
            .then(function(response) {
                $scope.naves = response.data;
        });
    }]);

})()

