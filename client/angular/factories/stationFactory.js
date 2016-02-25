myApp.factory('stationFactory', function($http) {
	var factory = {};
	var stations = [];
	var comments = [];
	var favorites = [];
	factory.getStations = function() {
		$http.get('/station').success(function(result) {
			stations = result;
		})
	}
	factory.addStation = function(data, callback) {
		$http.post('/station/new', data).success(function(result) {
			callback(result);
		})
	}
	factory.getStations = function(callback) {
		$http.get('/station').success(function(result) {
			stations = result;
			callback(stations);
		})
	}
	factory.searchStation = function(data, callback) {
		$http.post('/station', data).success(function(result) {
			stations = result;
			callback(stations);
		})
	}
	factory.showStations = function(data, callback) {
		$http.post('/station/show', data).success(function(result) {
			stations = result;
			callback(stations);
		})
	}
	factory.editStation = function(data, callback) {
		$http.post('/station/edit', data).success(function(result) {
			stations = result;
			callback(stations);
		})
	}
	factory.getStationById = function(data, callback) {
		$http.post('/station/id', {id: data}).success(function(result) {
			stations = result;
			callback(stations);
		})
	}
	factory.addComment = function(data, user, id, callback) {
		$http.post('/station/addcomment', {comment: data, user: user, id: id}).success(function(result) {
			callback(result);
		})
	}
	factory.addFavorite = function(stationId, user, callback) {
		$http.post('/station/addfavorite', {id: stationId, user: user}).success(function(result) {
			callback(result);  
		})
	}
	factory.removeFavorite = function(data, user, callback) {
		$http.post('/station/removefavorite', {id: data._id, user: user}).success(function(result) {
			callback(result);
		})
	}
	factory.getFavorites = function(user, callback) {
		$http.post('/station/favorites', {user: user}).success(function(result) {
			favorites = result;
			callback(favorites);
		})
	}

	return factory;
})