Ext.onReady(function() { 
//
var tb = new Ext.Toolbar({ 
	renderTo: document.body, 
	width: '100%', 
	height: '48', 
		items: [ 
        '-',
		{ 
				xtype: 'tbbutton', 
				pressed:true,				
				width: 45, 
				height: 40,
				icon: 'pic/quote.gif', 
				text: '销售单' ,
				handler:function(){
				addTab('xsd', '销售单','XiaoShowDan!initPage.action' , true);
			}
		},'-',{
			xtype: 'spacer',//分隔元素的空白
			width: '5'
		},{ 
		     xtype: 'tbbutton', 
		     pressed:true,				
		     width: 45, 
			 height: 40,
		     icon: 'pic/file.gif', 
			 text: '发货单',
			 handler:function(f){
			  addTab('fhd', '发货单','FaHuoDan!initPage.action' , true);

			 }
		},'-',{
			xtype: 'spacer',//分隔元素的空白
			width: '5'
		},{ 
		     xtype: 'tbbutton', //
		     pressed:true,				
		     width: 45, 
			 height: 40, 
		     icon: 'pic/forward.gif', 
			 text: '提货单',
			 handler:function(f){
			 addTab('thd', '提货单','TFHDan!initPage.action' , true);
			 }
		}
		
		
		/*,'-',{
			xtype: 'spacer',//分隔元素的空白
			width: '5'
		},{ 
		     xtype: 'tbbutton', 
		     pressed:true,				
		     width: 45, 
			 height: 40, 
		     icon: 'pic/msn.gif', 
			 text: '单 位',
			 handler:function(f){
			 addTab('wldw', '往来单位信息','wldwManagerInit.action' , true)
			 }
		 },'-',{
			xtype: 'spacer',
			width: '5'
		},{ 
		     xtype: 'tbbutton', 
		     pressed:true,				
		     width: 45, 
			 height: 40, 
		     icon: 'pic/emot.gif', 
			 text: '子客户',
			 handler:function(f){
			 addTab('khxx', '子客户信息','ZhiKeHuXX!initPage.action' , true)
			 }
		 } */ 
		
		
		
		 ,'-',{
			xtype: 'spacer',//分隔元素的空白
			width: '5'
		},{ 
		     xtype: 'tbbutton', //
		     pressed:true,				
		     width: 45, 
			 height: 40, 
		     icon: 'pic/media.gif', 
			 text: '商品规格',
			 handler:function(f){
			 addTab('khxx', '商品规格','ShangPinXX!initPage.action' , true)
			 }
		 },
		{
			xtype: 'tbfill',   //用来 将其后的组件推到工具栏的最右侧
			text :'最后侧'
		},{ 
		     xtype: 'tbbutton', //
		     pressed:true,				
		     width: 45, 
			 height: 40, 
		     icon: 'pic/icq.gif', 
			 text: '密码设置',
			 handler:function(f){			 
			   var url="userInfoInit.action";
               window.open(url,"密码设置",'height=200,width=300,top=300,left=500,toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,status=no,'+
                          +'titlebar=no')
			 }
		 },
//		'-', {xtype: 'tbspacer' },
//		{ 
//		     xtype: 'tbbutton', //
//		     pressed:true,				
//		     width: 45, 
//			 height: 40, 
//		     icon: 'pic/time.gif', 
//			 text: '日历',
//			 handler:function(f){
//			 alert(ee);
//			 var dateMenu = new Ext.menu.DateMenu({}); //日期
//			 }
//		 }, 
		'-', 
		{xtype: 'tbspacer' }, // same as ' ' to create Ext.Toolbar.Spacer 
		{ 
		     xtype: 'tbbutton', //
		     pressed:true,				
		     width: 45, 
			 height: 40, 
		     icon: 'pic/undo.gif', 
			 text: '退出',
			 handler:onItemClick
		 }, '-',
		{ xtype: 'tbspacer', width: 5 }
		] 
	}); 
		
}); 

function onItemClick(arg) {
	if (arg.text == '退出') {
		if(!confirm("请确认是否退出系统?"))
			return;
			document.location="Login.html";
	}
}


      // 弹出小窗口，将小窗口至于mainTab 中
function addTab(id, title, url, flag) {
    var mainTab = Ext.getCmp('mt');
	var n = mainTab.getComponent(id);
	if (!n) {
		var n = mainTab.add({
					'id' : id,
					'title' : title,
					closable : flag,
					html : '<iframe scrolling="auto" name="'
							+ id
							+ 'fr" frameborder="0" width="100%" height="100%" src="'
							+ url + '"></iframe>'
				});
	}
	mainTab.setActiveTab(n);
}
