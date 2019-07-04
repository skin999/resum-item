//ifram 自适应高度
function setIframeHeight(iframe){
	
    if (iframe) {
        var iframeWin = iframe.contentWindow || iframe.contentDocument.parentWindow;
        if (iframeWin.document.body) {
            iframe.height =  iframeWin.document.body.scrollHeight;//iframeWin.document.documentElement.scrollHeight ||
        }
    }
}


$(function(){
//登录框居中
function setHeight(){
    var hei=document.getElementsByClassName("lm_div_login")[0];
    var xwidth = document.documentElement.clientWidth;
    var xheight = document.documentElement.clientHeight;
    hei.style.height=xheight+"px";
    var zdiv=hei.firstElementChild;
    if(xwidth>992){
        zdiv.style.width="30%";
        zdiv.style.left='35%';
    }else if(xwidth>767){
        zdiv.style.width="35%";
        zdiv.style.left="32.5%";
    }else if(xwidth>576){
        zdiv.style.width="45%";
        zdiv.style.left="27.5%";
    }else{
        zdiv.style.width="70%";
        zdiv.style.left="15%";
    }
    if(xheight>700){
        zdiv.style.height="55%";
        zdiv.style.top='25%';
    }else if(xheight>500){
        zdiv.style.height="70%";
        zdiv.style.top="15%";
    }else{
        zdiv.style.height="100%";
        zdiv.style.top="0";
    }
}

//点击导航栏变色
function dj(){
    var abs = document.querySelectorAll("#content li:not(:last-child)>a");
    for(var ab of abs){
        ab.onclick=function(){
            for(var abd of abs){
                abd.className="nav-link p-sm-0 pt-sm-2 pb-sm-2 p-md-2 lm_hover_ff5252 text-white";
            }
            this.className="nav-link p-sm-0 pt-sm-2 pb-sm-2 p-md-2 lm_hover_ff5252 lm_font_color_ff5252";
        }
    }
}

//点击登录时显示登录界面
function dkLogin(){
    var dja = document.querySelector("#content li:last-child>a");
    dja.onclick=function(){
        var loginUI = document.querySelector(".lm_div_login");
        if(!loginUI.style.display){
            loginUI.style.display="block";
        }
    }
}

//点击登录界面的关闭时关闭登录界面
function gbLogin(){
    var dja = document.querySelector(".fa-window-close");
    dja.onclick=function(){
        var loginUI = document.querySelector(".lm_div_login");
        if(loginUI.style.display){
            loginUI.style.display="";
        }
    }
}

//当input框获取焦点时，提示
function input_focus(){
    var hint = this.parentElement.parentElement.nextElementSibling;
    var str ="";
    if(this.id=="uname"&&!this.value){
        str="<span style='color: #84c1ff;'>请输入用户名</span>";
    }else if(this.id=="upwd"&&!this.value){
        str="<span style='color: #84c1ff;'>请输入密码</span>";
    }
    hint.innerHTML=str;
}
uname.onfocus=function(){input_focus.call(this);}
upwd.onfocus=function(){input_focus.call(this);}


//当input框失去焦点时，验证输入的是否符合要求
function input_blur(){
    var hint = this.parentElement.parentElement.nextElementSibling;
    var val = this.value;
    var str = "";
    if(this.id=="uname"){
        var reg = /^\d{8}$/;
        if(!val){
            str="<span style='color: #f00;'>请输入用户名</span>";
        }else if(!reg.test(val)){
            str="<span style='color: #f00;'>请输入长度为8位的数字</span>";
        }
    }else if(this.id=="upwd"){
        if(!val){
            str="<span style='color: #f00;'>请输入密码</span>";
        }else if(val.length<6){
            str="<span style='color: #f00;'>请输入长度大于6位的密码</span>";
        }
    }
    hint.innerHTML = str;
}
uname.onblur=function(){input_blur.call(this);}
upwd.onblur=function(){input_blur.call(this);}



//当点击登录时
butLogin.onclick=function(){
    var uname = document.getElementById("uname");
    var upwd = document.getElementById("upwd");
    var unameNext = uname.parentElement.parentElement.nextElementSibling;
    var upwdNext = upwd.parentElement.parentElement.nextElementSibling;
    if(!uname.value)
        unameNext.innerHTML = "<span style='color: #f00;'>请输入用户名</span>";
    if(!upwd.value)
        upwdNext.innerHTML = "<span style='color: #f00;'>请输入密码</span>";
    else{
        $.ajax( {
            /*请求地址*/
            url : "/user/login",
            /*请求类型*/
            type : "post",
            /*请求参数*/
            data : "uname="+uname.value+"&&upwd="+upwd.value,
            /*异步*/
            async : true,
            /*返回类型*/
            dataType : "json",
            /*响应成功回调函数*/
            success : function(data) {
                switch (data.code){
                    case 200 : document.querySelector(".lm_div_login").style.display="";
                        document.getElementById("login").style.display="none";
                        document.getElementById("login").nextElementSibling.style.display="block";
                        sessionStorage.setItem("user",data.msg.uname);
                        aa.innerHTML=sessionStorage.getItem("user");
                        /**sessionStorage.setItem('key',value);//数据存入session
                         sessionStorage.getItem('key');//获取session中的数据
                         sessionStorage.removeItem('key');//删除session中名为"key"的值*/
                        break;
                    default : upwdNext.innerHTML = "<span style='color: #f00;'>用户名或密码错误</span>";
                        break;
                }
            },error : function() {
                alert(1);
            }
        });
    }
}

//刷新页面时判断是否登录
function isLogin(){
    if(sessionStorage.getItem("user")!=null){
        document.querySelector(".lm_div_login").style.display="";
        document.getElementById("login").style.display="none";
        document.getElementById("login").nextElementSibling.style.display="block";
        aa.innerHTML=sessionStorage.getItem("user");
    }
}

$("#exitLogin").click(function(){
    $(this).parent().parent()
    .css("display","none")
    .prev().css("display","block");
    sessionStorage.removeItem('user');
})

isLogin()
setHeight();
dj();
dkLogin();
gbLogin();
onresize=function(){
    setHeight();
    setIframeHeight(lm_body_frame);
}

$("#content").on("click","a",function(){
	$(this).parent().parent().parent().removeClass("show");
})

});
