var User       = require('../models/models').User;
var jwt        = require('jsonwebtoken');
var request    = require('request');
var fs         = require('fs');

// super secret for creating tokens
var superSecret = process.env.SECRET;

module.exports = function(app, express){
	var apiRouter = express.Router();

	// route to authenticate a user (POST http://localhost:3000/api/authenticate)
	apiRouter.post('/authenticate', function(req, res) {
		console.log(req.body.email);

	  // find the user
	  User.findOne({
	    email: req.body.email
	  }).select('displayName email password').exec(function(err, user) {

	    if (err) throw err;

	    // no user with that username was found
	    if (!user) {
	      res.json({ 
	      	success: false, 
	      	message: 'Authentication failed. User not found.' 
	  		});
	    } else if (user) {

	      // check if password matches
	      var validPassword = user.comparePassword(req.body.password);
	      if (!validPassword) {
	        res.json({
	        	success: false, 
	        	message: 'Authentication failed. Wrong password.' 
	    		});
	      } else {

	        // if user is found and password is right
	        // create a token
	        var token = jwt.sign({
	        	name: user.name,
	        	username: user.username,
	        	email: user.email,
	        	zipcode: user.zipcode
	        }, superSecret, {
	          expiresInMinutes: 1440 // expires in 24 hours
	        })

	        // return the information including token as JSON
	        res.json({
	          success: true,
	          message: 'Enjoy your token!',
	          token: token
	        });
	      }   

	    }

	  });
	});
};