(function ($) {
	$.fn.toggleTree = function () {
		$(this).toggle();
	}

	$(document).ready(function($) {
		$('li ul').hide();
		
		$('.first-level li').has('ul').click(function() {
			$('.second-level').toggleTree();
		});

		$('.second-level li').has('ul').click(function() {
			$('.third-level').toggleTree();
		});
	})

})(jQuery)