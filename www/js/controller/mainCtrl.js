flix.controller('mainCtrl', ['flixService', '$scope', '$ionicModal', function(flixService, $scope, $ionicModal) {
	flixService.getMovie(true).then(function(res) {
		$scope.films = res.data;
	});

	$scope.onItemDelete = function(film) {
		$scope.films.splice($scope.films.indexOf(film), 1);
		flixService.deleteMovie(film._id).then(function(res){
			$scope.films = res.data;
		});
	}

	// Create and load the Modal
	  $ionicModal.fromTemplateUrl('new-task.html', function(modal) {
	    $scope.taskModal = modal;

	  	}, {
		   scope: $scope,
		   animation: 'slide-in-up'
		});

	  $scope.addFilm = function(title) {
	  	var data, storeFilm;

	  	storeFilm = 'title=' + $scope.temp.Title + 
				'&year=' + convertToInt($scope.temp.Year) +
				'&rated=' + $scope.temp.Rated + 
				'&released=' + $scope.temp.Released +
				'&runtime=' + convertToInt($scope.temp.Runtime) +
				'&genre=' + convertToArray($scope.temp.Genre) +
				'&director=' + $scope.temp.Director + 
				'&write=' + convertToArray($scope.temp.Writer) +
				'&actors=' + convertToArray($scope.temp.Actors) + 
				'&plot=' + $scope.temp.Plot +
				'&language=' + convertToArray($scope.temp.Language) + 
				'&country=' + $scope.temp.Country +
				'&awards=' + $scope.temp.Awards + 
				'&poster=' + $scope.temp.Poster +
				'&metascore=' + convertToInt($scope.temp.Metascore) +
				'&imdbRating=' + parseFloat($scope.temp.imdbRating) +
				'&imdbVotes=' + convertToInt($scope.temp.imdbVotes) +
				'&imdbID=' + $scope.temp.imdbID +
				'&response=' + $scope.temp.Response;

		flixService.saveMovie(storeFilm);

		flixService.getMovie(true).then(function(res) {
			$scope.films = res.data;
		});

		$scope.taskModal.hide();

	  };

	  // Called when the form is submitted
	  $scope.searchMovie = function (title) {
	  	var data, storeFilm;

			data = '?t=' + title.replace(" ", '%20');

			flixService.getMovie(false, data).then(function (res) {
				$scope.temp = res.data;
			});

		};

	  // Open our new task modal
	  $scope.newTask = function() {
	    $scope.taskModal.show();
	  };

	  // Close the new task modal
	  $scope.closeNewTask = function() {
	    $scope.taskModal.hide();
	  };

	  function convertToInt (value) {
				if (value == 'N/A') {
					return 0;
				} else {
					var replaceComma = value.replace(',','');
					return parseInt(replaceComma);
				}
		}

		function convertToArray (value) { return Array.new = value.split(','); }
}]);