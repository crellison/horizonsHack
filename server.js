var express = require('express')
var morgan = require('morgan')
var mongoose = require('mongoose')
// var MongoStore = require('connect-mongo')(session)
var bodyParser = require('body-parser')
var path = require('path')
var webpack = require('webpack');
var webpackMiddleware = require("webpack-dev-middleware")
var config = require('./webpack.config');

var app = express()
// app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// mongoose.connect(process.env.MONGODB_URI)
// var mongoStore = new MongoStore({mongooseConnection: mongoose.connection})
// app.use(session({
//   secret: process.env.SECRET,
//   store: mongoStore
// }))

// configure our app to handle CORS requests
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  next();
});

// log all requests to the console 
app.use(morgan('dev'));

// ROUTES FOR OUR API =================
// ====================================

// API ROUTES ------------------------
var apiRoutes = require('./routes/api')(app, express);
app.use('/api', apiRoutes);

var compiler = webpack(config)
app.use(webpackMiddleware(compiler, {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true
}))
app.use(require('webpack-hot-middleware')(compiler))

app.use(express.static(path.join(__dirname, 'public')))

// app.use('/api', api)

app.get('/', function(req, res) {
  res.redirect('index.html')
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log('404 error')
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500)
    res.send("Error: " + err.message + "\n" + err)
  })
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500)
  res.send("Error: " + err.message)
})

var server = require('http').Server(app)
var port = process.env.PORT || 3000
server.listen(port, function() {
  console.log('Started, listening on port ', port)
})