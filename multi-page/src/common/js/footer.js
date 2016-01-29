$(function() {

  $('.footer .links-mobile .group .title').click(function() {
    $(this).siblings('.content').slideToggle(300).parent().toggleClass('active');
  });

  $('.footer .social .weixin').click(function() {
    $('#qrcode-weixin').fadeIn(300);
  });

  $('#qrcode-weixin').click(function() {
    $(this).fadeOut(300);
  });

});
