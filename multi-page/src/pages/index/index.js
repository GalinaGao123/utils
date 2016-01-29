$(function() {

  $('#public-view-slider').slick({
    dots: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000
  });

  $('[truncate-text]').dotdotdot({
    wrap: 'letter',
    watch: 'window'
  });

  var $animateBlock = $(".animate-block");
  var $info = $animateBlock.find(".info");
  var $window = $(window);
  var animateTime = 500;



  $info.each(function(){

    var $that = $(this);
    var infoAnimation = function() {

      if( ( $window.scrollTop() + $window.height() )
        >  ( $that.offset().top + $that.height() )
        ){
          $window.unbind('scroll',infoAnimation);

          $that.animate({
            opacity: 1
          }, animateTime);
        }
    };
    $window.bind('scroll', infoAnimation);
  });

});
