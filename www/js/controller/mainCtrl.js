flix.controller('mainCtrl', ['flixService', '$scope', '$ionicModal', function(flixService, $scope, $ionicModal) {
	flixService.getMovie(true).then(function(res) {
		$scope.films = res.data;
	});

	// Create and load the Modal
	  $ionicModal.fromTemplateUrl('new-task.html', function(modal) {
	    $scope.taskModal = modal;

	  	}, {
		   scope: $scope,
		   animation: 'slide-in-up'
		});

	  // Called when the form is submitted
	  $scope.searchMovie = function (title) {
	  	var data, storeFilm;

			data = '?t=' + title.replace(" ", '%20');

			flixService.getMovie(false, data).then(function (res) {
				storeFilm = 'title=' + res.data.Title + 
				'&year=' + convertToInt(res.data.Year) +
				'&rated=' + res.data.Rated + 
				'&released=' + res.data.Released +
				'&runtime=' + convertToInt(res.data.Runtime) +
				'&genre=' + convertToArray(res.data.Genre) +
				'&director=' + res.data.Director + 
				'&write=' + convertToArray(res.data.Writer) +
				'&actors=' + convertToArray(res.data.Actors) + 
				'&plot=' + res.data.Plot +
				'&language=' + convertToArray(res.data.Language) + 
				'&country=' + res.data.Country +
				'&awards=' + res.data.Awards + 
				'&poster=' + res.data.Poster +
				'&metascore=' + convertToInt(res.data.Metascore) +
				'&imdbRating=' + parseFloat(res.data.imdbRating) +
				'&imdbVotes=' + convertToInt(res.data.imdbVotes) +
				'&imdbID=' + res.data.imdbID +
				'&response=' + res.data.Response;

				flixService.saveMovie(storeFilm);

				flixService.getMovie(true).then(function(res) {
					$scope.films = res.data;
				});

				$scope.taskModal.hide();

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