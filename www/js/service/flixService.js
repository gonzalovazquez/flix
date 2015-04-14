flix.service('flixService', ['$http', 'API_KEY', function($http, API_KEY) {

	var hostName = 'http://filmviz.ca/api/films';

	function requestExternal(method, endpoint) {
		return $http({
			method: method,
			url: 'http://omdbapi.com/' + endpoint,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		});
	}

	function requestImgExternal(method, id) {
		return $http({
			method: method,
			url: 'http://img.omdbapi.com/?i=' + id + '&apikey=' + API_KEY.value,
		});
	}

	function deleteExternal(method, id) {
		return $http({
			method: method,
			url: hostName + '/' + id,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		});
	}

	function requestInternal(method, data) {
		return $http({
			method: method,
			url: hostName,
			headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin' : '*', 'Access-Control-Allow-Headers' : 'Origin, X-Requested-With, Content-Type, Accept'},
			data: data
		});
	}

	this.getMovie = function(collection, endpoint) {
		if (collection) {
			return requestInternal('GET', null);
		} else {
			return requestExternal('GET', endpoint);
		}		
	};

	this.getPoster = function(id) {
		return requestImgExternal('GET', id);
	}
  
	this.saveMovie = function(data) {
		return requestInternal('POST', data);
	};

	this.deleteMovie = function(id) {
		return deleteExternal('DELETE', id);
	};

}]);