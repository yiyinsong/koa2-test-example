'use strict';

layui.use('layer', function () {
    const $ = layui.jquery;
	const $iframe = $('iframe');
	const windowUrl = window.location.origin;

	/*
	* @description 用户信息展示隐藏
	*/
	$('.admin-user').on('click', e => {
		$(e.currentTarget).toggleClass('active');
	})
 
	/*
	* @description 左侧导航
	*/
	$('.admin-left li').on('click', e => {
		const $t = $(e.currentTarget);
		$t.addClass('active').siblings().removeClass('active');
		$iframe.attr('src', windowUrl + $t.data('url'));
	});
});