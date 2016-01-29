$(function() {
  $('a[href^="#"]').click(function(e){
    e.preventDefault();
    
    var $target = $('.privacy-detail').find($(this).attr("href"));
    var offset = $target.offset().top - 80;

    $('html, body').animate({scrollTop: offset}, 600);
  });
});
