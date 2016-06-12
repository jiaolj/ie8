define(['jfa'],function(Jui){
	var Base = (function(){
		var _obj = {};
		return {
			user : {
				get : function(){
					return {username:$.cookie('username'),rank:$.cookie('rank')}
				},
				member : [
					{username:'udms',password:'udms',rank:'1'},
					{username:'973',password:'973',rank:'0'}
				],
				show : function(suc){
					if($.cookie('username')){
						suc && suc();
					}else{
						Jui.tools.login(function(){
							var username = $('.msg.login input[name="username"]').val().trim(),
								password = $('.msg.login input[name="password"]').val().trim();
							$.each(_obj.user.member,function(k,j){
								if(username==j.username && password==j.password){
									$.cookie('username',username);
									$.cookie('rank',j.rank);
									Jui.tools.alertLeave();
									$('.msg.login p.error').text('登陆成功');
									$('span.user>span').text(username);
									$('span.user>a').text('注销');
									$('.jui-login-box').removeClass('hide');
									suc && suc();
								}
							})
							if(!$.cookie('username')) $('.msg.login p.error').text('账号或密码错误');
						});
					}
				}
			},
			bind : function(){
				$('span.user>a').click(function(){
					var o = $(this),
						txt = o.text();
					if(txt=='登录'){
						_obj.user.show();
					}
					else if(txt=='注销'){
						$.cookie('username','');
						$.cookie('rank','');
						o.text('登录');
						$('span.user>span').text('');
						$('.jui-login-box').addClass('hide');
					}
				})
			},
			init : function(){
				_obj = this;
				_obj.bind();
				if($.cookie('username')){
					$('span.user>span').text($.cookie('username'));
					$('span.user>a').text('注销');
				}else{
					$('.jui-login-box').addClass('hide');
				};
				return _obj;
			}
		}
	})();
	return Base;
})