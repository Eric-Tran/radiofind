myApp.controller('navController', function($scope, $location, authFactory) {
	$scope.isLoggedIn = authFactory.isLoggedIn;
	$scope.currentUser = authFactory.currentUser;
	// $scope.logOut = authFactory.logOut;

	$scope.logIn = function(){
		authFactory.logIn($scope.user).error(function(error){
      if(error) {
  			$scope.error = error;
      } else {
        $scope.error = false;
      }
  	});
    $scope.error = false;
    $location.path('/stations');
  };
  	$scope.logOut = function() {
  		authFactory.logOut();
      $scope.user = {};
  		$location.path('/');
  	};
});