var $imgs=$(".zl_my_small");
// 2.为每个img绑定单击事件
// 遍历$imgs中每个img
$(".zl_my_small").on("click",function(){
    // 4.修改属性
    var $img=$(this);
    var src=$img.attr("data-target");
    $("#zl_my_big").attr({src});
})