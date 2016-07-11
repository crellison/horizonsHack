var days = []
for (var i = 0; i < 180; i++) {
	days.push(i)
}
var days = days.map(function(e) {
	var day = new Date(Date.now()-e*1000*60*60*24)
	return day.toDateString()
})

angular.module('mainCtrl', ["chart.js"])

.controller('mainController', function($rootScope, $scope, $location, Auth, $http, $routeParams) {
	
	$http({
		method: 'GET',
		url: '/api/strava_data'
	}).then(function(data) {
		console.log('inside data control')
		// console.log(data)
		console.log($routeParams['q'])
		var colors = ['#fc4c02']
	if (!$routeParams['q']) {
		$scope.age = data.data[data.data.length-1].age
		$scope.data = data.data.map(function(e) {return e.age})
		$scope.series = 'Age'
		$scope.title = 'Your Button Age'
	} else {
		$scope.data = [
			data.data.map(function(e) {return e.fitness}),
			data.data.map(function(e) {return e.fatigue}),
			data.data.map(function(e) {return e.form})
		].reverse()
		colors = ['rgba(0, 146, 190,.7)','rgba(254, 194, 71,.7)', 'rgba(252, 76,2,.7)']
		$scope.series = ['Form', 'Fatigue', 'Fitness']
		$scope.title = 'Fitness, Fatigue, and Form'
	}
  $scope.labels = days;
  
  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };
  console.log(colors)
  $scope.datasetOverride = colors.map(function(e) {
  			return {
					fill: true,
					type: 'line',
					lineTension: 0.1,
					fillColor: e,
					backgroundColor: e,
					borderColor: e,
					fillOpacity: 0.5,
					borderDash: [],
					borderDashOffset: 0.0,
					pointBorderColor: "rgba(0,0,0,0)",
					pointBackgroundColor: "rgba(0,0,0,0)",
					pointHoverBackgroundColor: "rgba(0,0,0,0)",
					pointHoverBorderColor: "rgba(0,0,0,0)",
				}
			})
  $scope.datasetOverride.length===1 ? $scope.datasetOverride = $scope.datasetOverride[0] : null
  $scope.options = {
    scales: {
				xAxes: [{
					display: false,
				}],
				yAxes: [{
					display: false,
				}]
			}
  }
  })

	var vm = this;

	// get info if a person is logged in
	vm.loggedIn = Auth.isLoggedIn();
	vm.isStrava = Auth.isStrava();

	// check to see if a user is logged in on every request
	$rootScope.$on('$routeChangeStart', function() {
		vm.loggedIn = Auth.isLoggedIn();	

		// get user information on page load
		Auth.getUser()
			.then(function(data) {
				vm.user = data.data;
			});	
	});	

	// function to handle login form
	vm.doLogin = function() {
		vm.processing = true;

		// clear the error
		vm.error = '';

		Auth.login(vm.loginData.email, vm.loginData.password)
			.success(function(data) {
				vm.processing = false;			

				// if a user successfully logs in, redirect to users page
				if (data.success)			
					$location.path('/');
				else 
					vm.error = data.message;
				
			});
	};

	// function to handle logging out
	vm.doLogout = function() {
		Auth.logout();
		vm.user = '';
		
		$location.path('/login');
	};

});