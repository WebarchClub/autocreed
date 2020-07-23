<<<<<<< HEAD
// sidebar hides when any part of the main body is targetted
=======
>>>>>>> 2852b608ee577b63faf276514cfceee472e3be7a
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