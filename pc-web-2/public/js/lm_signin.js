//注册框居中
function setHeight() {
    var hei = document.getElementsByClassName("lm_div_signin")[0];
    var xwidth = document.documentElement.clientWidth;
    var xheight = document.documentElement.clientHeight;
    document.getElementsByClassName("lm_set_bg_img")[0].style.height = xheight + "px";
    hei.style.height = xheight + "px";
    var zdiv = hei.firstElementChild;
    if (xwidth > 992) {
        zdiv.style.width = "30%";
        zdiv.style.left = '35%';
    } else if (xwidth > 767) {
        zdiv.style.width = "35%";
        zdiv.style.left = "32.5%";
    } else if (xwidth > 576) {
        zdiv.style.width = "45%";
        zdiv.style.left = "27.5%";
    } else {
        zdiv.style.width = "70%";
        zdiv.style.left = "15%";
    }
    if (xheight > 700) {
        zdiv.style.height = "70%";
        zdiv.style.top = '15%';
    } else if (xheight > 500) {
        zdiv.style.height = "80%";
        zdiv.style.top = "10%";
    } else {
        zdiv.style.height = "100%";
        zdiv.style.top = "0";
    }
}
$(function() {
    setHeight();
    onresize = function () {
        setHeight();
    }


//当input框获取焦点时，提示
    function input_focus() {
        var hint = this.parentElement.parentElement.nextElementSibling;
        var str = "";
        if (this.id == "uname" && !this.value) {
            str = "<span style='color: #84c1ff;'>请输入用户名</span>";
        } else if (this.id == "upwd" && !this.value) {
            str = "<span style='color: #84c1ff;'>请输入密码</span>";
        } else if (this.id == "upwdi" && !this.value) {
            str = "<span style='color: #84c1ff;'>请输入确认密码</span>";
        }
        hint.innerHTML = str;
    }

    uname.onfocus = function () {
        input_focus.call(this);
    }
    upwd.onfocus = function () {
        input_focus.call(this);
    }
    upwdi.onfocus = function () {
        input_focus.call(this);
    }


//当input框失去焦点时，验证输入的是否符合要求
    function input_blur() {
        var hint = this.parentElement.parentElement.nextElementSibling;
        var val = this.value;
        var str = "";
        var boo = true;
        if (this.id == "uname") {
            var reg = /^\d{8}$/g;
            if (!val) {
                str = "<span style='color: #f00;'>请输入用户名</span>";
                boo = false;
            } else if (!reg.test(val)) {
                str = "<span style='color: #f00;'>请输入长度为8的数字</span>";
                boo = false;
            } else {
                $.ajax({
                    url: "/user/queryUser",
                    type: "get",
                    data: "uname=" + val,
                    async: false,
                    dataType: "json",
                    success: function (data) {
                        if (data.msg == 1) {
                            str = "<span style='color: #f00;'>用户名已存在</span>";
                            boo = false;
                        }
                    }, error: function () {
                        alert(1);
                    }
                });
            }
        } else if (this.id == "upwd" || this.id == "upwdi") {
            var reg = /^(\d|[a-z])+$/ig;
            if (!val) {
                str = "<span style='color: #f00;'>请输入" + (this.id == "upwdi" ? "确认" : "") + "密码</span>";
                boo = false;
            } else if (val.length < 6) {
                str = "<span style='color: #f00;'>请输入长度大于6位的" + (this.id == "upwdi" ? "确认" : "") + "密码</span>";
                boo = false;
            } else if (!reg.test(val)) {
                str = "<span style='color: #f00;'>" + (this.id == "upwdi" ? "确认" : "") + "密码中不能包含特殊字符</span>";
                boo = false;
            } else if (this.value != upwd.value) {
                str = "<span style='color: #f00;'>密码和确认密码不一致</span>";
                boo = false;
            }
        } else if (this.id == "phone") {
            var reg = /^\d{11}$/g;
            if (!val) {
                str = "";
            } else if (!reg.test(val)) {
                str = "<span style='color: #f00;'>电话号码格式不正确</span>";
                boo = false;
            }
        } else if (this.id == "email") {
            var reg = /^(\d|[a-z])+@(\d|[a-z])+.([a-z])+$/ig;
            if (!val) {
                str = "";
            } else if (!reg.test(val)) {
                str = "<span style='color: #f00;'>电子邮箱格式不正确</span>";
                boo = false;
            }
        }
        hint.innerHTML = str;

    }

    uname.onblur = function () {
        input_blur.call(this);
    }
    upwd.onblur = function () {
        input_blur.call(this);
    }
    upwdi.onblur = function () {
        input_blur.call(this);
    }
    phone.onblur = function () {
        input_blur.call(this);
    }
    email.onblur = function () {
        input_blur.call(this);
    }

    $("#lm_but").click(function () {
        var $uname = $("#uname");
        var $upwd = $("#upwd");
        var $upwdi = $("#upwdi");
        var $phone = $("#phone");
        var $email = $("#email");

        if (!$uname.val()) {
            $uname.parent().parent().next().html(`<span
            style = 'color: #f00;' > 请输入用户名 </span>`)
            ;
        } else if (!$upwd.val()) {
            $upwd.parent().parent().next().html(`<span
            style = 'color: #f00;' > 请输入密码 </span>`)
            ;
        } else if (!$upwdi.val()) {
            $upwdi.parent().parent().next().html(`<span
            style = 'color: #f00;' > 请输入确认密码 </span>`)
            ;
        } else if ($upwd.val() !== $upwdi.val()) {
            $upwdi.parent().parent().next().html(`<span
            style = 'color: #f00;' > 密码和确认密码不一致 </span>`)
            ;
        } else {
            $.ajax({
                url: "/user/signin",
                type: "post",
                data: "uname=" + $uname.val() + "&&upwd=" + $upwd.val() + "&&phone=" + $phone.val() + "&&email=" + $email.val(),
                async: true,
                dataType: "json",
                success: function (data) {
                    if (data.msg == 1) {
                        timeout(0);
                    }
                }, error: function () {
                    alert(1);
                }
            });
        }
    })

    function timeout(n) {
        $(".lm_div_signin")
            .html(`<a href="index.html" class= "text-white h5"> 注册成功, ${3-n}秒后自动跳转到主页。如果不能跳转，请点击这段文字 </a>`);
        if(n<3){
            setTimeout(function () {
                timeout(++n)
            }, 1000);
        }else{
            location.href="index.html";
        }

    }
});
