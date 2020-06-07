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
                console.log(res);

                // alert(res.message)
                // 5.2 如果成功了,显示登陆的盒子,隐藏注册盒子
                // if()
            }
        })


    })


});