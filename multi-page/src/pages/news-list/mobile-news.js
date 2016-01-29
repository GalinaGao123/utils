var MobileNews = function(selector) {
  this.init(selector);
  this.addEvent();
  this.fetch();
};

MobileNews.prototype.init = function(selector) {
  this.$el = $(selector);
  this.apiUrl = this.$el.data('api');
  this.offset = 0;
  this.count = 10;
};

MobileNews.prototype.addEvent = function() {
  var that = this;
  this.$el.find('.more').click(function() {
    that.fetch();
  });
};

MobileNews.prototype.fetch = function() {
  var that = this;
  var $moreWrap = this.$el.find('.more-wrap');

  $.get(this.apiUrl, {
    begin: this.offset,
    count: this.count
  }, function(data) {
    var $wrap = $('<div></div>');
    $wrap.append(data);

    if ($wrap.find('.news-item').length < that.count) {
      $moreWrap.fadeOut(300);
    }

    $wrap.insertBefore($moreWrap);

    $wrap.find('.news-item .text-holder .brief').dotdotdot({
      wrap: 'letter',
      watch: 'window'
    });

    that.offset += that.count;
  });
};

module.exports = MobileNews;
