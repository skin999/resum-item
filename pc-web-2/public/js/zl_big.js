var $imgs=$(".zl_my_small");
// 2.Ϊÿ��img�󶨵����¼�
// ����$imgs��ÿ��img
$(".zl_my_small").on("click",function(){
    // 4.�޸�����
    var $img=$(this);
    var src=$img.attr("data-target");
    $("#zl_my_big").attr({src});
})