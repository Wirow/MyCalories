angular.module("calApp")
	.controller('welcomeCtrl', ['$scope', function($scope){
		$scope.text = "Welcome page";
	}]);