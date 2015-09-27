var animationsModule = (function() {

	// Set jQuery animations rate
	jQuery.fx.interval = 6; //default 13ms

	// Cache DOM
	var $html = $('html, body');
	var $header = $('.navbar');
	var $heading = $('.heading');
	var $logo = $header.find(".navbar-brand");
	var $links = $('ul.navbar-nav');
	var $home = $('div.home');
	var $projects = $('div.projects');
	var $contact = $('div.contact');
	var $menu = $('#menu');

	//Bind Events
	$(window).on('scroll', fadeInLogo);
	$(window).on('scroll', highlightLinkOnScroll);
	$links.find('a').on('click', jumpToSection);
	$menu.on('click', function(e) {
		e.preventDefault();
		menuReveal();
	});
	$(window).on('resize scroll', function() {
			menuHide();
	});

	// if the top of the window (minus header height) is lower than the bottom edge of the greeting, show the logo, else hide it 
	function fadeInLogo() {
		if ( ($(window).scrollTop() - $header.outerHeight()) > ($heading.offset().top + $heading.find("h1").outerHeight())) {
			$logo.fadeIn('slow');
		} else {
			$logo.fadeOut('slow');
		}
	}

	// Jump to top of div with matching class name if link is clicked
	function jumpToSection(location) {
		$location = $(location.target);
		$scrollPosition = $('div.' + $location.text().toLowerCase());
		topMargin = parseInt($scrollPosition.css("margin-top"));
		$html.animate({scrollTop: $scrollPosition.offset().top - topMargin - $header.outerHeight()}, 600);
		return false;
	}

	function highlightLinkOnScroll() {
		var windowCenter = ($(window).scrollTop() + ($(window).height() / 2));
		var projectsTop = $projects.offset().top;
		var contactTop = $contact.offset().top;

		removeAllSelected($links.children());
		
		// highlight link based on middle of window
		if (windowCenter < projectsTop) {
			$links.find(".home").addClass("underline");
		} else if (windowCenter > projectsTop && windowCenter < contactTop) {
			$links.find(".projects").addClass("underline");
		} else {
			$links.find(".contact").addClass("underline");
		}
		return false;
	}

	function removeAllSelected(element) {
		element.children('.underline').removeClass('underline');
	}

	function menuReveal() {
		if ($links.css('display') === 'none') {
			$links.slideDown();
		} else {
			$links.slideUp();
		}
		return false;
	}

	function menuHide() {
		if ($(window).width() < 500) {
			$links.css("display", "none");
		} else {
			$links.css("display", "block");
		}
		return false;
	}

	return {
		fadeInLogo: fadeInLogo,
		jumpToSection: jumpToSection
	};

});

$(document).ready(animationsModule);