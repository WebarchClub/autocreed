$(document).ready(function(){
  // setTimeout(function(){
  //   $('.navbar-brand').toggleClass('disappear');
  //   }, 6000);
  $(".navbar-toggler").click(function(){
  
    $('.navbar-toggler').toggleClass('shift');
    // $('.navbar-brand').toggleClass('disappear');
    
  });
});

$(".navbar-toggler").click(function () {
  var el = $('.navbar-brand');
  window.setTimeout(function() {
      el.toggleClass('disappear');
  }, 300);
});

// $(document).click(function(e) {
// 	if (!$(e.target).is('.navbar-collapse')) {
//         $('.collapse').collapse('hide');
//         $(".navbar-toggler").addClass('shift');

//         $(".navbar-brand").removeClass('disappear');
//         // $('.icon').toggleClass('newLocation');	    
//     }
// });
//  navbar bg changed after scrolling 50px
$(window).scroll(function() {
    
    if ($(document).scrollTop() > 50) {
      $('.navbar').addClass('blurry');
      $('.dropdown-menu').css("opacity",0.75);
    } else {
      $('.navbar').removeClass('blurry');
      $('.dropdown-menu').css("opacity",0.85);
    }
  });