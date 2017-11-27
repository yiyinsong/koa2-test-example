'use strict';

layui.use('layer', function () {
    const $ = layui.jquery,
        layer = layui.layer;
	/**
	* function 图片上传
	**/
	$('#userIcon').on('change', (e) => {
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
				$('#userIconPath').val(res.path);
			} else {
				console.log(res.message);
			}
		}).fail((res) => {
		});
	});
	
    $('#submit').on('click', (e) => {
        if ($('#userIcon').val() === '') {
            layer.alert('请上传用户头像', {
                skin: 'layui-layer-lan',
                closeBtn: 0
            });
            return;
        }
        if($('#userName').val() === '') {
            layer.alert('请填写用户名称', {
                skin: 'layui-layer-lan',
                closeBtn: 0
            });
            return;
        }
        if ($('#userTel').val() === '') {
            layer.alert('请输入手机号码', {
                skin: 'layui-layer-lan',
                closeBtn: 0
            });
            return;
        } else if(!/^\d{11}$/.test($('#userTel').val())) {
          layer.alert('手机号码格式错误', {
            skin: 'layui-layer-lan',
            closeBtn: 0
            });
            return;    
        }
        if($('#userPwd').val() === '') {
            layer.alert('请填写用户密码', {
                skin: 'layui-layer-lan',
                closeBtn: 0
            });
            return;
        }
        if($('#userPwd2').val() === '') {
            layer.alert('请填写确认密码', {
                skin: 'layui-layer-lan',
                closeBtn: 0
            });
            return;
        } else if($('#userPwd').val() !== $('#userPwd2').val()) {
            layer.alert('用户密码跟确认密码不一致', {
                skin: 'layui-layer-lan',
                closeBtn: 0
            });
            return;
        }
        $('#form').submit();
    });
    $('#loginSubmit').on('click', (e) => {
        if($('#userName').val() === '') {
            layer.alert('请填写用户账号', {
                skin: 'layui-layer-lan',
                closeBtn: 0
            });
            return;
        }
        if($('#userPwd').val() === '') {
            layer.alert('请填写用户密码', {
                skin: 'layui-layer-lan',
                closeBtn: 0
            });
            return;
        }
        $('#form').submit();
    });

});