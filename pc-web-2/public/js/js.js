/*����ļ�дjs����*/
$(".zl_my_img").on("click",function(){
    // ��õ�ǰ�뱾��
    var $img=$(this);
    // 4.�޸ĵ�ǰimg��src
    // ��õ�ǰimg��alt��תΪ����1
    var alt=parseInt($img.attr("alt"))
    if(alt<6){
        alt+=1;}
    else{
        alt=1;
    }
    var src=`img/${alt}.gif`;
    // ���µ�src��alt�������ԣ����ĵ���ǰimg��
    $img.attr({src,alt});
    // $img.attr("src",src);
    // $img.attr("alt",alt);
})