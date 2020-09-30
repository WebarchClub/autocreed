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
function toggleDropdown (e) {
  const _d = $(e.target).closest('.dropdown'),
      _m = $('.dropdown-menu', _d);
  setTimeout(function(){
    const shouldOpen = e.type !== 'click' && _d.is(':hover');
    _m.toggleClass('show', shouldOpen);
    _d.toggleClass('show', shouldOpen);
    $('[data-toggle="dropdown"]', _d).attr('aria-expanded', shouldOpen);
  }, e.type === 'mouseleave' ? 300 : 0);
}

$('body')
  .on('mouseenter mouseleave','.dropdown',toggleDropdown)
  .on('click', '.dropdown-menu a', toggleDropdown);

/* not needed, prevents page reload for SO example on menu link clicked */
$('.dropdown a').on('click tap', e => e.preventDefault())

$(window).scroll(function() {
    
    if ($(document).scrollTop() > 50) {
      $('.navbar').addClass('blurry');
      $('.dropdown-menu').css("opacity",0.75);
    } else {
      $('.navbar').removeClass('blurry');
      $('.dropdown-menu').css("opacity",0.85);
    }
  });