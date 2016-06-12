define(function(){
	var Jfa = (function(){
		var _obj = {};
		return {
			func : function(w){
				String.prototype.replaceAll = function(s1,s2){ 
					return this.replace(new RegExp(s1,'gm'),s2); 
				}
				w.log = function(d){
					if(typeof(console)=='undefined') alert(d);
					else console.log(d);
				}
				w.str=function(k){return JSON && JSON.stringify(k)}
				w.json=function(k){return eval('('+k+')')}
			},
			load : function(){
				var o = arguments[0],
					url = arguments[1];
				$.ajax({
					url : url,
					success : function(back){
						o.html(back);
					}
				})
			},
			location : function(url,o,temp){
				if(typeof(console)=='undefined'){
					location.href = '?url='+url;
				}else{
					history.pushState('rl','','/?url='+url);
				}
				/*if(url=='/') {
					location.href = '/';
				}
				else location.href = '?url='+url;
				
				if(url=='/') {
					history.pushState('rl','','/');
				}
				else history.pushState('rl','','/?url='+url);
				*/
				_obj.load(o,temp);
			},
			ajax : function(){
				var _e = {};
				_e.url = arguments[0];
				if(arguments.length==2){
					_e.arg = {};
					_e.suc = arguments[1];
				}else if(arguments.length==3){
					_e.arg = arguments[1];
					_e.suc = arguments[2];
				}
				$.ajax({
					url : _e.url,
					data : _e._arg,
					success : function(back){
						_e.suc && _e.suc(back)
					}
				})
			},
			mvvm : function(dom){ //为某个DOM节点绑定事件(MVVM模式)
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
						if(!r) o.find(tar+'.active').removeClass('active');
						if(prs.hasClass('active')) prs.removeClass('active');
						else prs.addClass('active');
						k && _obj.conf.callback[k] && _obj.conf.callback[k](ob);
					})
				})
			},
			tools : {
				getSize : function(p){
					$('html').css('font-size',document.body.clientWidth*p+'px');
				},
				getRequest : function() {
					   var url = window.location.search,
							theRequest = new Object();
					   if (url.indexOf("?") != -1) {   
						  var str = url.substr(1);   
						  strs = str.split("&");   
						  for(var i = 0; i < strs.length; i ++) {
							 theRequest[strs[i].split("=")[0]]=decodeURI(strs[i].split("=")[1]);
						  }   
					   }   
					   return theRequest;   
				}
			},
			init : function(conf){ //初始化
				_obj = this;
				_obj.conf = conf || {};
				_obj.func(window);
				_obj.mvvm($(document));
				_obj.tools.getSize(_obj.conf.size);
				if(typeof(PIE)!='undefined'){
					$('.pie').each(function() {  
						PIE.attach(this);  
					})
				}
			}
		}
	})();
	return Jfa;
})