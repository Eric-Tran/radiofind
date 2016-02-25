myApp.controller('favoriteController', function($scope, authFactory, stationFactory, $location, $routeParams) {
	$scope.isLoggedIn = authFactory.isLoggedIn;
	$scope.currentUser = authFactory.currentUser;
	var user = $scope.currentUser()

	stationFactory.getFavorites(user, function(data) {
		$scope.stations = data[0]._favorites;
		if($scope.stations == false) {
			$scope.message = {};
		}
	})

	$scope.stationInfo = function(data) {
		$location.path('/stations/info').search({id: data});
	}

})
