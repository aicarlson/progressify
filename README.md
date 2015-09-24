progressify
============

progressify is a jQuery plugin to visualize the amount of time left reading an article or page.

Usage
-----

Include both progressify.min.js and progressify.min.css on your page. progressify.min.js should be included after jQuery.

Progressify should be instantiated on the article body that you want to track. 

`$('.article-wrapper').progressify();`

It accepts several options:

`progressWrapper`: jQuery Selector (.class or #id or element). The on page element that functions as the wrapper for the progress bar.

`progressBar`: jQuery Selector (.class or #id or element). The on page element that functions as the progress bar. This element receives the completion percentage. 

`debounceTime`: Integer. The amount of time in milliseconds to wait before firing on scroll. This prevents the browser from being overburdened by scroll events. Default is `100`

`position`: String. Accepts `left` or `top` or `bottom` or `right`. If this is passed, the progressWrapper will receive a fixed position.

`cssClass`: String. Adds optional CSS class(es) to progressWrapper element.

`showData`: Boolean. Show the data-progress attribute on the progressBar element.

`showProgress`: Boolean. Visibly display the progress as a percentage.

`showProgressCustom`: jQuery Selector (.class or #id or element). The on page element that should hold the visible percentage completed.

`showProgressPosition`: String. Accepts `inside` or `outside`. Determines whether the visible percentage progress should be inside or outside of the progress bar.

If `progressWrapper` and `progressBar` aren't specified, progressify falls back to it's own created elements.

Examples
--------

If you wanted to run progressify with the default created elements, show the progress as a percentage and slow down how often the function runs:

`$('element').progressify({
  showProgress: true,
  debounceTime: 300
});`
