(function() {
	$(document).ready(function() {
		showLoginView();
		addEventListeners();
	})

	// Event handlers
	function addEventListeners() {
		var selector = '#main-content';
		registerViewClicked.call(this, selector);
		loginViewClicked.call(this, selector);
		registerClicked.call(this, selector);
		loginClicked.call(this, selector);
		logoutClicked.call(this, 'header');
		deleteBookmarkButtonClicked.call(this, '.bookmark-box');
	}

	var loginViewClicked = function(selector) {
		$(selector).on('click', '#loginViewButton', showLoginView);
	}

	var registerViewClicked = function(selector) {
		$(selector).on('click', '#registerViewButton', showRegisterView);
	}

	var loginClicked = function(selector) {
		$(selector).on('click', '#login-button', function() {
			var username = $('#username').val();
			var password = $('#password').val();
			sessionStorage['username'] = username;
			app.ajaxRequester.login(username, password,
				authSuccess, loginError);
		})
	}

	var registerClicked = function(selector) {
		$(selector).on('click', '#register-button', function() {
			var username = $('#username').val();
			var password = $('#password').val();
			sessionStorage['username'] = username;
			app.ajaxRequester.register(username, password,
				authSuccess, registerError);
		})
	}

	var logoutClicked = function() {
		$('header').on('click', '#logout-button', function() {
			$('#logout-button').hide();
			showLoginView();
			userSession.logout();
			showCurrentUser();
		})
	}

	var deleteBookmarkButtonClicked = function (selector) {
		var _this = this;
		$(selector).on('click', '.delete-bookmark-btn', function (ev) {
			var deleteConfirmed = confirm('Do you want to delete this bookmark');
			if (deleteConfirmed) {
				var objectId = $(this).parent().data('id');
				_this._data.bookmarks.delete(objectId)
					.then(function (data) {
						$(ev.target).parent().remove();
					},
					function (error) {
						console.log(error);
					})
			};
		})
	}

	// Show login, register and bookmarks views
	function showLoginView() {
		$('#login').show();
		var username = $('#username').val('toni');
		var password = $('#password').val('123');
		$('#login-button').show();
		$('#registerViewButton').show();
		$('#register-button').hide();
		$('#loginViewButton').hide();
	}

	function showRegisterView() {
		var username = $('#username').val('');
		var password = $('#password').val('');
		$('#login-button').hide();
		$('#register-button').show();
		$('#registerViewButton').hide();
		$('#loginViewButton').show();
	}

	function showBookmarksView() {
		$('#login').hide();
		$('#logout-button').show();
	}

	function showAllBookmarks(data) {
		var sessionToken = data.sessionToken;
		app.ajaxRequester.getBookmarks(sessionToken, getbookmarksSuccess, showErrorMessage);
	}

	function getbookmarksSuccess(data) {
		var $bookmarksContainer = $('#bookmarks');
		$bookmarksContainer.html('');

		for (var b in data.results) {
			var bookmark = data.results[b];
			var $bookmarkDiv = $('<div class="bookmark-box">');

			var $title = $('<div class="bookmark-title">');
			$title.text(bookmark.title);
			$bookmarkDiv.append($title)
			
			var $url = $('<a class="bookmark-url" target="_blank">')
			$url.text(bookmark.url);
			$url.attr("href", bookmark.url);
			$bookmarkDiv.append($url);

			var $deleteButton = $('<a href="#">Delete</a>');
            $deleteButton.click(deleteBookmarkButtonClicked);
            $bookmarkDiv.append($deleteButton);
			$('#bookmarks').append($bookmarkDiv);
		};
	}

	function authSuccess(data) {
		userSession.login(data);
		showCurrentUser(data);
		showBookmarksView();
		showAllBookmarks(data);
	}

	function showCurrentUser(data) {
		$('h1 span').html('');
		if (userSession.getCurrentUser()) {
			$('h1 span').append('Current user is: ' + userSession.getCurrentUser().username);
		};
	}

	// Error messages
	function loginError(error) {
		showAjaxError("Login failed", error);
	}

	function registerError(error) {
		showAjaxError("Register failed", error);
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
			var dataWithUsername = JSON.parse(JSON.stringify(data));
			dataWithUsername['username'] = sessionStorage['username'];
			sessionStorage['currentUser'] = JSON.stringify(dataWithUsername);
		},
		getCurrentUser: function() {
			var userData = sessionStorage['currentUser'];
			if (userData) {
				return JSON.parse(sessionStorage['currentUser']);
			}
		},
		logout: function() {
			delete sessionStorage['currentUser'];
			delete sessionStorage['username'];
		}
	}
}())