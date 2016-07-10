var User       = require('../models/models').User;
var jwt        = require('jsonwebtoken');
var request    = require('request');
var fs         = require('fs');

// super secret for creating tokens
var superSecret = process.env.SECRET;

module.exports = function(app, express){
	var apiRouter = express.Router();

	apiRouter.post('/register',function(req, res) {	
		var user = new User();		// create a new instance of the User model
		user.email = req.body.email;
		user.displayName = req.body.displayName;
		user.password = req.body.password;
		user.location = req.body.location;

		user.save(function(err) {
			if (err) {
				// duplicate entry
				if (err.code == 11000) 
					return res.json({ success: false, message: 'A user with that email already exists. '});
				else 
					return res.send(err);
			}

			// return a message
			res.json({ message: 'User created!' });
		});
	})

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
	        	id: user._id,
	        	displayName: user.displayName,
	        	email: user.email,
	        	location: user.location
	        }, superSecret, {
	          expiresIn: 1440 // expires in 24 hours
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

	// route middleware to verify a token
	apiRouter.use(function(req, res, next) {
		// do logging
		console.log('Somebody just came to our app!');

	  // check header or url parameters or post parameters for token
	  var token = req.body.token || req.query.token || req.headers['x-access-token'];

	  // decode token
	  if (token) {

	    // verifies secret and checks exp
	    jwt.verify(token, superSecret, function(err, decoded) {      
	      if (err){
	      	res.status(403).send({ 
	        	success: false, 
	        	message: 'Failed to authenticate token.' 
	    	});
	      }
	      else{
	        // if everything is good, save to request for use in other routes
	        req.decoded = decoded;   
	        next(); // make sure we go to the next routes and don't stop here 
	      }
	    });

	  } else {
	  	// if there is no token
	    // return an HTTP response of 403 (access forbidden) and an error message
   	 	res.status(403).send({ 
   	 		success: false, 
   	 		message: 'No token provided.' 
   	 	});
	  }
	});

	// accessed at GET http://localhost:3000/api
	apiRouter.get('/', function(req, res) {
		res.json({ message: 'hooray! welcome to our api!' });	
	});

	apiRouter.get('/users', function(req, res) {
			User.find(function(err, users) {
				if (err) res.send(err);

				// return the users
				res.json(users);
			});
		});

	apiRouter.route('/users/:user_id')

		// get the user with that id
		.get(function(req, res) {
			User.findById(req.params.user_id, function(err, user) {
				if (err) res.send(err);
				console.log(user);
				// return that user
				res.json(user);
			});
		})

		// update the user with this id
		.put(function(req, res) {
			User.findById(req.params.user_id, function(err, user) {

				if (err) res.send(err);

				// set the new user information if it exists in the request
				if (req.body.displayName) user.displayName = req.body.displayName;
				if (req.body.password) user.password = req.body.password;
				if (req.body.email) user.email = req.body.email;
				if (req.body.location) user.location = req.body.location;

				// save the user
				user.save(function(err) {
					if (err) res.send(err);

					// return a message
					res.json({ message: 'User updated!' });
				});

			});
		})

		// delete the user with this id
		.delete(function(req, res) {
			User.remove({
				_id: req.params.user_id
			}, function(err, user) {
				if (err) res.send(err);

				res.json({ message: 'Successfully deleted' });
			});
		});

	apiRouter.get('/me', function(req, res) {
		console.log("BLAH");
		console.log(req.decoded.id);
		User.findOne({_id: req.decoded.id}, function(err, user) {
		if (err) res.send(err);
		console.log(user);
		res.json(user);
		});
	});
	return apiRouter;
};