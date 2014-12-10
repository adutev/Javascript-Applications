var app = app || {};

app.ajaxRequester = (function() {
	var baseUrl = "https://api.parse.com/1/";

	var headers = {
		"X-Parse-Application-Id": "C0NsUSFtKPOq4TaGeqMf62XI6IG7HXydrpkjvSQX",
		"X-Parse-REST-API-Key": "0SL1EbtpvbP2QajiY0ENXKAjQkYLOmlrkgbNnBgN"
	}

	function login(username, password, success, error) {
		$.ajax({
			url: baseUrl + 'login',
			method: 'GET',
			headers: headers,
			data: {
				username: username,
				password: password
			},
			success: success,
			error: error
		})
	}
	return {
		login: login //,
			//register: register
	}

}());