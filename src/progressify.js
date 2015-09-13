/*! progressify v0.1.0 | (c) 2015 Andrew Carlson  */
;(function($) {

	// Debounce function to prevent using up all browser resources on scroll.
	var debounce = function(func, wait, immediate) {
		var timeout;
		return function() {
			var context = this, args = arguments;
			var later = function() {
				timeout = null;
				if (!immediate) func.apply(context, args);
			};
			var callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		};
	};

	$.fn.progressify = function() {

		var $element = this;
		var height = $element.outerHeight();
		var start = $element.offset().top;

		$element.prepend('<progress class="progressify-bar"></progress>');

		var $progressBar = $('.progressify-bar');

		var showProgress = debounce(function($element) {
			var currentOffset = $(window).scrollTop() - start;
			var percentage = currentOffset / height;
				percentage = percentage * 100 < 101 ? percentage * 100 : 100;

			$progressBar.attr('value', percentage);
		}, 250);

		$(window).on('scroll', showProgress);

		return $element;

	}

}(jQuery));