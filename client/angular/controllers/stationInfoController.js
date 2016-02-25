myApp.controller('stationInfoController', function($scope, authFactory, stationFactory, $routeParams, $location) {
	$scope.station_id = $routeParams;
	$scope.isLoggedIn = authFactory.isLoggedIn;
	$scope.currentUser = authFactory.currentUser;
	$scope.isEditing = false;
	
	var checkStatus = function() { 
		if($scope.isLoggedIn() == true) {
			authFactory.favoriteStatus($scope.station_id.id, function(status) {
				console.log("stationinfocontroller: check status =", status)
				if(status == true) {
					$scope.status = true;
				} else {
					$scope.status = false;
				}
			})
		} else {
			console.log("log in is false");
		}
	};
	var getStations = function() {
		stationFactory.getStationById($scope.station_id.id, function(data) {
		$scope.stationInfo = data;
		checkStatus();
		})
	}

	getStations();

	$scope.addFavorite = function(data) {
		var user = $scope.currentUser();
		stationFactory.addFavorite(data, user, function(res) {
			$scope.status = true;
		});
	};
	
	$scope.removeFavorite = function() {
		var user = $scope.currentUser();
		stationFactory.removeFavorite($scope.stationInfo, user, function(data) {
			$scope.status = false;
		})
	};
	
	$scope.addComment = function(id) {
		var currentUser = $scope.currentUser();
		stationFactory.addComment($scope.newComment.comment, currentUser, id, function(data) {
			getStations();	
		});
		$scope.newComment = {};
	}
	$scope.editShow = function() {
		$scope.isEditing = true;
	}

	$scope.editStation = function() {
		stationFactory.editStation($scope.stationInfo, function(data) {
			getStations();
		})
		$scope.isEditing = false;
	}

	$scope.cancel = function() {
		$scope.isEditing = false;
	}
})