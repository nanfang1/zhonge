$(function () {
    //银行卡信息验证
    var list1 = [{
            reg: /^([1-9]{1})(\d{14}|\d{18})$/,
            prompt: "银行卡号格式错误",
            ok: "银行卡号格式正确"
        },
        {
            reg: /^[\u4e00-\u9fa5]{0,}$/,
            prompt: "银行支行名称格式错误",
            ok: "名称格式正确"
        },
        {
            reg: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
            prompt: "身份证号码错误",
            ok: "身份证号格式正确"
        },
        {
            reg: /^\d{6}$/,
            prompt: "手机验证码错误",
            ok: "手机验证码正确"
        }

    ];

    $("#confirm").click(function () {
        var timer1 = null;
        var a = 0;
        $("input[type='text']").each(function () {
            if ($(this).val() == "") {
                display("#prompt", $(this).attr("placeholder"), timer1);
                return false;
            }
            a++;
        });
        //先判断输入框是否为空，如果不为空填写验证码后判断验证码是否正确，如果正确再判断其他输入框输入格式是否正确,,,定义一个模拟验证码var yzm=123456,如果验证码填写等于
        //短信验证平台发来的验证码,再验证其他输入框值是否正确
        var yzm = "123456";
        $("")
        if (a == $("input[type='text']").length) {

            var num = 0;
            $("input[type='text']").each(function (index) {
                if (list1[index].reg.test(this.value) == true) {
                    console.log(list1[index].ok);
                    num++
                } else {
                    display("#prompt", list1[index].prompt, timer1);
                    return false;
                }
            })
            if (num == $("input[type='text']").length) {
                if ($("input[type='text']:last").val() == yzm) {

                    display("#prompt", "保存成功", timer1);
                    return false;

                } else {
                    display("#prompt", "验证码错误", timer1);
                    return false;
                }
            }

        }

    })

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
    //银行卡信息验证结束

    //获取验证码倒计时
    var timer = null;
    // var flag = true;
    $(".verification").click(function () {
        var countdown = 60;
        var $_this = $(this);
        timer = setInterval(function () {
            countdown--;
            $_this.attr("disabled", "disabled").css("color", "#999999").text("重新发送" +
                "(" + countdown + ")");
            if (countdown < 0) {
                clearInterval(timer);
                $_this.removeAttr("disabled").text("获取验证码").css("color", "#4dd0c8");

            }
        }, 1000)
    })
    //获取验证码倒计时结束
    //加载页面省市联动 
    var mybank_val = "6";
    var province_val = "18";
    var city = "0";
    var zhihang = "建华南大街支行"
    $("#bankname").val(mybank_val);
    // $("#province option").eq(2).attr("selected","selected");
    $("#province").val(province_val);
    var myselect = document.getElementById("province");
    chooseProvince(myselect);
    $("#city").val(city);
    $("#zhihang").val(zhihang);
    //加载页面省市联动结束
})
