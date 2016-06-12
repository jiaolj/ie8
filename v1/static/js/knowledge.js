require.config({
	paths: {
		jquery: '/js/jquery.min',
		cookie: '/js/jquery.cookie',
		base: '/js/base',
		jfa: '/js/jfa',
		echarts: '/js/echarts.min'
	}
})

require(['jquery','base','jfa','echarts','cookie'], function($,Base,Jfa,ec) {
	var Start = (function(){
		var _obj = {},
			_dom = '<tr><td>#pk</td><td><a href="#url" target="_blank">#title</a></td><td>#topics</td><td>#pubDate</td><td><a class="index">标引</a></td></tr>',
			_fromNum = 0,
			_limitNum = 20,
			_cnt = $('#list');
		return {
			getData : function(data){
				_cnt.html(function(){
					var htm = '';
					$.each(data,function(k,j){
						htm += _dom.replace('#pk',j.pk).replace('#title',j.title).replace('#pubDate',j.pubDate).replace('#url',j.url).replace('#topics',function(){
							var htm = ''
							$.each(j.topics,function(k,j){
								htm += j.name + ' ';
							});
							return htm;
						}());
					})
					htm += '<br class="cb"/>';
					return htm;
				}).find('a.index').click(function(){
					var pk = $(this).parent().parent().find('td:eq(0)').text();
					location.href = '/knowledge/'+pk+'.html';
				})
			},
			getList : function(){
				_cnt.empty();
				$.ajax({
					url : '/knowledge/get',
					data : {kwd:$('#search-input').val().trim(),fromNum:_fromNum,limitNum:_limitNum},
					dataType : 'json',
					success : function(back){
						log(back);
						if(back.status=='ok') _obj.getData(back.data);
						if(Jfa.page.status==0){
							Jfa.page.init({
								dom : $('.pagelist'),
								count : back.count,
								every : 20,
								suc : function(fromNum,limitNum){
									_fromNum = fromNum;
									_limitNum = limitNum;
									_obj.getList();
								}
							})
						}
					}
				})
			},
			query : function(){
				_obj.getList();
			},
			init : function(){
				_obj = this;
				_obj.conf = {
					main : $('#content')
				};
				Jfa.init({
					size:(100/1920),
					callback : {
						
					}
				});
				Base.init();
				_obj.query();
				_obj.req = Jfa.tools.getRequest();
				$('#search-btn').click(function(){
					_obj.query();
				});
				$('#search-input').keypress(function(event) {
					if (event.which == 13){
						_obj.query();
					}
				});
			}
		}
	})();
	$(function() {
		Start.init()
	})
})