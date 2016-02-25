var mongoose = require('mongoose');
var Station = mongoose.model('Station');
var Comment = mongoose.model('Comment');

module.exports = (function() {
	return {
		addComment: function(req, res) {
			console.log('comments.js: this is the comment',req.body.comment);
			Station.findOne({_id: req.body.id}, function(err, station) {
				var comment = new Comment({_station: req.body.id, comment: req.body.comment, user: req.body.user, created_at: new Date});
				comment._station = station._id;
				console.log('comments.js: station found here', station);
				station.comments.push(comment);
				comment.save(function(err) {
					station.save(function(err) {
						if(err) {
							console.log('comments.js: connot save comments to station')
						} else {
							res.json('comments.js: saved comments');
						}
					})
				})
			})
		}
	}
}) ();