myApp.factory('authFactory', function($http, $window) {
	var auth ={};

  //saveToken and getToken is for getting and setting token to localstorage
	auth.saveToken = function (token){
		$window.localStorage['flapper-news-token'] = token;
	};

	auth.getToken = function (){
		return $window.localStorage['flapper-news-token'];
	}
  //returns a boolen to check if user is logged in
	auth.isLoggedIn = function(){
  		var token = auth.getToken();
  		if(token){
    	var payload = JSON.parse($window.atob(token.split('.')[1]));
    	return payload.exp > Date.now() / 1000;
  		} else {
    		return false;
  		}
	};
  //returns name of user logged in
	auth.currentUser = function(){
  		if(auth.isLoggedIn()){
    	var token = auth.getToken();
    	var payload = JSON.parse($window.atob(token.split('.')[1]));
    		return payload.username;
  		}
	};
  //check if station has been favorited
  auth.favoriteStatus = function(stationId, callback) {
    var user = auth.currentUser();
    $http.post('/station/favstatus', {station_id: stationId, user: user}).success(function(status) {
      callback(status);
    })
  }
  //register user
	auth.register = function(user){
  		return $http.post('/register', user).success(function(data){
    	auth.saveToken(data.token);
  	});
	};

  //login user
	auth.logIn = function(user){
  		return $http.post('/login', user).success(function(data){
    	auth.saveToken(data.token);
  		});
	};
  //logout user
	auth.logOut = function(){
  		$window.localStorage.removeItem('flapper-news-token');
	};
	return auth;
});