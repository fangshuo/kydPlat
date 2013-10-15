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
	LODOP.PRINT_INIT("发货单套打");//打印初始化  
	LODOP.SET_PRINT_PAGESIZE("0","210mm","279mm","发货单套打")//设定纸张大小 为	A4

	
//	LODOP.ADD_PRINT_TEXT(340,120,175,30,Ext.getDom('fhsj').value);//开票时间
//	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
//	
//	LODOP.ADD_PRINT_TEXT(340,560,125,30,Ext.getDom('fhdh').value);//NO
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
//	LODOP.ADD_PRINT_TEXT(370,500,120,30,Ext.getDom('zrsl').value);//转入数量
//	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
//	
//	
//	LODOP.ADD_PRINT_TEXT(415,150,150,30,Ext.getDom('jhdh').value);//计划单号
//	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
//	
//	LODOP.ADD_PRINT_TEXT(415,360,150,30,Ext.getDom('pzgg').value);//品种规格
//	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
//	
//	LODOP.ADD_PRINT_TEXT(415,560,150,30,Ext.getDom('zcsl').value);//转出数量
//	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
//	
//    
//    LODOP.ADD_PRINT_TEXT(450,150,150,30,Ext.getDom('fhsl').value);//发货数量
//	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
//	
//	LODOP.ADD_PRINT_TEXT(450,360,150,30,Ext.getDom('jhsl').value);//计划数量
//	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
//	
//	LODOP.ADD_PRINT_TEXT(450,560,150,30,Ext.getDom('cydw').value);//承运单位
//	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
//	
//	
//	LODOP.ADD_PRINT_TEXT(480,150,150,30,Ext.getDom('zhdz').value);//折合袋装
//	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
//	
//	LODOP.ADD_PRINT_TEXT(480,360,150,30,Ext.getDom('fhlj').value);//发货累计
//	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
//	
//	LODOP.ADD_PRINT_TEXT(480,560,150,30,Ext.getDom('cych').value);//承运车号
//	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
//	
//
//	LODOP.ADD_PRINT_TEXT(510,150,150,30,Ext.getDom('kczl').value);//空车重量
//	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
//	
//	LODOP.ADD_PRINT_TEXT(510,360,150,30,Ext.getDom('ys').value);//余数
//	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
//	
//	LODOP.ADD_PRINT_TEXT(510,560,150,30,Ext.getDom('ccbh').value);//出厂编号
//	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);	
//	
//	
//	LODOP.ADD_PRINT_TEXT(540,160,90,30,Ext.getDom('kpy').value);//开票员
//	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
	
LODOP.ADD_PRINT_TEXT(340,120,274,30,Ext.getDom('fhsj').value);//开票时间
LODOP.SET_PRINT_STYLEA(0,"FontSize",13);
LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
LODOP.ADD_PRINT_TEXT(340,560,125,30,Ext.getDom('fhdh').value);//NO
LODOP.SET_PRINT_STYLEA(0,"FontSize",13);
LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
LODOP.ADD_PRINT_TEXT(376,150,180,30,Ext.getDom('khmc').value);//客户名称
LODOP.SET_PRINT_STYLEA(0,"FontSize",13);
LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
LODOP.ADD_PRINT_TEXT(376,360,120,30,Ext.getDom('zkhmc').value);//子客户名称
LODOP.SET_PRINT_STYLEA(0,"FontSize",13);
LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
LODOP.ADD_PRINT_TEXT(376,602,120,30,Ext.getDom('zrsl').value);//转入数量
LODOP.SET_PRINT_STYLEA(0,"FontSize",13);
LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
LODOP.ADD_PRINT_TEXT(415,150,150,30,Ext.getDom('jhdh').value);//计划单号
LODOP.SET_PRINT_STYLEA(0,"FontSize",13);
LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
LODOP.ADD_PRINT_TEXT(415,360,212,30,Ext.getDom('pzgg').value);//品种规格
LODOP.SET_PRINT_STYLEA(0,"FontSize",13);
LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
LODOP.ADD_PRINT_TEXT(415,602,120,30,Ext.getDom('zcsl').value);//转出数量
LODOP.SET_PRINT_STYLEA(0,"FontSize",13);
LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
LODOP.ADD_PRINT_TEXT(450,150,150,30,Ext.getDom('fhsl').value);//发货数量
LODOP.SET_PRINT_STYLEA(0,"FontSize",13);
LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
LODOP.ADD_PRINT_TEXT(450,360,150,30,Ext.getDom('jhsl').value);//计划数量
LODOP.SET_PRINT_STYLEA(0,"FontSize",13);
LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
LODOP.ADD_PRINT_TEXT(450,528,282,30,Ext.getDom('cydw').value);//承运单位
LODOP.SET_PRINT_STYLEA(0,"FontSize",13);
LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
LODOP.ADD_PRINT_TEXT(480,150,150,30,Ext.getDom('zhdz').value);//折合袋装
LODOP.SET_PRINT_STYLEA(0,"FontSize",13);
LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
LODOP.ADD_PRINT_TEXT(480,360,150,30,Ext.getDom('fhlj').value);//发货累计
LODOP.SET_PRINT_STYLEA(0,"FontSize",13);
LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
LODOP.ADD_PRINT_TEXT(480,534,261,30,Ext.getDom('cych').value);//承运车号
LODOP.SET_PRINT_STYLEA(0,"FontSize",13);
LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
LODOP.ADD_PRINT_TEXT(510,150,150,30,Ext.getDom('kczl').value);//空车重量
LODOP.SET_PRINT_STYLEA(0,"FontSize",13);
LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
LODOP.ADD_PRINT_TEXT(510,360,150,30,Ext.getDom('ys').value);//余数
LODOP.SET_PRINT_STYLEA(0,"FontSize",13);
LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
LODOP.ADD_PRINT_TEXT(510,572,150,30,Ext.getDom('ccbh').value);//出厂编号
LODOP.SET_PRINT_STYLEA(0,"FontSize",13);
LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
LODOP.ADD_PRINT_TEXT(568,241,179,30,Ext.getDom('kpy').value);//开票员
LODOP.SET_PRINT_STYLEA(0,"FontSize",13);
LODOP.SET_PRINT_STYLEA(0,"Alignment",2);

	
	LODOP.PRINT_SETUP();//打印维护
	LODOP.PRINT;// 直接打印
}


