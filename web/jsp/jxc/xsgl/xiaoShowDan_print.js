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

	LODOP.PRINT_INIT("销售单套打");//打印初始化  
	LODOP.SET_PRINT_PAGESIZE("0","210mm","279mm","销售单套打")//设定纸张大小 为	A4

	
	LODOP.ADD_PRINT_TEXT(100,78,260,30,Ext.getDom('kpsj').value);//开票时间
	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
	
	LODOP.ADD_PRINT_TEXT(100,555,125,30,Ext.getDom('jhdh').value);//NO
	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
	
	
	
	//上边距，左边距，宽度，高度
	LODOP.ADD_PRINT_TEXT(130,200,180,30,Ext.getDom('khmc').value);//客户名称
	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);

	LODOP.ADD_PRINT_TEXT(130,550,180,30,Ext.getDom('zkhmc').value);//子客户名称
	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
		
	
	
	LODOP.ADD_PRINT_TEXT(160,20,180,30,Ext.getDom('pzgg').value);//品种规格
	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
	
	LODOP.ADD_PRINT_TEXT(160,204,150,30,Ext.getDom('sl').value);//数量
	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
	
	LODOP.ADD_PRINT_TEXT(160,339,150,30,Ext.getDom('dj').value);//单价
	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
	
	LODOP.ADD_PRINT_TEXT(160,481,150,30,Ext.getDom('je').value);//金额
	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
	
	LODOP.ADD_PRINT_TEXT(160,631,150,30,Ext.getDom('bz').value);//备注
	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
	

	
	LODOP.ADD_PRINT_TEXT(200,200,400,30,Ext.getDom('dxje').value);//大写金额
	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);

	
	
	LODOP.ADD_PRINT_TEXT(260,130,90,30,Ext.getDom('kpy').value);//开票员
	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
	
		
	
	LODOP.PRINT_SETUP();//打印维护
	LODOP.PRINT;// 直接打印
}

