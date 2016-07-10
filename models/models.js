// ----------------------------------------------
// project_button models & schemas
// ----------------------------------------------

// ----------------------------------------------
// Import dependencies
// ----------------------------------------------
var mongoose = require('mongoose');

var connect = process.env.MONGODB_URI
mongoose.connect(connect);

// ----------------------------------------------
// bcrypt dependency & constant
// ----------------------------------------------
var bcrypt = require('bcrypt');
const saltRounds = 10;

// ----------------------------------------------
// Log successful connection in console
// ----------------------------------------------
var db_connection = mongoose.connection;
db_connection.once('open', function callback () {
  console.log("DB Connected!");
});

var userSchema = mongoose.Schema({
  displayName:{
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    index: { unique: true }
  },
  password: {
    type: String,
    required: true
  },
  location:{
    type: String,
    required: true
  },
  stravaAccessToken: {
  	type: String,
    default: "1"
  },
  strava:{
    type: Number,
    default: 0
  }
});

// ----------------------------------------------
// Hashes password before saving it
// ----------------------------------------------
userSchema.pre('save', function(next) {
  var user = this;

  // hash the password only if the password has been changed or user is new
  if (!user.isModified('password')) return next();

  bcrypt.genSalt(saltRounds, function(err, salt) {
    if(err) return console.error(err);

    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);

      // change the password to the hashed version
      user.password = hash;
      next();
    });

  });
});

// ----------------------------------------------
// Compare password hash
// ----------------------------------------------
userSchema.methods.comparePassword = function(password) {
  var user = this;
  // ----------------------------------------------
  // SYNC CALL FOR NOW
  // ----------------------------------------------
  return bcrypt.compareSync(password, user.password);
};

module.exports = {
  User: mongoose.model('User', userSchema)
};