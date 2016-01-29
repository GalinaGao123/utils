$(function() {

  var $chartBlock = $(".chart-block");
  var $chartBg = $chartBlock.find(".chart-bg");
  var chartLength = $chartBg.length;
  var $window = $(window);
  var animateTime = 200;

  var chartAnimate = function() {

    if( ( $window.scrollTop() + $window.height() )
      > ( $chartBlock.offset().top + $chartBlock.height() )
    ){
      $window.unbind('scroll',chartAnimate);

      var delayTime = 0;
      $chartBg.each(function(index) {

        var $chartColored = $(this).find('.chart-colored');
        var $chartPercent = $(this).find('.chart-percent');

        $chartColored.css("opacity", (chartLength - index) / chartLength);
        $chartPercent.css("left", $chartPercent.text());

        $chartColored.delay(delayTime).animate({
          width: $chartPercent.text()
        }, animateTime, function(){
          $chartPercent.fadeIn(animateTime/2);
        });

        delayTime += 1.5 * animateTime;
      });
    }
  };

  $window.bind('scroll', chartAnimate);
});
