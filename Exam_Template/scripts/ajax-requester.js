var app = app || {};

app.ajaxRequester = (function() {
	var baseUrl = "https://api.parse.com/1/";

	var headers = {
		"X-Parse-Application-Id": "aN0XX6pFmd8FNhE8lEQNVcYZA8uLx6NJDrg7Qfx1",
		"X-Parse-REST-API-Key": "8mK9OSAAwrnPiiMKL2fFXso1KP0beIWyCznhLXvU"
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

	function register(username, password, success, error) {
		$.ajax({
            method: "POST",
            headers: headers,
            url: baseUrl + "users",
            data: {username: username, password: password},
            success: success,
            error: error
        });
	}
	return {
		login: login,
		register: register
	}

}());