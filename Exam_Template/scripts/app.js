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
		var username = $('#username').val('');
		var password = $('#password').val('');
		$('#register-button').hide();
		$('#login-button').show();
		$('#loginViewButton').hide();
		$('#registerViewButton').show();
	}

	function showRegisterView() {
		var username = $('#username').val('');
		var password = $('#password').val('');
		$('#login-button').hide();
		$('#register-button').show();
		$('#registerViewButton').hide();
		$('#loginViewButton').show();
	}

	function registerClicked() {
		var username = $('#username').val();
		var password = $('#password').val();
		app.ajaxRequester.register(username, password,
			authSuccess, registerError);
	}

	function loginClicked() {
		var username = $('#username').val();
		var password = $('#password').val();
		app.ajaxRequester.login(username, password,
			authSuccess, loginError);
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

	function registerError(error) {
		showAjaxError("Login failed", error);
	}


	function showAjaxError(msg, error) {
		var errMsg = JSON.parse(error.responseText).error;
		if (errMsg) {
			showErrorMessage(msg + ": " + errMsg);
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