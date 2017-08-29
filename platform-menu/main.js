// Document ready
$(document).ready(function() {	
	
	$('.site-nav').click(function(){
		$('body').addClass('nav-open');
	});
	
	$('.nav-helper, #mobile-close').click(function(e){
		e.stopPropagation();
		$('body').removeClass('nav-open');
	});
	
}); // close document ready