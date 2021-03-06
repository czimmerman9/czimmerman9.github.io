var animationsModule = (function() {

	// Set jQuery animations rate
	jQuery.fx.interval = 6; //default 13ms

	// Cache DOM
	var $html = $('html, body');
	var $header = $('div.navbar-header');
	var $heading = $('#name');
	var $logo = $header.find(".navbar-brand");
	var $navbar = $('ul.navbar-nav');
	var $projects = $('div.projects');
	var $contact = $('div.contact');	
	var $carousel_inner = $('div.carousel-inner');
	var $carousel = $('div#project-selector-carousel');
	var headerHeight = 50; //px

	//Bind Events
	$(window).on('scroll', fadeInLogo);
	$(window).on('scroll', highlightLinkOnScroll);
	$navbar.find('a').on('click', jumpToSection);
	$navbar.find('a').on('click', closeMenu);	
	$('#about-me-contact').on('click', jumpToSection);
	$carousel.on('slid.bs.carousel', changeProjectContent);


	// if the top of the window (minus header height) is lower than the bottom edge of the greeting, show the logo, else hide it 
	function fadeInLogo() {
		if ( ($(window).scrollTop() - headerHeight) > ($heading.offset().top + $heading.find("h1").outerHeight())) {
			$logo.fadeIn('slow');
		} else {
			$logo.fadeOut('slow');
		}
	}

	// Jump to top of div with matching class name if link is clicked
	function jumpToSection(location) {
		console.log(location);
		$scrollLocation = $('div.' + location.currentTarget.attributes['data'].nodeValue);
		topMargin = parseInt($scrollLocation.css("margin-top"));
		$html.animate({scrollTop: $scrollLocation.offset().top  - topMargin - headerHeight}, 600);
		return false;
	}

	function highlightLinkOnScroll() {
		var windowTopThird = ($(window).scrollTop() + ($(window).height() / 3));
		var projectsTop = $projects.offset().top;
		var contactTop = $contact.offset().top;

		removeAllSelected($navbar.children());
		
		// highlight link based on middle of window
		if (windowTopThird < projectsTop) {
			$navbar.find(".home").addClass("underline");
		} else if (windowTopThird > projectsTop && windowTopThird < contactTop) {
			$navbar.find(".projects").addClass("underline");
		} else {
			$navbar.find(".contact").addClass("underline");
		}
		return false;
	}

	function removeAllSelected(element) {
		element.children('.underline').removeClass('underline');
	}

	function closeMenu(event) {
		$('.navbar-collapse').collapse('hide');
	}

	function changeProjectContent(event) {
		var id = $carousel_inner.find('div.active a')[0].id;
		$('div.information:not(.hide)').addClass('hide');
		$('div.about-' + id).removeClass('hide');
		return false;
	}

	return {
		fadeInLogo: fadeInLogo,
		jumpToSection: jumpToSection,
		changeProjectContent: changeProjectContent
	};

});

$(document).ready(animationsModule);