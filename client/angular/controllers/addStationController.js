myApp.controller('addStationController', function($scope, stationFactory, authFactory, $location) {
	$scope.isLoggedIn = authFactory.isLoggedIn;
	$scope.currentUser = authFactory.currentUser;

	$scope.new_station = {wave: 'FM', genre: 'All Genres', location: 'All Cities'};
	$scope.addStation = function() {
		stationFactory.addStation($scope.new_station, function(res) {
			console.log('this is the add station msg', res);
			if(res == 'success') {
				$scope.success = {};
			}
		});
		$scope.new_station = {};
		$scope.new_station = {wave: 'FM', genre: 'All Genres', location: 'All Cities'};
	};

	$scope.cancel = function() {
		$location.path('/stations');
	}
});