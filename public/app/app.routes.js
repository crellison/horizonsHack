angular.module('app.routes', ['ngRoute'])

.config(function($routeProvider, $locationProvider) {

	$routeProvider

		// route for the home page
		.when('/', {
			templateUrl : 'app/views/pages/home.html'
		})

		.when('/token_exchange', {
			templateUrl : 'app/views/pages/token.html',
			controller: 'userTokenController',
			controllerAs: 'user'
		})
		
		// login page
		.when('/login', {
			templateUrl : 'app/views/pages/login.html',
   			controller  : 'mainController',
    		controllerAs: 'login'
		})

		// form to sign up
		.when('/signup', {
			templateUrl: 'app/views/pages/signup.html',
			controller: 'userCreateController',
			controllerAs: 'user'
		})

		// user preferences page
		.when('/preferences', {
			templateUrl: 'app/views/pages/preferences.html',
			controller: 'userEditController',
			controllerAs: 'user'
		})

		.when('/preferences/:user_id', {
			templateUrl: 'app/views/pages/preferences.html',
			controller: 'userEditController',
			controllerAs: 'user'
		})

		// show all users
		.when('/users', {
			templateUrl: 'app/views/pages/users/all.html',
			controller: 'userController',
			controllerAs: 'user'
		})

		.when('/users/create', {
			templateUrl: 'app/views/pages/users/single.html',
			controller: 'userCreateController',
			controllerAs: 'user'
		})

		.when('/users/edit', {
			templateUrl: 'app/views/pages/users/single.html',
			controller: 'userEditController',
			controllerAs: 'user'
		})

		// page to edit a user
		.when('/users/:user_id', {
			templateUrl: 'app/views/pages/users/single.html',
			controller: 'userEditController',
			controllerAs: 'user'
		});

	$locationProvider.html5Mode(true);

});