;(function($) {
	$.fn.simpleAccordion = function(options) {

		var settings = $.extend({
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
		}, options || {} );

		var $this = $(this),
			$tabs = $this.find('.' + settings.tabClass),
			$panes = {};

		function _init() {
			$tabs
				.each(function(i){
					$panes[i] = $(this).next('div')[0];
					$(this)
						.toggleClass('closed')
						.on('click', function(e){
							if ( $(this).hasClass('closed') ) {
								$($panes[i]).slideDown({
									duration: settings.slideSpeed,
									easing: settings.easingDown,
									start: function() {
										if (settings.focusOnOpen) {
											var t = 0;
											for (var j in $panes) {
												if ( j < i && $($panes[j]).parent().hasClass(settings.activeClass) )
													t = t + $($panes[j]).innerHeight();
											}
											var p = settings.simultaneous ? ( ($(this).offset().top) - settings.scrollTopOffset ) : ( ($(this).offset().top - t) - settings.scrollTopOffset );
											$('html, body').animate({
												scrollTop: p
											}, settings.scrollTopSpeed);
										}
									},
									complete: function() {
										settings.openComplete();
									}
								});
								if ( !settings.simultaneous )
									$tabs.not($(this)).not('.closed').trigger('click');
							}
							else {
								$($panes[i]).slideUp({
									duration: settings.slideSpeed,
									easing: settings.easingUp,
									complete: function() {
										settings.closeComplete();
									}
								});
							}
							$(this).toggleClass('open').toggleClass('closed').parent().toggleClass(settings.activeClass);
							e.preventDefault();
						});
				});

			$.each( $panes, function(k, v){
				$(v).hide();
			});
		}

		_init();

	};

})(jQuery);