/*================ Journey Starts=================*/


var timelineSwiper = new Swiper ('.timeline .swiper-container', {
  direction: 'vertical',
  autoplay: 4000,
  loop: true,
  speed: 1600,
  pagination: '.swiper-pagination',
  paginationBulletRender: function (swiper, index, className) {
    var year = document.querySelectorAll('.swiper-slide')[index+1].getAttribute('data-year');
    return '<span class="' + className + '">' + year + '</span>';
  },
  paginationClickable: true,
  nextButton: '.swiper-button-next',
  prevButton: '.swiper-button-prev',
  breakpoints: {
    768: {
      direction: 'horizontal',
    }
  }
});
/*=================Journey Ends=============================*/