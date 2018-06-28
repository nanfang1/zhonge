$('#jieshao').click(function() {
	$.dialog({
		type: 'confirm',
		titleText: "请登陆！",
		onClickOk : function(){
			window.location.href="./minutepagecopy.html";
		},
		onClickCancel : function(){        		
			alert('你点了取消~~');
		}
	});
	return false;
});
$('#contract').click(function() {
	$.dialog({
		type: 'confirm',
		titleText: "请登陆！",
		onClickOk : function(){
			window.location.href="./minutepagecopy.html";
		},
		onClickCancel : function(){        		
			alert('你点了取消~~');
		}
	});
	return false;
});
$('#Order').click(function() {
	$.dialog({
		type: 'confirm',
		titleText: "请登陆！",
		onClickOk : function(){
			window.location.href="./minutepagecopy.html";
		},
		onClickCancel : function(){        		
			alert('你点了取消~~');
		}
	});
	return false;
});