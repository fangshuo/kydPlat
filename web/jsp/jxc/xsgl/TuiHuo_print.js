Ext.onReady(function() {

//var tb = new Ext.Toolbar({
//							renderTo : "toolbar",
//							items : [{
//										text : "打印",
//										iconCls : "print",
//										handler : function() {
//											print();
//										},
//										scope : this
//									},'-',{
//										text : "打印预览",
//										iconCls : "print",
//										handler : function() {
//											printpreview();
//										},
//										scope : this
//									}
//									]
//						});
	
	
			var tb = new Ext.Toolbar({
					renderTo : "toolbar",
					items : [{
								text : "打印",
								iconCls : "print",
								id : "print",
								handler : function() {
									print();
								},
								scope : this
							}]
				});
						
});

function print()
{


	LODOP.PRINT_INIT("退货单套打");//打印初始化  
	LODOP.SET_PRINT_PAGESIZE("0","210mm","279mm","退货单套打")//设定纸张大小 为	A4

	
//	LODOP.ADD_PRINT_TEXT(340,120,175,30,Ext.getDom('kpsj').value);//开票时间
//	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
//	
//	LODOP.ADD_PRINT_TEXT(340,560,125,30,Ext.getDom('jhdh').value);//NO
//	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
//	
//	
//	
//	//上边距，左边距，宽度，高度
//	LODOP.ADD_PRINT_TEXT(370,150,180,30,Ext.getDom('khmc').value);//客户名称
//	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
//
//	LODOP.ADD_PRINT_TEXT(370,360,120,30,Ext.getDom('zkhmc').value);//子客户名称
//	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
//		
//	
//	
//	LODOP.ADD_PRINT_TEXT(415,150,150,30,Ext.getDom('pzgg').value);//品种规格
//	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
//	
//	LODOP.ADD_PRINT_TEXT(415,360,150,30,Ext.getDom('sl').value);//数量
//	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
//	
//	LODOP.ADD_PRINT_TEXT(415,560,150,30,Ext.getDom('dj').value);//单价
//	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
//	
//	LODOP.ADD_PRINT_TEXT(415,360,150,30,Ext.getDom('je').value);//金额
//	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
//	
//	LODOP.ADD_PRINT_TEXT(415,560,150,30,Ext.getDom('bz').value);//备注
//	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
//	
//
//	
//	LODOP.ADD_PRINT_TEXT(550,160,90,30,Ext.getDom('dxje').value);//大写金额
//	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
//
//	
//	
//	LODOP.ADD_PRINT_TEXT(590,160,90,30,Ext.getDom('kpy').value);//开票员
//	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
	
LODOP.ADD_PRINT_TEXT(338,79,267,30,Ext.getDom('kpsj').value);//开票时间
LODOP.SET_PRINT_STYLEA(0,"FontSize",13);
LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
LODOP.ADD_PRINT_TEXT(338,606,125,30,Ext.getDom('thdh').value);//NO
LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
LODOP.ADD_PRINT_TEXT(372,196,227,30,Ext.getDom('khmc').value);//客户名称
LODOP.SET_PRINT_STYLEA(0,"FontSize",13);
LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
LODOP.ADD_PRINT_TEXT(372,545,120,30,Ext.getDom('zkhmc').value);//子客户名称
LODOP.SET_PRINT_STYLEA(0,"FontSize",13);
LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
LODOP.ADD_PRINT_TEXT(414,21,208,30,Ext.getDom('pzgg').value);//品种规格
LODOP.SET_PRINT_STYLEA(0,"FontSize",13);
LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
LODOP.ADD_PRINT_TEXT(414,229,109,30,Ext.getDom('sl').value);//数量
LODOP.SET_PRINT_STYLEA(0,"FontSize",13);
LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
LODOP.ADD_PRINT_TEXT(414,338,117,30,Ext.getDom('dj').value);//单价
LODOP.SET_PRINT_STYLEA(0,"FontSize",13);
LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
LODOP.ADD_PRINT_TEXT(414,454,144,30,Ext.getDom('je').value);//金额
LODOP.SET_PRINT_STYLEA(0,"FontSize",13);
LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
LODOP.ADD_PRINT_TEXT(414,610,172,30,Ext.getDom('bz').value);//备注
LODOP.SET_PRINT_STYLEA(0,"FontSize",13);
LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
LODOP.ADD_PRINT_TEXT(449,225,550,30,Ext.getDom('dxje').value);//大写金额
LODOP.SET_PRINT_STYLEA(0,"FontSize",13);
LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
LODOP.ADD_PRINT_TEXT(488,132,171,30,Ext.getDom('kpy').value);//开票员
LODOP.SET_PRINT_STYLEA(0,"FontSize",13);
LODOP.SET_PRINT_STYLEA(0,"Alignment",2);

	
	
	LODOP.PRINT_SETUP();//打印维护
	//LODOP.PRINT;// 直接打印

//	Ext.MessageBox.confirm('确认框', '打印是否成功？', function(btn) {
//		if (btn=='yes')
//		{
//			alert(1);
//			var thdh = Ext.getDom('thdh').value;
//			var jhdh = Ext.getDom('jhdh').value;
//					Ext.Ajax.request
//					({    
//						url:'TuiHuo!updateTHDH.action?jhdh='+jhdh+'&thdh='+thdh, 
//						method:'POST'
//					});	
//		}
//    });
    
}

