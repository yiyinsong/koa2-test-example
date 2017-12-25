'use strict';

layui.use('layer', function () {
    const $ = layui.jquery,
          layer = layui.layer;
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
			window.location.href = `/admin/diylist/removeMulti?ids=${_ids}`;
		});
	});
});