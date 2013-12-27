(function($) {
	$.fn.simpleAccordion = function(options) {

		var settings = $.extend({
			simultaneous: false,
			slideSpeed: 600,
			easingDown: 'easeOutCubic',
			easingUp: 'easeInCubic',
			scrollTopSpeed: 600,
			scrollTopOffset: 300,
			focusOnOpen: true
		}, options || {} );

		var $this = $(this),
			$tabs = $this.find('.tab'),
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
									complete: function() {
										if ( settings.focusOnOpen ) {
											$('html, body').animate({
												scrollTop: ( $(this).offset().top - settings.scrollTopOffset )
											}, settings.scrollTopSpeed);
										}
									}
								});
								if ( !settings.simultaneous )
									$tabs.not($(this)).not('.closed').trigger('click');
							}
							else {
								$($panes[i]).slideUp({
									duration: settings.slideSpeed,
									easing: settings.easingUp
								});
							}
							$(this).toggleClass('open').toggleClass('closed').parent().toggleClass('active');
							e.preventDefault();
						});
				});

			$.each( $panes, function(k, v){
				$(v).hide();
			});
		}

		_init();

	}
})(jQuery);