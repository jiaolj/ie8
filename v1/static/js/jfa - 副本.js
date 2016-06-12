define(['jquery','dom'],function($,Dom){
	var Jui = (function(){
		var _obj = {},
			_init = {},
			_mouse = '' //鼠标位置
		;
		return {
			run : function(){
				console.log('Jui run!');
			},
			jui : {
				alert : function(){
					$('body').append('<div class="jui-alert" id="jui-alert"></div>');
					return $('#jui-alert');
				}(),
				cover : function(){
					$('body').append('<div class="jui-cover" id="jui-cover"></div>');
					return $('#jui-cover');
				}()
			},
			page : (function(){
				var _o = {},
					_i = {},
					_dom = '<a p="1">首页</a><a p="#pre">上一页</a>#pages<a p="#next">下一页</a><a p="#allp">尾页</a>'
				;
				return {
					getList : function(){
						var pages = '',plist = [];
						if(_i.page>(_o.pgl+1)){
							for(var i = (_i.page-_o.pgl);i<(_i.page+_o.pgr);i++){
								plist.push(i);
							}
						}else{
							for(var i = 1;i<(_o.pgl+_o.pgr+1);i++){
								plist.push(i);
							}
						}
						$.each(plist,function(k,j){
							pages += '<a class="pg-num" p="'+j+'">'+j+'</a>';
						})
						_i.dom.html(function(){
							var pre = _i.page - 1,
								next = _i.page + 1;
							if(pre<1) pre = 1;
							if(next>_i.allp) next = _i.allp;
							return '<div class="jui-page">'+_dom.replace('#pages',pages).replace('#allp',_i.allp).replace('#pre',pre).replace('#next',next)+'</div>';
						}).find('a.pg-num[p="'+_i.page+'"]').addClass('active');
						_i.dom.find('a').click(function(){
							_i.page = parseInt($(this).attr('p'));
							_o.getList();
							_i.suc((_i.page-1)*_i.every,_i.every);
						});
					},
					status : 0,
					init : function(arg){
						_o = this;
						_i = arg;
						_o.status = 1;
						_o.pgl = _i.pgl || 3;
						_o.pgr = _i.pgr || 4;
						_i.page = 1;
						_i.allp = parseInt((_i.count-1)/_i.every)+1;
						_o.getList();
					}
				}
			})(),
			e : {
				scrollFunc :function(e){
					var e = e || window.event,
						val = e.wheelDelta || e.detail,
						n = 0
					;
					if(val==120||val==-3){
						n = -1;
					}else if(val==-120||val==3){
						n = 1;
					}
					$('.jui-scrollbar').each(function(k,i){
						var o = $(i),
							to = o.find(o.attr('jui-tar')),
							top = parseInt(to.css('top')) + n*-6,
							mouse = o.attr('jui-mouse')
						;
						if(_mouse == mouse && top<7){
							to.css({'top':top+'px'});
						}
						else if(_mouse==''){
							$('body,html').animate({'scrollTop':'+='+n*18+'px'},1);
						}
					})
					if(e.preventDefault){ /*FF 和 Chrome*/
						e.preventDefault();// 阻止默认事件
					}
				}
			},
			jui : {
				alert : $('#jui-alert'),
				cover : $('#jui-cover'),
				form : $('#jui-form')
			},
			tools: {
				getSize : function(){
					document.getElementById('html').style.fontSize = document.body.clientWidth*100/1920+'px'
				},
				alert : function(tp,msg){
					var msg = msg || _obj.tools.alertDefault[tp].msg;
					_obj.jui.alert.show().html(Dom.alert[tp].replace('#msg',msg)).css({top:'-'+_obj.jui.alert[0].clientHeight+'px'}).animate({top:_obj.tools.alertDefault[tp].top}).find('button').click(function(){
						if(_obj.tools.alertDefault[tp].callback) _obj.tools.alertDefault[tp].callback();
						else _obj.tools.alertLeave();
					})
					_obj.msg.alertMsg = _obj.tools.alertDefault[tp].leave;
				},
				alertDefault : {
					'msg' : {'msg':'弹出消息',leave:3,top:'10%'},
					'ok' : {'msg':'成功信息！',leave:3,top:'10%'},
					'warn' : {'msg':'警告信息！',leave:3,top:'10%'},
					'confirm' : {'msg':'确定要删除该行信息吗?',leave:-1,top:'0'},
				},
				alertLeave : function(){
					_obj.jui.alert.animate({top:'-'+_obj.jui.alert[0].clientHeight+'px'},300,function(){
						$(this).empty().hide();
						_obj.jui.cover.hide();
					})
				},
				login : function(suc){
					_obj.jui.cover.show();
					_obj.jui.alert.show().html(Dom.alert.login).css({top:'-'+_obj.jui.alert[0].clientHeight+'px'}).animate({top:'10%'},function(){
						$(this).find('input[name="username"]').focus();
					});
					_obj.jui.alert.find('input[name="password"]').keypress(function(event) {
						if (event.which == 13){
							suc && suc();
						}
					});
					_obj.jui.alert.find('button.checks').click(function(){
						suc && suc();
					})
					_obj.jui.alert.find('button.closes').click(function(){
						_obj.tools.alertLeave();
					})
				},
				confirm : function(msg,suc){
					_obj.jui.cover.show();
					if(msg=='') msg = '确定要删除该信息吗?';
					_obj.jui.alert.show().html(Dom.alert.confirm.replace('#msg',msg)).css({top:'-'+_obj.jui.alert[0].clientHeight+'px'}).animate({top:'0'}).find('button').click(function(){
						var txt = $(this).attr('rel');
						_obj.tools.alertLeave();
						if(txt=='callback') suc && suc();
					})
				},
				data : {
					toDouble : function(n){ //单数转双数(1转01)
						n = n + '';
						if(n.length==1) n = '0' + n;
						return n;
					},
					arrayRemove : function(list,s){
						var lb=[],
							x = list.indexOf(s)
						;
						for(var i in list){
							if(i!=x) lb.push(list[i]) 
						}
						return lb;
					},
				},
				time : {
					getStrTime : function(d){ //获取时间字符串。返回值，例：2000-01-01 00:00:00。接收参数，例：{con:['-','-',' ',':',':',' '],now: new Date()}
						var toDouble = _obj.tools.data.toDouble,
							d = d || {},
							con = d.con || ['-','-',' ',':',':',' '],
							now = d.now || new Date(),
							year = now.getFullYear(),
							month = toDouble(now.getMonth()+1),
							day = toDouble(now.getDate()),
							hours = toDouble(now.getHours()),
							minutes = toDouble(now.getMinutes()),
							seconds = toDouble(now.getSeconds()),
							clock = ''
						;
						if(con[0]!='') clock += year + con[0];
						if(con[1]!='') clock += month + con[1];
						if(con[2]!='') clock += day + con[2];
						if(con[3]!='') clock += hours + con[3];
						if(con[4]!='') clock += minutes + con[4];
						if(con[5]!='') clock += seconds + con[5];
						return clock;
					},
				},
			},
			msg : {
				num : 0,
				alertMsg : -1,
				switch : [1,0], //开关参数
			},
			task : function(f){
				var _obj = this;
				_obj.msg.num ++;
				f && f();
			},
			bind : function(dom){ //为某个DOM节点绑定事件(MVVM模式)
				//增加或删除active
				dom.find('[jui-click="active"]').each(function(k,i){
					var o = $(i),
						obj,
						tar = o.attr('jui-tar'), //点击元素
						to = o.attr('jui-to'), //直接目标元素
						son = o.attr('jui-son'), //子类目标元素
						pr = parseInt(o.attr('jui-prt')) || 0, //父类目标元素
						r = o.attr('jui-repeat'), //是否唯一
						k = o.attr('jui-callback') //回调函数
					; 
					if(tar) obj = o.find(tar);
					else obj = o;
					obj.click(function(){
						var ob = $(this),
							prs = ob; //目标元素
						if(to){
							prs = $(to);
						}
						else if(son){
							prs = o.find(son);
						}
						else if(pr>0){
							for(var i=0;i<pr;i++) prs = prs.parent();
						}
						if(r=='1') o.find(tar+'.active').removeClass('active');
						if(prs.hasClass('active')) prs.removeClass('active');
						else prs.addClass('active');
						k && _init.callback[k] && _init.callback[k](ob);
					})
				})
				//切换tab切换div
				dom.find('[jui-click="change-box"]').each(function(k,i){
					var o = $(i),
						s = o.attr('jui-tar'),
						to = o.attr('jui-to'),
						obj = o.find(s),
						k = o.attr('jui-callback')
					;
					obj.click(function(){
						var ob = $(this),
							i = ob.attr('i');
						o.find('.active').removeClass('active');
						ob.addClass('active');
						$('.'+to+'.active').removeClass('active');
						$('.'+to+'[i="'+i+'"]').addClass('active');
						k && _init.callback[k] && _init.callback[k](ob);
					})
				})
				//显示隐藏
				dom.find('[jui-click="hide"]').each(function(k,i){
					var o = $(i),
						tar = o.attr('jui-tar'),
						obj = tar && o.find(tar) || o, //点击元素
						to = $(o.attr('jui-to')) //直接目标元素
					;
					obj.click(function(){
						to.toggleClass('hide');
					})
				})
				//开关
				dom.find('[jui-click="jui-switch"]').each(function(k,i){
					var o = $(i);
					o.click(function(){
						var v = _obj.msg.switch[parseInt(o.attr('s'))],
							k = o.attr('jui-callback')
						;
						o.attr('s',v);
						k && _init.callback[k] && _init.callback[k](o);
					})
				})
				//只能输入数字类型
				dom.find('input[jui-input="onlyInt"]').each(function(k,i){
					var o = $(i);
					o.keyup(function(){o.val(o.val().replace(/\D/g,''))});
				})
				//自定义滚动条
				dom.find('.jui-scrollbar').each(function(k,i){
					var o = $(i),
						to = o.find(o.attr('jui-tar'))
					;
				})
			},
			back : function(dom){
				//切换tab切换div
				dom.find('[jui-click="change-box"]').each(function(k,i){
					var o = $(i),
						s = o.attr('jui-tar'),
						to = o.attr('jui-to'),
						k = o.attr('jui-callback') //回调函数
					;
					o.find(s+'.active').removeClass('active');
					o.find(s+'[i="0"]').addClass('active');
					$('.'+to+'.active').removeClass('active');
					$('.'+to+'[i="0"]').addClass('active');
					k && _init.callback[k] && _init.callback[k](o.find(s+'[i="0"]'));
				})
			},
			func : function(){
				window.log = function(){
					if(console){for(var arg in arguments) console.log(arguments[arg])}
					else {for(var arg in arguments) alert(str(arguments[args]))}
				}, //打印
				window.str=function(k){return JSON && JSON.stringify(k)},
				window.json=function(k){return eval('('+k+')')}
			},
			init : function(init){ //初始化
				_obj = this;
				_obj.func();
				_init = init || {};
				_obj.bind($(document));
				String.prototype.replaceAll = function(s1,s2){ 
					return this.replace(new RegExp(s1,'gm'),s2); 
				}
				_obj.tools.getSize();
				$(window).resize(function(){
					_obj.tools.getSize();
				})
				//body点击，隐藏某些区域
				$('body').click(function(e){
					var tar = e.target,
						className = tar.className
					;
					if(typeof(className)=='string'){
						if(className.split('jui-nohide').length<2){
							$('.jui-hides').hide();
							$('.jui-remove').remove();
						}
					}
				})
			}
		}
	})();
	return Jui;
})