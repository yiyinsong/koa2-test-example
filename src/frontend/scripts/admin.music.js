'use strict';

/**
 * @description 更新歌单
 **/
$('#updateList').on('click', e => {
	$.ajax('/api', {
		type: 'post',
		success(r) {
			
		},
		error(err) {
			console.log(err);
		}
	});
});