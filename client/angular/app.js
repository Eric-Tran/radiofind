var myApp = angular.module("myApp", ["ngRoute", "ui.bootstrap"]);
myApp.config(function ($routeProvider, $locationProvider) {
	$routeProvider
		.when('/', {
			templateUrl: '/partials/home.html'
		})
		.when('/stations/add', {
			templateUrl: '/partials/addstation.html'
		})
		.when('/stations', {
			templateUrl: '/partials/stations.html'
		})
		.when('/stations/info', {
			templateUrl: '/partials/stationinfo.html'
		})
		.when('/stations/favorites', {
			templateUrl: '/partials/favorites.html'
		})
		.when('/stations/register', {
			templateUrl: '/partials/register.html',
      controller: 'authController',
		})
		.otherwise({
			redirectTo:'/'
		})
  });
myApp.filter('unique', function() {
   return function(collection, keyname) {
      var output = [], 
          keys = [];

      angular.forEach(collection, function(item) {
          var key = item[keyname];
          if(keys.indexOf(key) === -1) {
              keys.push(key);
              output.push(item);
          }
      });

      return output;
   };
});