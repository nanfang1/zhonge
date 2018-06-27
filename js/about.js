//	折叠菜单
$(document).ready(function () {
    $(".panel-heading a.row").click(function () {
        //删除点击元素之外的同级子元素中change类名，并为其添加空标记
        $(".panel-heading a.row").not(this).find(".prev1").removeClass("change").attr("length", '');
        $(".panel-heading a.row").not(this).parent().parent().find(".panel-collapse").css("display","none");
        //通过标记确认是否删除change类
        if ($(this).find(".prev1").attr("length") == "s") {
            $(this).parent().parent().find(".panel-collapse").css("display", "none");
            $(this).find(".prev1").removeClass("change").attr("length", "");
        } else {
            $(this).parent().parent().find(".panel-collapse").css("display", "block");
            $(this).find(".prev1").addClass("change").attr("length", "s");
        }
    });
});
