$(function() {
  var $subMenuShadow = $('.header-container .sub-menu-shadow');
  $('.header-desktop .menu .item').hover(function() {
    $subMenuShadow.addClass('active');
  }, function() {
    $subMenuShadow.removeClass('active');
  });

  var $searchBox = $('.header-desktop .search .search-box');
  $('.header-desktop .search').click(function(ev) {
    $(this).toggleClass('active');
    $searchBox.find('input').focus();
  });
  $('.header-desktop .menu .item').mouseover(function(ev) {
    $('.header-desktop .search').removeClass('active');
  });
  $searchBox.click(function(e) {
    e.stopPropagation();
  });

  $('.header-mobile .search .icon').click(function(ev) {
    var $searchBoxMobile = $(this).parent().siblings('.search-box-mobile');

    if ($('.header-mobile .menu-switch').hasClass('active')) {
      $('.header-mobile .menu').slideUp(300);
      $('.header-mobile .menu-switch').removeClass('active');
    }

    $searchBoxMobile.fadeToggle(300,function(){
      $searchBoxMobile.find('input').focus();
    });

  });

  $('.header-mobile .search-box-mobile .search-bar').click(function() {
    $(this).parent().submit();
  });

  $('.header-mobile .search-box-mobile .clear-bar').click(function() {
    $(this).siblings('input').val('');
  });

  $('.header-mobile .menu-switch').click(function() {

    $('.header-mobile .search-box-mobile').fadeOut(300);

    $('.header-mobile .menu').slideToggle(300,function(){
      $(this).height($(window).height() - 60);
    });
    $(this).toggleClass('active');
  });

  $('.header-mobile .menu .item .title').click(function() {
    $(this).toggleClass('active').siblings('.sub-menu').slideToggle(300);
  });

  $('.header-mobile .menu .social .weixin').click(function() {
    $('#qrcode-weixin').fadeIn(300);
  });
});