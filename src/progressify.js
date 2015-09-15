/*! progressify v0.2.0 | (c) 2015 Andrew Carlson  */
;(function($) {

	$.fn.progressify = function(options) {

		if( options === 'destroy') {

			/*
			Removes the scroll event handler and the progress bar if it was added.
			*/
			$(window).off('scroll', showProgress);
			$('.progressify-bar').remove();

			return this;

		} else {

			/*
			The article or post on which the progress is to be calculated.
			*/
			var $article = this;

			if( $article.length ) {

				var height = $article.outerHeight();

				/*
				The position on the page at which to start calculating 'read time.'
				*/
				var start = $article.offset().top;

				/*
				Default progress css class
				*/
				var defaultProgress = '.progressify-value';

				/*
				Debounce function to prevent using up all browser resources on scroll.
				*/
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

				/*
				Only instantiate options variable if it hasn't already been created.
				*/
				var options = options || {};

				/*
				The element that functions as a progress bar. 
				This is the element that receives the completion percentage.
				*/
				options.progressBar = options.progressBar ? options.progressBar : defaultProgress;

				/*
				The amount of time in milliseconds to wait before calling the function again.
				This is to prevent the browser from using up too many resources by calling the scroll event non-stop.
				*/
				options.debounceTime = !isNaN(options.debounceTime) ? options.debounceTime : 100;

				/*
				Optional position of the progress bar. 
				Accepts: 'left' || 'top' || 'bottom' || 'right'
				If a position is passed, the bar will receive a fixed position.
				If the default progress bar is used, the bar will receive a fixed bottom position.
				Otherwise no position will be applied.
				*/
				if( options.position === undefined ) {

					if( options.progressBar === defaultProgress ) {
						options.position = 'bottom';
					}

				} else {

					if( options.position.match(/^(top|bottom|left|right)$/) ) {
						options.position = options.position;
					}

				}

				/*
				height or width depending on position.
				*/
				if( options.position !== undefined ) {

					if( options.position.match(/^(top|bottom)$/) ) {
						options.orientation = 'width';
					} else if( options.position.match(/^(left|right)$/) ) {
						options.orientation = 'height';
					}

				}

				/*
				Adds optional CSS classes to progress element.
				*/
				options.cssClass = typeof options.cssClass === 'string' ? options.cssClass : '';

				/*
				Optionally force the data-progress attribute
				*/
				options.showData = options.showData ? options.showData : undefined;

				/*
				Optionally show the progress as a percentage
				*/
				options.showProgress = options.showProgress ? options.showProgress : undefined;

				/*
				Percentage completed element
				*/
				options.showProgressCustom = typeof options.showProgressCustom === 'string' ? options.showProgressCustom : '.progressify-progress';

				/*
				If options.progressBar is the default option, create the progress element.
				*/
				if( options.progressBar === defaultProgress ) {
					$article.append('<div class="progressify-bar"><div class="progressify-value"></div></div>');
				}

				/*
				Add optional CSS classes as well as the position class to the element
				*/
				var $progBar = $(options.progressBar);

				/*
				If a percentage of progress is desired AND the user didn't specify a custom percentage element:
				Add the percentage after the progress bar.
				*/
				if( options.showProgress === true && showProgressCustom === '.progressify-progress' ) {
					$progBar.after('<span class="' + showProgressCustom + '"></span>');
				}

				var newClasses = options.cssClass;

				if( options.position !== undefined ) {
					newClasses += ' position-' + options.position;
				}
				
				$progBar.addClass(newClasses);

				/*
				Actual progression function
				*/
				var showProgress = debounce(function(event) {

					var $article = event.data.$article;
					var options = event.data.options;

					/*
					The offset that the article is currently sitting at
					*/
					var currentOffset = $(window).scrollTop() - start;
					var percentage = (currentOffset / height) >= 0 ? currentOffset / height : 0;
						percentage = percentage * 100 < 101 ? Math.floor(percentage * 100) : 100;
						percentage = percentage + '%';
					var $progBar = $(options.progressBar);

					/*
					If the orientation === undefined OR if showData === true apply a data attribute with the progress
					*/
					if( options.orientation === undefined || options.showData === true) {
						$progBar.attr('data-progress', percentage);
					}

					/*
					Update the progress completion number if showProgress === true
					*/
					if( options.showProgress === true ) {
						$(options.showProgressCustom).html(percentage);
					}

					/*
					If the orientation (width | height) has been defined, set the completion as a percentage of the orientation.
					*/
					if( options.orientation !== undefined ) {
						$progBar.css(options.orientation, percentage);
					}

				}, options.debounceTime);

				/*
				Attach the event handler to scroll
				*/
				$(window).on('scroll', {$article: $article, options: options}, showProgress);

			}

			/*
			Return the original object to the jQuery chain
			*/
			return $article;
		}

	}

}(jQuery));