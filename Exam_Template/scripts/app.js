(function() {
	$(document).ready(function() {
		showLoginView();
		addEventListeners();
	})

	function addEventListeners() {
		$('#registerViewButton').on('click', function() {
			showRegisterView();
		});

		$('#loginViewButton').on('click', function() {
			showLoginView();
		});

		$('#register-button').on('click', function() {
			registerClicked();
		});

		$('#login-button').on('click', function() {
			loginClicked();
		});
	}

	function showLoginView() {
		$('#register-button').hide();
		$('#login-button').show();
		$('#loginViewButton').hide();
		$('#registerViewButton').show();
	}

	function showRegisterView() {
		$('#login-button').hide();
		$('#register-button').show();
		$('#registerViewButton').hide();
		$('#loginViewButton').show();
	}

	function registerClicked() {}

	function loginClicked() {
		var username = $('#username').val();
		var password = $('#password').val();
		app.ajaxRequester.login(username, password,
			authSuccess, function (argument) {
				console.log(JSON.parse(argument.responseText).error)
			});
	}

	function authSuccess(data) {

		userSession.login(data);
		showCurrentUser(data);
	}

	function showCurrentUser(data) {
		$('h4 span').html('');
		$('h4 span').append('Current user is: ' + data.username);
	}

	function loginError(error) {
		showAjaxError("Login failed", error);
	}

	function showAjaxError(msg, error) {
		console.log(error.readyState)
		var errMsg = error.error;
		if (errMsg && errMsg.error) {
			showErrorMessage(msg + ": " + error.readyState);
		} else {
			showErrorMessage(msg + ".");
		}
	}

	function showErrorMessage(msg) {
		noty({
			text: msg,
			type: 'error',
			layout: 'topCenter',
			timeout: 5000
		})
	}

	var userSession = {
		login: function(data) {
			sessionStorage['currentUser'] = JSON.stringify(data);
		},
		getCurrentUser: function() {
			var userData = sessionStorage['currentUser'];
			if (userData) {
				return JSON.parse(sessionStorage['currentUser']);
			}
		},
		logout: function() {
			delete sessionStorage['currentUser'];
		}
	}
}())