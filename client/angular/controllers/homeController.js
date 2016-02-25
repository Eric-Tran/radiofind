myApp.controller('homeController', function($scope, $location, stationFactory, $routeParams, authFactory) {
	$scope.isLoggedIn = authFactory.isLoggedIn;
	$scope.currentUser = authFactory.currentUser;

	stationFactory.getStations(function(data) {
		console.log('homeController: all stations found', data);
		$scope.stations = data;
	})
	$scope.search_station = {location: "All Cities"};
	$scope.searchStation = function() {
		if($scope.search_station.location == "All Cities") {
			stationFactory.getStations(function(data) {
				console.log('homeController: all stations found', data);
				$scope.stations = data;
				$location.path('/stations').search({location: $scope.search_station.location});
			})
		} else {
			stationFactory.searchStation($scope.search_station, function(data) {
				console.log('homeController: searchstation found', data);
				$scope.stations = data;
				$location.path('/stations').search({location: $scope.search_station.location});
			})
		}
	}



});