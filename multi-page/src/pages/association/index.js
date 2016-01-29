$(function() {

  $('.history .more').one('click', function() {
    $('.history .time-line .time-line-item').fadeIn(1000);
    $(this).parent().hide();
  });

});
