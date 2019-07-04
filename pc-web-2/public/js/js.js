/*这个文件写js代码*/
$(".zl_my_img").on("click",function(){
    // 获得当前请本身
    var $img=$(this);
    // 4.修改当前img的src
    // 获得当前img的alt，转为整数1
    var alt=parseInt($img.attr("alt"))
    if(alt<6){
        alt+=1;}
    else{
        alt=1;
    }
    var src=`img/${alt}.gif`;
    // 将新的src和alt两个属性，都改到当前img上
    $img.attr({src,alt});
    // $img.attr("src",src);
    // $img.attr("alt",alt);
})