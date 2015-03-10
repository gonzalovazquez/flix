flix.service('flixService', ['$http', function($http) {

	var hostName = 'http://filmviz.ca/api/films';

	function requestExternal(method, endpoint) {
		return $http({
			method: method,
			url: 'http://www.omdbapi.com/' + endpoint,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		});
	}

	function deleteExternal(method, id) {
		return $http({
			method: method,
			url: hostName + '/' +id,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		});
	}

	function requestInternal(method, data) {
		return $http({
			method: method,
			url: hostName,
			headers: {'Content-Type': 'application/x-www-form-urlencoded', 'Access-Control-Allow-Origin' : '*', 'Access-Control-Allow-Headers' : 'Origin, X-Requested-With, Content-Type, Accept'},
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
  
	this.saveMovie = function(data) {
		return requestInternal('POST', data);
	};

	this.deleteMovie = function(id) {
		return deleteExternal('DELETE', id);
	};

}]);