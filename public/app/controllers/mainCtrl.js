var days = []
for (var i = 0; i < 180; i++) {
	days.push(i)
}
var days = days.map(function(e) {
	var day = new Date(Date.now()-e*1000*60*60*24)
	return day.toDateString()
})

angular.module('mainCtrl', ["chart.js"])

.controller('mainController', function($rootScope, $scope, $location, Auth, $http) {
	
	$http({
		method: 'GET',
		url: '/api/strava_data'
	}).then(function(data) {
		console.log('inside data control')
		// console.log(data)
	
	$scope.age = data.data[data.data.length-1]
  $scope.labels = days;
  $scope.data = data.data
  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };
  $scope.datasetOverride = {
				label: "Age",
				fill: true,
				type: 'line',
				lineTension: 0.1,
				fillColor: "#fc4c02",
				backgroundColor: "#fc4c02",
				borderColor: "#fc4c02",
				borderDash: [],
				borderDashOffset: 0.0,
				pointBorderColor: "rgba(0,0,0,0)",
				pointBackgroundColor: "rgba(0,0,0,0)",
				pointHoverBackgroundColor: "rgba(0,0,0,0)",
				pointHoverBorderColor: "rgba(0,0,0,0)",
			}
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