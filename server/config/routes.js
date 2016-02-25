var stations = require('./../controllers/stations.js');
var comments = require('./../controllers/comments.js');
var users = require('./../controllers/users.js');
var mongoose = require('mongoose');
var passport = require('passport');
var jwt = require('express-jwt');
var auth = jwt({secret: 'SECRET', userProperty: 'payload'});
var User = mongoose.model('User');

module.exports = function(app) {

	app.post('/station/new', function(req, res) {
		stations.add(req, res);
	});
	app.post('/station', function(req, res) {
		stations.getOne(req, res);
	});
	app.get('/station', function(req, res) {
		stations.get(req, res);
	});
	app.post('/station/show', function(req, res) {
		stations.show(req, res);
	})
	app.post('/station/edit', function(req, res) {
		stations.edit(req, res);
	})
	app.post('/station/id', function(req, res) {
		stations.getById(req, res);
	})
	app.post('/station/addcomment', function(req, res) {
		comments.addComment(req, res);
	})
	app.post('/station/addfavorite', function(req, res) {
		users.addFavorite(req, res);
	})
	app.post('/station/removefavorite', function(req, res) {
		users.removeFavorite(req, res);
	})
	app.post('/station/favorites', function(req, res) {
		users.getFavorites(req, res);
	})
	app.post('/station/favstatus', function(req, res) {
		users.favStatus(req, res);
	})

	//Passport routes
	app.post('/register', function(req, res, next){
  		if(!req.body.username || !req.body.password || !req.body.full_name || !req.body.email || !req.body.confirm_password){
    		return res.status(400).json({message: '* Please fill out all fields'});
  		} else if(req.body.password != req.body.confirm_password) {
  			return res.status(400).json({message: '* Passwords do not match'});
  		} else if(req.body.password.length < 7) {
  			return res.status(400).json({message: '* Password must be longer than 7 characters'});
  		}
  		var user = new User();
  		user.fullname = req.body.full_name;
  		user.email = req.body.email;
  		user.username = req.body.username;
  		user.setPassword(req.body.password)
  		user.save(function (err){
  			console.log('this is the errorr:', err);
			if(err){ return res.status(400).json({message: '* Username already taken'}); }
			return res.json({token: user.generateJWT()})
		});
	});
	app.post('/login', function(req, res, next){
		if(!req.body.username || !req.body.password){
    		return res.status(400).json({message: 'Please fill out all fields'});
  		}	
  		passport.authenticate('local', function(err, user, info){
    		if(err){ 
    			return next(err); 
    		}
    		if(user){
      		return res.json({token: user.generateJWT()});
    		} else {
      		return res.status(401).json(info);
    		}
  		})(req, res, next);
	});
}


