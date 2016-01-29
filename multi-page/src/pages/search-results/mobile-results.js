var MobileResults = function(selector) {
  this.init(selector);
  this.addEvent();
  this.fetch();
};

MobileResults.prototype.init = function(selector) {
  this.$el = $(selector);
  this.apiUrl = this.$el.data('api');
  this.offset = 0;
  this.count = 10;
};

MobileResults.prototype.addEvent = function() {
  var that = this;
  this.$el.find('.more').click(function() {
    that.fetch();
  });
};

MobileResults.prototype.fetch = function() {
  var that = this;
  var $moreWrap = this.$el.find('.more-wrap');

  $.get(this.apiUrl, {
    begin: this.offset,
    count: this.count
  }, function(data) {
    var $wrap = $('<div></div>');
    $wrap.append(data);

    if ($wrap.find('.result').length < that.count) {
      $moreWrap.fadeOut(300);
    }

    $wrap.insertBefore($moreWrap);
    that.offset += that.count;
  });
};

module.exports = MobileResults;
