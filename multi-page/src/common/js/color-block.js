$(function() {

  var space = 30;
  var $header = $('.header-container');

  $('.color-block').each(function() {
    var $container = $(this).find('.color-block-title');
    var $text = $container.find('.title');
    var $more = $container.find('.more');
    var $window = $(window);

    var locate = function() {

      var totalOffset = $container.height() - $text.height() - $more.height() - 2 * space;
      var topLimit = $container.offset().top - $header.height();
      var bottomLimit = topLimit + totalOffset;
      var scrollTop = $window.scrollTop();

      if (scrollTop <= topLimit) {
        $text.css('top', space);
      }else if (scrollTop > topLimit && scrollTop <=  bottomLimit) {
        $text.css('top', space + $window.scrollTop() - topLimit );
      }else {
        $text.css('top', totalOffset + space);
      }
    };

    $(window).scroll(_.debounce(locate, 200));
  });

});
