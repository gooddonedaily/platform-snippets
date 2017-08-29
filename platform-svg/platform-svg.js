/**
 * platform-svg.js 1.0 - Animates the Platform SVG logo
 * https://github.com/gooddonedaily/platform-svg
 * 
 * Written by Randall Bruder. Contact mail: randy@gooddonedaily.com
 * 
 * DEPENDENCIES:
 * - jQuery
 * 
 * USAGE:
 * Pretty much handles itself.
 * Will add class "svg-animation-complete" to the HTML tag once the initial build-in animation is complete.
 * 
 */


/* Helper functions */
function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Document ready
$(document).ready(function(){
	
	// Set up some variables
	var n = 1, 
		x = 0,
		totalStrokes = $('#platform-logo .stroke-mask').length,
		intoAnimationComplete = false;
	
	// Pulled from the chrome console, because apparently Firefox and Safari hate the getTotalLength() function, whatever.
	var StrokeMaskLengths = [63.10000228881836, 158.76351928710938, 172.71261596679688, 154.39999389648438, 322.8198547363281, 216.23419189453125,
							  154.39999389648438, 154.39999389648438, 272.6298522949219, 98.0999984741211, 158.75128173828125, 109.5, 182.8866424560547, 
							  278.67633056640625, 98.20000457763672, 81.86331939697266, 98.0999984741211, 171.52467346191406, 168.63099670410156];
	

	/* 
	 * The initial build-in animation.
	 */
	
	$('#platform-logo .stroke-mask').each(function(){
		var path = $(this).get(0);

		// var pathLen = path.getTotalLength();
		var pathLen = StrokeMaskLengths[x];
		x++;

		$(this).data('pathLen', pathLen);
		path.setAttribute('stroke-dasharray', pathLen);
		path.setAttribute('stroke-dashoffset', pathLen);
		var $this = $(this);

		setTimeout(function(){
			$this.animate({'stroke-dashoffset': 0}, pathLen*10);
		}, 100*n);

		n++;

		if (n === totalStrokes) {
			setTimeout(function(){
				intoAnimationComplete = true;
				$('html').addClass('svg-animation-complete');
			}, 100*n + pathLen*10); // After the last animation is complete
		}
	});

	// The horizonal bar
	$('#platform-logo .stroke-bar').animate({'stroke-dashoffset': 400}, 3650);


	/* 
	 * When hovering over an SVG group, reanimate that group's build-in
	 */

	$('#platform-logo .hover').mouseover(function(){
		var $this = $(this);
		if (intoAnimationComplete && ( $(this).data('currentlyAnimating') === undefined || $(this).data('currentlyAnimating') === false ) ) {

			// The letter is animating, don't allow any new animations to trigger
			$(this).data('currentlyAnimating', true);
			
			var id = $(this).attr('id');
			id = id.replace("hover", "#letter-");
			var i = 0;
			
			var totalLetterStrokes = $(id).find('.stroke-mask').length;
			
			$(id).find('.stroke-mask').each(function(){
				var $this = $(this);
				
				setTimeout(function(){
					$this.css('stroke-dashoffset', $this.data('pathLen')*2);
					$this.animate({'stroke-dashoffset': "-=" + $this.data('pathLen')}, $this.data('pathLen')*5);
				}, 400*i);                        
				
				i++;
				
				setTimeout(function(){
					$this.animate({'stroke-dashoffset': "-=" + $this.data('pathLen')}, $this.data('pathLen')*5);
					
				}, 400*i);
				
			});
			
			setTimeout(function(){
				$this.data('currentlyAnimating', false);
			}, 400*totalLetterStrokes + $(id).find('.stroke-mask').last().data('pathLen')*5 );
		}
	});


	/* 
	 * Every 7 seconds, randomly pick one SVG group and re-animate the build-in
	 */
	 
	setInterval(function(){
		if (intoAnimationComplete) {
			
			var id = "#letter-" + getRandomInt(1,10);
			var incrementalDelay = 0;
				
			$(id).find('.stroke-mask').each(function(){
				var $this = $(this);
					
				setTimeout(function(){
					$this.css('stroke-dashoffset', $this.data('pathLen')*2);
					$this.animate({'stroke-dashoffset': "-=" + $this.data('pathLen')}, $this.data('pathLen')*5);
				}, 400 * incrementalDelay);             
					
				incrementalDelay++;
					
				setTimeout(function(){
					$this.animate({'stroke-dashoffset': "-=" + $this.data('pathLen')}, $this.data('pathLen')*5);
				}, 400 * incrementalDelay);
				
			});
		}	
	}, 7000);
	

}); // close document ready