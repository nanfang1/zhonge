//		模态框
		function _confirm1() {
			mizhu.confirm('', '请先登录', function(flag) {
				if(flag) {
					mizhu.alert('', '登陆成功');
				}
			});
			return false;
		}