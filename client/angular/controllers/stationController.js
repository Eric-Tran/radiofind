myApp.controller('stationController', function($scope, authFactory, stationFactory, $location, $routeParams) {
	$scope.isLoggedIn = authFactory.isLoggedIn;
	$scope.currentUser = authFactory.currentUser;

	stationFactory.getStations(function(data) {
		$scope.search_stations = data;
	})

	if($routeParams.location) {
		$scope.show_station = {location: $routeParams.location, genre: "All Genres"};
		stationFactory.showStations($scope.show_station, function(data) {
			$scope.stations = data;
		})
	} else {
		$scope.show_station = {location: "All Cities", genre: "All Genres"};
		stationFactory.getStations(function(data) {
		$scope.stations = data;
		})
	}
	$scope.showStations = function() {
		stationFactory.showStations($scope.show_station, function(data) {
			$scope.stations = data;
		})
	}
	$scope.stationInfo = function(data) {
		$location.path('/stations/info').search({id: data});
	}
})