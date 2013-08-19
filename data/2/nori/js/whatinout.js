/*
 * 
 * WhatInOut
 * Nice fadeInOut effect with jQuery!!!!
 * jQuery 1.4 or higher, jQuery.easing required
 *
 * Licensed under the MIT 
 * Copyright (c) 2010 nori (norimania@gmail.com)
 * 5509 - http://5509.me/
 * 
 * $Update: 2010-05-01 21:41
 * $Date: 2010-04-28 21:14
 * 
 */

(function($) {

	// what global vars and funcs
	var whatInOutEasing = $.easing['easeOutCirc'] ? 'easeOutCirc' : 'swing',
		returnData = function($this) {
			return {
				marginTop: parseInt($this.css('marginTop')),
				marginLeft: parseInt($this.css('marginLeft')),
				width: $this.attr('offsetWidth'),
				height: $this.attr('offsetHeight'),
				opacity: $this.css('opacity')
			}
		},
		writeData = function(name, baseData) {
			if ( $.data(document, name) == null ) {
				$.data(document, name, baseData);
			}		
		},
		returnID = function($this) {
			if ( $this.attr('id') ) {
				return $this.attr('id');
			} else {
				var name = 'what_' + Math.floor(Math.random() * Math.random() * 1000);
				$this.attr('id', name);
				return name;
			}
		};

	// WhatSlideIn
	$.fn.whatSlideIn = function(options) {
		$(this).show();
		var c = $.extend({
				easing: whatInOutEasing,
				duration: 400,
				posIn: 20,
				callback: function(){}
			}, options),
			$this = $(this),
			name = returnID($this),
			baseData = $.data(document, name) != null ? $.data(document, name) : returnData($this);
			
		writeData(name, baseData);
			
		$this
			.css({
				marginTop: baseData.marginTop + parseInt(c.posIn),
				opacity: 0
			})
			.stop(true, false)
			.animate(
				$.data(document, name),
				{
					duration: c.duration,
					easing: c.easing,
					complete: function() {
						c.callback();
						$this.css($.data(document, name));
					}
				}
			);
	}
	
	// WhatSlideOut
	$.fn.whatSlideOut = function(options) {
		$(this).show();
		var c = $.extend({
				easing: whatInOutEasing,
				duration: 400,
				posOut: '-20',
				callback: function(){}
			}, options),
			$this = $(this),
			name = returnID($this),
			baseData = $.data(document, name) != null ? $.data(document, name) : returnData($this);

		writeData(name, baseData);

		$this
			.css($.data(document, name))
			.stop(true, false)
			.animate(
				{
					marginTop: baseData.marginTop + parseInt(c.posOut),
					opacity: 0
				},
				{
					duration: c.duration,
					easing: c.easing,
					complete: function() {
						c.callback();
						$this.hide().css($.data(document, name));
					}
				}
			);
	}
	
	// WhatIn
	$.fn.whatIn = function(options) {
		$(this).show();
		var c = $.extend({
				easing: whatInOutEasing,
				duration: 400,
				sizeFrom: 80,
				callback: function(){}
			}, options),
			$this = $(this),
			name = returnID($this),
			percentage = c.sizeFrom / 100,
			baseData = $.data(document, name) != null ? $.data(document, name) : returnData($this),
			sizeFrom =  {
				width: baseData.width * percentage,
				height: baseData.height * percentage
			},
			mPosFrom = {
				marginTop: baseData.marginLeft + (baseData.height - sizeFrom.height) / 2,
				marginLeft: baseData.marginLeft + (baseData.width - sizeFrom.width) / 2
			};
			
		writeData(name, baseData);
			
		$this
			.hide()
			.css({
				width: sizeFrom.width,
				height: sizeFrom.height,
				opacity: 0,
				marginTop: mPosFrom.marginTop,
				marginLeft: mPosFrom.marginLeft
			})
			.stop(true, false)
			.animate(
				$.data(document, name),
				{
					duration: c.duration,
					easing: c.easing,
					complete: function() {
						$this.css($.data(document, name));
						c.callback();
					}
				}
			);
	}
	
	// WhatOut
	$.fn.whatOut = function(options) {	
		$(this).show();
		var c = $.extend({
				easing: whatInOutEasing,
				duration: 400,
				sizeTo: 80,
				callback: function(){}
			}, options),
			$this = $(this),
			name = returnID($this),
			percentage = c.sizeTo / 100,
			baseData = $.data(document, name) != null ? $.data(document, name) : returnData($this),
			sizeTo =  {
				width: baseData.width * percentage,
				height: baseData.height * percentage
			},
			mPosTo = {
				marginTop: baseData.marginLeft + (baseData.height - sizeTo.height) / 2,
				marginLeft: baseData.marginLeft + (baseData.width - sizeTo.width) / 2
			};
			
		writeData(name, baseData);
			
		$this
			.hide()
			.css($.data(document, name))
			.stop(true, false)
			.animate(
				{
					marginTop: mPosTo.marginTop,
					marginLeft: mPosTo.marginLeft,
					width: sizeTo.width,
					height: sizeTo.height,
					opacity: 0
				},
				{
					duration: c.duration,
					easing: c.easing,
					complete: function() {
						$this
							.hide()
							.css($.data(document, name));
						c.callback();
					}
				}
			);
	}
	
})(jQuery);