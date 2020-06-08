// $(function() {


//         // -------------------退出功能--------------------

//     })
// 入口函数外面封装,全局函数, 方便在其他位置调用
function getUserInfo() {
    $.ajax({
        url: 'http://www.liulongbin.top:3007/my/userinfo',
        // success函数, 在ajax请求成功之后触发
        success: function(res) {
            if (res.status === 0) {
                // 1. 设置欢迎语(有昵称,就使用昵称,没有昵称,使用用户名)
                var myname = res.data.nickname || res.data.username
                $('.myname').text(myname);
                // 2. 设置头像(有图片,使用图片,没有图片,使用名字的首字母)
                if (res.data.user_pic) {
                    $('.layui-nav-img').attr('src', res.data.user_pic).show();
                    $('.text-avatar').hide();
                } else {
                    var t = myname.substr(0, 1).toUpperCase();
                    $('.text-avatar').text(t).css('display', 'inline-block');
                }
            }
        },
        // complete函数, 在ajax请求完成(无论成败)之后触发
        complete: function(xhr) {
            // 在这里判断验证是否成功
            // console.log(xhr);
            if (xhr.responseJSON.status === 1 && xhr.responseJSON.message === '身份认证失败！') {
                // 删除假token
            }

        }
    })
}