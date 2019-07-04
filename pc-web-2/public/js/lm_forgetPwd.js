//登录框居中
function setHeight(){
    var hei=document.getElementsByClassName("lm_div_signin")[0];
    var xwidth = document.documentElement.clientWidth;
    var xheight = document.documentElement.clientHeight;
    document.getElementsByClassName("lm_set_bg_img")[0].style.height=xheight+"px";
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
        zdiv.style.height="50%";
        zdiv.style.top='25%';
    }else if(xheight>500){
        zdiv.style.height="60%";
        zdiv.style.top="20%";
    }else{
        zdiv.style.height="80%";
        zdiv.style.top="10%";
    }
}



onload=function(){setHeight();}
onresize=function(){setHeight();}


