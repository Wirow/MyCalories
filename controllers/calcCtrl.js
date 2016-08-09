angular.module("calApp")
	.controller("calcCtrl", ["$scope", "FoodDataService", "$log", "$rootScope", function($scope, FoodDataService, $log, $rootScope){
		$scope.foodData = null;
		$scope.showCalculationResult = false;

		FoodDataService.getFoodData(function(bool, data) {
			if (bool === true) {
				$scope.foodData = data;
			} else if (bool === false) {
				$log.error(res);
			}
		})

		$scope.changeInput = function(cal, amount) {
			var result = (cal/100)*amount;

			if ($rootScope.isNumeric(result)) {
				return result;	
			} else {
				return 0;
			}
			
		}

		$scope.calculateCalories = function() {
			var result = 0

			angular.forEach($scope.foodData, function(value, key) {
				angular.forEach(value.items, function(value, key) {
					result += value.result;
				});
			});

			$scope.calculationResult = Math.round(result * 1000) / 1000;
			$scope.showCalculationResult = true;
		};
	}]);