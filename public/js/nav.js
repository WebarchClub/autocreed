$(document).click(function(e) {
	if (!$(e.target).is('.navbar-collapse')) {
        $('.collapse').collapse('hide');
        // $('.icon').toggleClass('newLocation');	    
    }
});

/* navbar bg changed after scrolling 50px */
$(window).scroll(function() {
    
    if ($(document).scrollTop() > 50) {
      $('.navbar').addClass('blurry');
    } else {
      $('.navbar').removeClass('blurry');

    }
  });