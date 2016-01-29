$(function() {

  var $btn = $('#back-to-top');
  var $window = $(window);

  $btn.click(function() {
    $('html, body').animate({scrollTop: 0}, 1000);
  });

  $window.scroll(function() {
    if ($window.scrollTop() > $window.height()) {
      $btn.addClass('active');
    } else {
      $btn.removeClass('active');
    }
  });

});
