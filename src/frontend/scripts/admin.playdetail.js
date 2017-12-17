'use strict';

layui.use('layer', function () {
    const $ = layui.jquery,
          layer = layui.layer;
	/**
	 * @description 更新歌曲列表
	 **/
	$('#updateDetailList').on('click', e => {
		layer.confirm('是否从网易云音乐更新歌曲列表？', {
			  btn: ['确定', '取消']
			}, function(){
				const layerMessage = layer.msg('更新列表中...', {
					time: 0
				});
			    $.ajax({
					type: 'post',
					url: '/api/admin/listdetailupdate',
					data: {
						source: 'http://music.163.com/playlist',
						id: Utils.getQueryString('id'),
						oid: Utils.getQueryString('oid'),
					}
				}).done( r => {
					layer.close(layerMessage);
					// if(r.code === 1) {
					// 	window.location.reload();
					// } else {
					// 	layer.alert('更新失败');     
					// }
				}).fail( err => {
					console.log(err);
					layer.alert('更新失败');
				});
			}
		);

	});
});