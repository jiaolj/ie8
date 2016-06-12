define({
	run : function(){
		console.log('Dom run!');
	},
	alert : {
		msg : '\
			<div class="msg">#msg</div>\
		',
		ok : '\
			<div class="confirm">\
				<div class="alertInner green">\
					<h1><i class="fa fa-check-circle"></i> 成功信息</h1>\
					<div class="msg">#msg</div>\
				</div>\
				<div class="toolBar">\
					<nav>\
						<span><p><button class="button-green" type="button"><i class="fa fa-check"></i>确定</button></p>\
					</nav>\
				</div>\
			</div>\
		',
		login : '\
			<div class="confirm">\
				<div class="alertInner green">\
					<h1><i class="fa fa-check-circle"></i> 用户登录</h1>\
					<div class="msg login">\
						<p>帐号 <input type="text" name="username"/></p>\
						<p>密码 <input type="password" name="password"/></p>\
						<p class="error"></p>\
					</div>\
				</div>\
				<div class="toolBar">\
					<nav>\
						<span><p><button class="button-green checks" rel="callback" type="button"><i class="fa fa-check"></i>确定</button></p>\
						<p><button class="button-green closes" rel="" type="button"><i class="fa fa-close"></i> 取消</button></p></span>\
					</nav>\
				</div>\
			</div>\
		',
		warn : '\
			<div class="confirm">\
				<div class="alertInner red">\
					<h1><i class="fa fa-exclamation-circle"></i> 警告提示</h1>\
					<div class="msg">#msg</div>\
				</div>\
				<div class="toolBar">\
					<nav>\
						<span><p><button class="button-red" type="button"><i class="fa fa-check"></i>确定</button></p>\
					</nav>\
				</div>\
			</div>\
		',
		confirm : '\
			<div class="confirm">\
				<div class="alertInner red">\
					<h1><i class="fa fa-question-circle"></i> 确认信息</h1>\
					<div class="msg">#msg</div>\
				</div>\
				<div class="toolBar">\
					<nav>\
						<span><p><button class="button-green" rel="callback" type="button"><i class="fa fa-check"></i>确定</button></p>\
						<p><button class="button-red" rel="" type="button"><i class="fa fa-close"></i> 取消</button></p></span>\
					</nav>\
				</div>\
			</div>\
		'
	},
	stats : {
		loading : '<div class="loading"><img src="img/loading.gif"></div>',
	},
	hospitals : '\
		<tr class="gray" did="#id">\
			<td><input type="checkbox"></td>\
			<td>#name</td>\
			<td><a class="edit"><i class="fa fa-edit"></i></a><a class="remove" sname="#name"><i class="fa fa-remove"></i></a></td>\
		</tr>\
	',
	doctors : '\
		<tr class="gray" did="#id">\
			<td><input type="checkbox"></td>\
			<td>#name</td>\
			<td><a class="delversion"><i class="fa fa-edit"></i></a><a class="delversion" sname="#name"><i class="fa fa-remove"></i></a></td>\
		</tr>\
	',
})