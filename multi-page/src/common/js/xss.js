var xss = require('xss');

$(function() {

	$('form[data-xss]').submit(function() {
		var $input = $(this).find('input');
		var text = $input.val();

		var html = xss(text, {
		  whiteList:          [],        // 白名单为空，表示过滤所有标签
		  stripIgnoreTag:     true,      // 过滤所有非白名单标签的HTML
		  stripIgnoreTagBody: ['script'] // script标签较特殊，需要过滤标签中间的内容
		});

		$input.val(html);

		return true;
	});

});