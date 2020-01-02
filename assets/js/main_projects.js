/*
	Telemetry by Pixelarity
	pixelarity.com | hello@pixelarity.com
	License: pixelarity.com/license
*/

(function($) {

	var	$window = $(window),
		$header = $('#header'),
		$banner = $('#banner'),
		$body = $('body');

	/**
	 * Applies parallax scrolling to an element's background image.
	 * @return {jQuery} jQuery object.
	 */
	$.fn._parallax = (browser.name == 'ie' | browser.name == 'edge' || browser.mobile) ? function() { return $(this) } : function(intensity) {

		var	$window = $(window),
			$this = $(this);

		if (this.length == 0 || intensity === 0)
			return $this;

		if (this.length > 1) {

			for (var i=0; i < this.length; i++)
				$(this[i])._parallax(intensity);

			return $this;

		}

		if (!intensity)
			intensity = 0.25;

		$this.each(function() {

			var $t = $(this),
				on, off;

			on = function() {

				$t.css('background-position', 'center 100%, center 100%, center 0px');

				$window
					.on('scroll._parallax', function() {

						var pos = parseInt($window.scrollTop()) - parseInt($t.position().top);

						$t.css('background-position', 'center ' + (pos * (-1 * intensity)) + 'px');

					});

			};

			off = function() {

				$t
					.css('background-position', '');

				$window
					.off('scroll._parallax');

			};

			breakpoints.on('<=large', off);
			breakpoints.on('>large', on);

		});

		$window
			.off('load._parallax resize._parallax')
			.on('load._parallax resize._parallax', function() {
				$window.trigger('scroll');
			});

		return $(this);

	};

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ null,      '480px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Scrolly.
		$('.scrolly').scrolly();

	// Header.
		if ($banner.length > 0
		&&	$header.hasClass('alt')) {

			$window.on('resize', function() { $window.trigger('scroll'); });

			$banner.scrollex({
				bottom:		$header.outerHeight(),
				terminate:	function() { $header.removeClass('alt'); },
				enter:		function() { $header.addClass('alt'); },
				leave:		function() { $header.removeClass('alt'); }
			});

		}

	// Banner.
		if ($banner.length > 0)
			$banner._parallax(0.25);

	// Dropdowns.
		$('#nav > ul').dropotron({
			alignment: 'right',
			hideDelay: 350,
			baseZIndex: 100000
		});
	
	// Menu.
		$('<a href="#navPanel" class="navPanelToggle button">Menu</a>')
			.appendTo($header);

		$(	'<div id="navPanel">' +
				'<nav>' +
					$('#nav') .navList() +
				'</nav>' +
				'<a href="#navPanel" class="close"></a>' +
			'</div>')
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'right'
				});
		

	// Navbar
		let mainNavLinks = document.querySelectorAll("nav ul li a");
		let mainSections = document.querySelectorAll("main section");
		
		let lastId;
		let cur = [];
			
		window.addEventListener("scroll", event => {
		let fromTop = window.scrollY;
		
		mainNavLinks.forEach(link => {
			let section = document.querySelector(link.hash);
		
			if (
			section.offsetTop <= fromTop &&
			section.offsetTop + section.offsetHeight > fromTop
			) {
			link.classList.add("current");
			} else {
			link.classList.remove("current");
			}
		});
		});

	// When the user scrolls down 20px from the top of the document, slide down the navbar
		window.onscroll = function() {scrollFunction()};

		function scrollFunction() {
		if (document.body.scrollTop > 520 || document.documentElement.scrollTop > 520) {
			document.getElementById("navbar").style.top = "0";
		} else {
			document.getElementById("navbar").style.top = "-55px";
		}
		}

	// Carousel.
	
	// $('.carousel').each(function() {

		// var	$this = $(this);

			// Wrapper.
				// $this.wrap('<div class="carousel-wrapper" />');
				// var $wrapper = $this.parent();

			// Nav.
			// var	$navRight = $('<div class="nav right"></div>').insertAfter($this),
			// $navLeft = $('<div class="nav left"></div>').insertAfter($this),
			// intervalId;

			// $navLeft
			// 	.on('mouseenter', function() {
			// 		intervalId = window.setInterval(function() {
			// 			$this.scrollLeft( $this.scrollLeft() - 5 );
			// 		}, 10);
			// 	})
			// 	.on('mouseleave', function() {
			// 		window.clearInterval(intervalId);
			// 	});

			// $navRight
			// 	.on('mouseenter', function() {
			// 		intervalId = window.setInterval(function() {
			// 			$this.scrollLeft( $this.scrollLeft() + 5 );
			// 		}, 10);
			// 	})
			// 	.on('mouseleave', function() {
			// 		window.clearInterval(intervalId);
			// 	});

	// Tabs.
		$('.tabs').selectorr({
			titleSelector: 'h3',
			delay: 250
		});

	// Quotes.
		$('.quotes > article')
			.each(function() {

				var	$this = $(this),
					$image = $this.find('.image'),
					$img = $image.find('img'),
					x;

				// Assign image.
					$this.css('background-image', 'url(' + $img.attr('src') + ')');

				// Set background position.
					if (x = $img.data('position'))
						$this.css('background-position', x);

				// Hide image.
					$image.hide();

			});
		
			var flkty = new Flickity( '.main-gallery', {
				// options
				cellAlign: 'left',
				contain: true
			  })

})(jQuery);