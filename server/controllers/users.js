var mongoose = require('mongoose');
var Station = mongoose.model('Station');
var User = mongoose.model('User');

module.exports = (function() {
	return {
		addFavorite: function(req, res) {
			User.findOne({username: req.body.user}, function(err, user) {
				if(err) {
					console.log('users.js: cannot find user', err);
				} else {
					console.log('users.js: user found!', user);
				}
				Station.findOne({_id: req.body.id}, function(err, station) {
					if(err) {
						console.log('users.js: cannot find staiton', err);
					} else {
						console.log('users.js: station found', station);
					}
					user._favorites.push(station);
					user.save(function(err, success) {
						if(err) {
							console.log('users.js: cannot save favorites');
						} else {
							res.json(success);
						}
					})
				})
			})
		},
		removeFavorite: function(req, res) {
			User.update({username: req.body.user}, {$pull: {_favorites: req.body.id}}, function(err, result) {
				if(err) {
					console.log("users.js: error removing favorite", err);
				} else {
					res.json(result);
				}
			})
		},
		getFavorites: function(req, res) {
			User.find({username: req.body.user}).populate('_favorites').exec(function(err, result) {
				if(err) {
					console.log("users.js: cannot find user", err);
				} else {
					console.log("users.js: here are the favorites",result);
					res.json(result);
				}
			})
		},
		favStatus: function(req, res) {
			console.log('here is the station id:', req.body.station_id)
			User.findOne({username: req.body.user}, function(err, user) {
				if(err) {
					console.log('users.js: cannot find user favstatus', err);
				} else {
					console.log('users.js: user favstatus found!', user._favorites);
				}
				console.log("this is the userrrrrr", user)
				for(favorite in user._favorites) {
					if(user._favorites[favorite] == String(req.body.station_id)) {
						console.log('favorite station found!')
						res.json(true);
					} else {
						console.log('no favorite station here')
					}
				}
			})
		}
	}
}) ()