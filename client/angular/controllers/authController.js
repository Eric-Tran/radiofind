myApp.controller('authController', function($scope, $location, authFactory){
  $scope.user = {};
  $scope.error = false;
  $scope.register = function(){
    authFactory.register($scope.user).error(function(error){
      console.log('authController.js: error registering:', error);
      $scope.error = error;
    }).then(function(){
      $location.path('/');
    });
  };

  $scope.logIn = function(){
    authFactory.logIn($scope.user).error(function(error){
      $scope.error = error;
    // }).then(function(){
    //   $location.path('/');
    // });
    });
  };
});