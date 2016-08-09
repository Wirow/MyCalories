angular.module("calApp")
	.controller('logonCtrl', ["$scope", "$rootScope", "$state", function($scope, $rootScope, $state){
		$scope.formValidation = false;
		$scope.userData = {
			name: "",
			weight: 0,
			period: 0
		};

		$scope.saveUserData = function(user) {
			if ($scope.userDataForm.$valid === false) {
				$scope.formValidation = true;
				return;
			} else {
				$scope.formValidation = false;
				$rootScope.userData = user;
				$state.go("main.welcome");
			}
		}; 
	}]);