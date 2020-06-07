$(function() {
    // -----------------------切换登录注册盒子------------------
    $('#goto-reg').click(function() {
        $('#login').hide().next().show();
    });
    $('#goto-login').click(function() {
        // $('#register').hide().prev().show();//方法一
        $('#login').show().next().hide(); //方法二
    });

    //-----------------------完成注册功能-----------------------
    // 1. 监听注册表单的提交事件
    $('#register form').on('submit', function(e) {
            // 2. 阻止默认行为
            e.preventDefault();
            // 3. 获取输入的账号和密码
            var data = $(this).serialize(); // serialize()是根据表单项name属性获取值的, 所以这里一定要检查表单项的name属性是否存在,是否正确
            // console.log(data);
            // 通过serialize得到的是一个字符串
            // 通过new FormData()得到的是一个对象,有文件上传的时候,才需要用FormData
            // 4. ajax提交账号和密码到接口
            $.ajax({
                type: 'POST',
                url: 'http://www.liulongbin.top:3007/api/reguser',
                data: data,
                success: function(res) {
                    // 5. 根据接口返回的结果,无论成功还是失败,都要给出一个提示
                    // 5.1 如果失败了, 给出一个提示
                    // console.log(res);
                    // alert(res.message)
                    layer.msg(res.message);
                    // 5.2 如果成功了,显示登陆的盒子,隐藏注册盒子
                    if (res.status === 0) {
                        $('#login').show().next().hide()
                    }
                }
            })
        })
        // ---------注册表单验证------------
        // 使用layui的内置模块, 必须预加载
    var form = layui.form
        // console.log(form);
    form.verify({
        // 这里自定义验证规则
        // 键(验证规则) : 值(验证方法)
        // len: [/^[\S]{6,12}$/, '密码长度不对'],
        len: function(val) {
            // console.log(val);
            if (val.trim().length < 6 || val.trim().length > 12) {
                return '密码长度必须是6~12位';
            }
        },
        same: function(val) {
            var password = $('.pass').val();
            if (val !== password) {
                return '两次密码不一致~~~';
            }
        }
    });
    // -----------------完成登录功能--------------------
    // 1. 监听登录表单的提交事件
    $('#login form').on('submit', function(e) {
        // 2. 阻止默认行为
        e.preventDefault();
        // 3. ajax提交账号和密码
        $.ajax({
            type: 'POST',
            url: 'http://www.liulongbin.top:3007/api/login',
            data: $(this).serialize(),
            success: function(res) {
                // 4. 根据服务器返回的结果
                // 4.1 无论成功还是失败,都给出提示
                // alert(res.message);
                layer.msg(res.message);
                // 4.2 如果登录成功,跳转/indexedDB.html页面
                if (res.status === 0) {
                    // 登录成功,需要把token保存到本地存储
                    // localStorage.setItem(键,值)
                    localStorage.setItem('token', res.token);
                    location.href = './index.html';
                }
            }
        });
    })
});