var days = []
for (var i = 0; i < 180; i++) {
	days.push(i)
}
var days = days.map(function(e) {
	var day = new Date(Date.now()-e*1000*60*60*24)
	return day.toDateString()
})

angular.module('mainCtrl', ["chart.js"])

.controller('mainController', function($rootScope, $scope, $location, Auth) {

  $scope.labels = days;
  $scope.data = [70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,69,66,64,61,64,62,63,60,58,56,66,62,64,60,59,56,58,54,51,49,47,46,44,43,42,42,41,41,41,41,41,46,45,44,44,44,43,43,43,43,43,43,43,44,44,44,45,45,45,46,46,47,47,48,49,49,56,55,54,61,58,56,54,53,51,50,50,49,52,54,55,53,51,50,49,48,47,47,47,46,46,46,46,47,47,47,54,52,51,51,55,59,56,61,57,54,56,61,56,53,50,47,45,43,50,49,47,44,42,41,39,38,38,37,37,36,36,36,36,37,37,37,38,38,39,39,40,40,41,41,42,42,43,44,44,45,45,46,46,47,47,48,48,49,49,50,50].reverse();
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
  };


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