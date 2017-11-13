'use strict';

layui.use('layer', function () {
    const $ = layui.jquery,
        layer = layui.layer;
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
    })
});