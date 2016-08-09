angular.module("calApp")
	.service("FoodDataService", ["$http", function($http) {
		this.getFoodData = function(cb) {
			$http.get("http://wirow.hol.es/foodData.json").then(
				function(res) {
					cb(true, res.data)
				},
				function(res) {
					cb(false, res.data);
				}
			)
		}
	}]);