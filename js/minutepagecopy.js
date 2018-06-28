$(function () {
    function display(ele, text, timer1) {
        $(ele).text(text).css({
            display: "block"
        });
        clearTimeout(timer1);
        timer1 = setTimeout(function () {
            $(ele).css({
                display: "none"
            });
        }, 1500);
    }
    var ifreal=false;//载入页面为未认证状态
		$("#order-ok").click(function () {
		//登陆之后判断是否实名认证
        if (!ifreal) {
			$.dialog({
				type: 'confirm',
				titleText: "请实名验证",
				onClickOk : function(){
					ifreal=true;
				},
				onClickCancel : function(){        		
					alert('你点了取消~~');
				}
			});
        } else {
            var timer1 = null;
            if ($("#qty_item_1").val() == '') {
                display("#prompt", "中e众筹：请先输入认购份数", timer1);
            } else {
                if ($("#sumofmoney").text() == 0) {
                    display("#prompt", "中e众筹：余额不足，请充值", timer1);
                } else {
                    //立即订购下一步
                    return false;
                }
            }

        }
    })
})
