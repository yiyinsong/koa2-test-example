'use strict';

layui.use('layer', function () {
    const $ = layui.jquery,
          layer = layui.layer;
	/**
	 * @description 更新歌单
	 **/
	$('#updateList').on('click', e => {
		layer.confirm('更新过程所需时间较长，是否从网易云音乐更新歌单列表？', {
			  btn: ['确定', '取消']
			}, function(){
				const layerMessage = layer.msg('更新列表中...', {
					time: 0
				});
			    $.ajax({
					type: 'post',
					url: '/api/admin/listupdate',
					data: {
						source: 'http://music.163.com/discover/playlist/?order=hot&cat=%E5%85%A8%E9%83%A8&',
						size: 35,
					}
				}).done( r => {
					layer.close(layerMessage);
					if(r.code === 1) {
						window.location.href = '/admin/list?limit=20&offset=0';
					} else {
						layer.alert('更新失败');     
					}
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
		$('.page-list-checkitem').prop('checked', e.currentTarget.checked);
	});
	/*
	* @description 单选
	*/
	$('.page-list-checkitem').on('click', e => {
		let _c = e.currentTarget.checked;
		if(!_c) {
			$('#btnCheckAll').prop('checked', false);
		} else {
			let _isCheckAll = true;
			$('.page-list-checkitem').each((k, v) => {
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
	$('#btnRemove').on('click', e => {
		let _hasCheck = false;
		let _ids = '';
		$('.page-list-checkitem').each((k, v) => {
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
			window.location.href = `/admin/list/removeMulti?ids=${_ids}`;
		});
	});
});