/*!
 * jQuery simple accordion
 * Original author: @louisstanard
 * Licensed under the MIT license
 */

;(function ( $, window, document ) { 

	var pluginName = 'simpleAccordion',
		defaults = {
			activeClass: 'active',
			tabClass: 'tab',
			simultaneous: false,
			slideSpeed: 600,
			easingDown: 'swing',
			easingUp: 'swing',
			scrollTopSpeed: 600,
			scrollTopOffset: 300,
			focusOnOpen: true,
			openComplete: function() {},
			closeComplete: function() {}
		};

	// Plugin constructor
	function plugin( element, options ) {

		this._element = element[0];
		this._options = $.extend( {}, defaults, options );
		this._defaults = defaults;
		this._name = pluginName;
		
		this.init();

	}

	plugin.prototype.init = function() {

		var options = this._options, panes, tabs;

		this._element._panes = panes = {};
		this._element._tabs = tabs = $(this._element).find('.' + this._options.tabClass);
		
		tabs.each(function(i) {
			panes[i] = $(this).next('div')[0];
			$(this)
				.toggleClass('closed')
				.on('click', function(e) {
					if ( $(this).hasClass('closed') ) {
						// Open
						$(panes[i]).slideDown({
							duration: options.slideSpeed,
							easing: options.easingDown,
							start: function() {
								if ( options.focusOnOpen ) {
									var t = 0, scrollTopPosition;
									for (var j in panes) {
										if ( j < i && $(panes[i]).parent().hasClass(options.activeClass) )
											t = t + $(panes[i]).innerHeight();
									}
									scrollTopPosition = options.simultaneous ? ( ($(this).offset().top) - options.scrollTopOffset ) : ( ($(this).offset().top - t) - options.scrollTopOffset ) ;
									$('html, body').animate({
										scrollTop: scrollTopPosition
									}, options.scrollTopSpeed);
								}
							},
							complete: function() {
								options.openComplete();
							}
						});
					}
					else {
						// Close
						$(panes[i]).slideUp({
							duration: options.slideSpeed,
							easing: options.easingUp,
							complete: function() {
								options.openComplete();
							}
						});
					}
					$(this).toggleClass('open').toggleClass('closed').parent().toggleClass(options.activeClass);
					e.preventDefault();
				});
		});

		this.close();

	}

	plugin.prototype.close = $[pluginName].close = function() {
		// This simply hides all divs, should do more to close everything down
		$.each( this._element._panes, function(k, v) {
			$(v).slideUp();
		});
	}

	$.fn[pluginName] = $[pluginName] = function ( options ) {

		/*return this.each(function () {
			new plugin( this, options );
		});*/

		return this.each(function () {
			if (!$.data(this, 'plugin_' + pluginName)) {
				$.data(this, 'plugin_' + pluginName, new plugin( $(this), options ));
			}
		});

	}

	


})( jQuery, window, document );


// Initialization test 1
$('#accordion-demo').simpleAccordion();

// Initialization test 2
$('#close-all').on('click', function(e) {
	e.preventDefault();
	$('#accordion-demo').simpleAccordion().close();
});