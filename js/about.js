
	

//	折叠菜单
$(document).ready(function(){
	$(".panel-heading").click(function(){
		//删除点击元素之外的同级子元素中change类名，并为其添加空标记
		$(".panel-heading").not(this).find(".prev1").removeClass("change").attr("leng",'');
		//通过标记确认是否删除change类
		if ($(this).find(".prev1").attr("leng")=="s"){
			$(this).find(".prev1").removeClass("change").attr("leng","");
		}else{
			$(this).find(".prev1").addClass("change").attr("leng","s");
		}
	});
});
