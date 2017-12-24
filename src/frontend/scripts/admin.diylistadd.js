'use strict';

layui.use('layer', function () {
    const $ = layui.jquery,
          layer = layui.layer;
	/**
	 * @description 上传封面
	 **/
	$('#uploadInput').on('change', (e) => {
        if($(e.target).val() === '') return;
		let formData = new FormData();
		formData.append('file', e.target.files[0]);
		formData.append('rootPath', 'user');
		$.ajax({
			url: '/api/upload',
			type: 'post',
			cache: false,
			data: formData,
			processData: false,
			contentType: false
		}).done((res) => {
			if(res.code === 1) {
				$('#uploadImgThumb').attr('src', res.path).addClass('active');
				$('#uploadImgSrc').val(res.path);
			} else {
				console.log(res.message);
			}
		}).fail((res) => {
		});
	});
	$('#submit').on('click', (e) => {
		if ($('#uploadImgSrc').val() === '') {
            return layer.alert('请上传封面图片', {
                skin: 'layui-layer-lan',
                closeBtn: 0
            });
        }
        if ($('#plName').val() === '') {
            return layer.alert('请填写歌单名称', {
                skin: 'layui-layer-lan',
                closeBtn: 0
            });
        }
        if ($('#plAuthor').val() === '') {
            return layer.alert('请填写作者', {
                skin: 'layui-layer-lan',
                closeBtn: 0
            });
        }
        if ($('#plDesc').val() === '') {
            return layer.alert('请填写描述', {
                skin: 'layui-layer-lan',
                closeBtn: 0
            });
        }
        $('.diy-list-add').submit();
    });
 });