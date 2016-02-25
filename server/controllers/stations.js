var mongoose = require('mongoose');
var Station = mongoose.model('Station');

module.exports = (function() {
	return {
		add: function(req, res) {
			console.log('stations.js: adding station:', req.body);
			var stationName = req.body.name.toUpperCase();
			var capSign = req.body.sign.toUpperCase();
			var new_station = new Station({name: stationName, frequency: req.body.frequency, url: req.body.url, call_sign: capSign, location: req.body.location, genre: req.body.genre, wave: req.body.wave, description: req.body.description, created_at: new Date});
			new_station.save(function(err, result) {
				if(err) {
					console.log('error adding station in stations.js');
				} else {
					res.json('success');
				}
			})
		},
		get: function(req, res) {
			Station.find({}, function(err, result) {
				if(err) {
					console.log('error stations.js: cannot get all stations');
				} else {
					res.json(result);
				}
			})
		},
		edit: function(req, res) {
			console.log('this is req.body', req.body);
			Station.update({_id: req.body._id}, {name: req.body.name, frequency: req.body.frequency, wave: req.body.wave, call_sign: req.body.call_sign, genre: req.body.genre, location: req.body.location, url: req.body.url, description: req.body.description}, function(err, result) {
					if(err) {
						console.log('stations.js: error updating station', err)
					} else {
						res.json(result);
					}
			})
		},
		getById: function(req, res) {
			Station.findOne({_id: req.body.id})
			.populate('comments')
			.exec(function(err, result) {
				if(err) {
					console.log('error stations.js: cannot get station by id')
				} else {
					res.json(result);
				}
			})
		},
		getOne: function(req, res) {
			Station.find({location: req.body.location}, function(err, result) {
				if(err) {
					console.log('error stations.js:', err);
				} else {
					res.json(result);
				}
			})
		},
		addComment: function(req, res) {
			Station.update({_id: req.body.id}, {comments: req.body.comment}, function(err) {
				if(err) {
					console.log('error stations.js: cannot find station for adding comment');
				} else {
					res.json('success adding comment');
				}
			})
		},
		show: function(req, res) {
			console.log('stations.js: server, data to update,', req.body);
			if(req.body.location == "All Cities" && req.body.genre == "All Genres") {
				Station.find({}, function(err, result) {
					if(err) {
						console.log('stations.js, error showing all', err);
					}else {
						res.json(result);
					}
				})
			} else if(req.body.location == "All Cities") {
				Station.find({genre: req.body.genre}, function(err, result) {
					if(err) {
						console.log('error stations.js: cannot show stations', err);
					} else {
						res.json(result);
					}
				})
			} else if(req.body.genre == "All Genres") {
				Station.find({location: req.body.location}, function(err, result) {
					if(err) {
						console.log('error stations.js: cannot show all stations', err);
					} else {
						res.json(result);
					}
				})
			} else {
				Station.find({ $and: [ {location: req.body.location}, {genre: req.body.genre} ] }, function(err, result) {
					if(err) {
						console.log('error in stations.js: cannot find stations', err);
					} else {
						res.json(result);
					}
				})
			}
		}
	}
})();