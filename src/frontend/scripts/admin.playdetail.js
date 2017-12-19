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
					window.location.reload();
				}).fail( err => {
					console.log(err);
					layer.alert('更新失败');
				});
			}
		);

	});
	/*
	* @description 全选&取消全选
	*/
	$('#btnCheckAll').on('click', e => {
		$('.song-item').prop('checked', e.currentTarget.checked);
	});
	/*
	* @description 单选
	*/
	$('.song-item').on('click', e => {
		let _c = e.currentTarget.checked;
		if(!_c) {
			$('#btnCheckAll').prop('checked', false);
		} else {
			let _isCheckAll = true;
			$('.song-item').each((k, v) => {
				if(!$(v).prop('checked')) {
					_isCheckAll = false;
				}
			});
			if(_isCheckAll) {
				$('#btnCheckAll').prop('checked', true);
			}
		}
	});
	/*
	* @description 删除所选歌单
	*/
	$('#btnRemoveSong').on('click', e => {
		let _hasCheck = false;
		let _ids = '';
		$('.song-item').each((k, v) => {
			if($(v).prop('checked')) {
				_hasCheck = true;
				_ids += ',' + v.value;
			}
		});
		if(!_hasCheck) {
			return layer.alert('请选择要删除的歌单');
		}
		const _layerConfirm = layer.confirm('是否删除所选歌单？', {
			btn: ['确定', '取消']
		}, function() {
			layer.close(_layerConfirm);
			_ids = _ids.substr(1);
			window.location.href = `/admin/song/removeMulti?ids=${_ids}`;
		});
	});
});