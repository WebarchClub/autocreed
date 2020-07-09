// sidebar hides when any part of the main body is targetted
$(document).click(function(e) {
	if (!$(e.target).is('.navbar-collapse')) {
        $('.collapse').collapse('hide');
        // $('.icon').toggleClass('newLocation');	    
    }
});