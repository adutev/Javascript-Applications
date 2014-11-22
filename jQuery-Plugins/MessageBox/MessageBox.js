(function ($) {
	$.fn.messageBox = function () {
		$(this).append('<span>');
		return $(this);
	}

	$.fn.success = function (successMessage) {
		$(this).find('span').text(successMessage).css('color','cyan').hide().fadeIn(1000).fadeOut(3000);
	}

	$.fn.error = function (errorMessage) {
		$(this).find('span').text(errorMessage).css('color','red').hide().fadeIn(1000).fadeOut(3000);
	}
})(jQuery)