var app = app || {};

'use strict';

app.ajaxRequester = (function() {
    var baseUrl = "https://api.parse.com/1/";

   var headers = {
		"X-Parse-Application-Id": "aN0XX6pFmd8FNhE8lEQNVcYZA8uLx6NJDrg7Qfx1",
		"X-Parse-REST-API-Key": "8mK9OSAAwrnPiiMKL2fFXso1KP0beIWyCznhLXvU"
	}

    function login(username, password, success, error) {
        jQuery.ajax({
            method: "GET",
            headers: headers,
            url: baseUrl + "login",
            data: {username: username, password: password},
            success: success,
            error: error
        });
    }

    function register(username, password, success, error) {
        jQuery.ajax({
            method: "POST",
            headers: headers,
            url: baseUrl + "users",
            data: JSON.stringify({username: username, password: password}),
            success: success,
            error: error
        });
    }

    function addSessionTokenToHeaders(sessionToken) {
        var headersWithSessionToken = JSON.parse(JSON.stringify(headers));
        headersWithSessionToken['X-Parse-Session-Token'] = sessionToken;
        return headersWithSessionToken;
    }

    function getBookmarks(sessionToken, success, error) {
        var headersWithToken = addSessionTokenToHeaders(sessionToken);
        jQuery.ajax({
            method: "GET",
            headers: headersWithToken,
            url: baseUrl + "classes/Bookmark",
            success: success,
            error: error
        });
    }

    function createBookmark(title, url, userId, success, error) {
        var bookmark = {title: title, url: url, ACL : {}};
        bookmark.ACL[userId] = {"write": true, "read": true};
        jQuery.ajax({
            method: "POST",
            headers: headers,
            url: baseUrl + "classes/Bookmark",
            data: JSON.stringify(bookmark),
            success: success,
            error: error
        });
    }

    function deleteBookmark(sessionToken, bookmarkId, success, error) {
        var headersWithToken = addSessionTokenToHeaders(sessionToken);
        jQuery.ajax({
            method: "DELETE",
            headers: headersWithToken,
            url: baseUrl + "classes/Bookmark/" + bookmarkId,
            success: success,
            error: error
        });
    }

    return {
        login: login,
        register: register,
        getBookmarks: getBookmarks,
        createBookmark: createBookmark,
        deleteBookmark: deleteBookmark
    };
})();