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
	LODOP.PRINT_INIT("提发货单套打");//打印初始化  
	LODOP.SET_PRINT_PAGESIZE("0","210mm","279mm","提发货单套打")//设定纸张大小 为	A4

	
//	LODOP.ADD_PRINT_TEXT(340,120,175,30,Ext.getDom('fhsj').value);//开票时间
//	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
//	
//	LODOP.ADD_PRINT_TEXT(340,560,125,30,Ext.getDom('tfhdh').value);//NO
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
//    LODOP.ADD_PRINT_TEXT(450,150,150,30,Ext.getDom('ffkh').value);//发放库号
//	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
//	
//	LODOP.ADD_PRINT_TEXT(450,360,150,30,Ext.getDom('cydwmc').value);//承运单位名称
//	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
//	
//	LODOP.ADD_PRINT_TEXT(450,560,150,30,Ext.getDom('cyclbm').value);//承运车辆
//	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
//	
//	
//	LODOP.ADD_PRINT_TEXT(480,150,150,30,Ext.getDom('kczl').value);//空车重量
//	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
//	
//	LODOP.ADD_PRINT_TEXT(480,360,150,30,Ext.getDom('jhsl').value);//计划数量
//	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
//	
//	LODOP.ADD_PRINT_TEXT(480,560,150,30,Ext.getDom('hczl').value);//回车重量
//	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
//	
//
//	LODOP.ADD_PRINT_TEXT(510,150,150,30,Ext.getDom('zczl').value);//装车重量
//	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
//	
//	LODOP.ADD_PRINT_TEXT(510,360,150,30,Ext.getDom('fhlj').value);//发货累计
//	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
//	
//	LODOP.ADD_PRINT_TEXT(510,560,150,30,Ext.getDom('sfzl').value);//实发重量
//	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);	
//	
//	
//	LODOP.ADD_PRINT_TEXT(510,150,150,30,Ext.getDom('jzsl').value);//净重数量
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
	
LODOP.ADD_PRINT_TEXT(337,78,279,30,Ext.getDom('fhsj').value);//开票时间
LODOP.SET_PRINT_STYLEA(0,"FontSize",13);
LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
LODOP.ADD_PRINT_TEXT(337,560,125,30,Ext.getDom('tfhdh').value);//NO
LODOP.SET_PRINT_STYLEA(0,"FontSize",13);
LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
LODOP.ADD_PRINT_TEXT(370,150,180,30,Ext.getDom('khmc').value);//客户名称
LODOP.SET_PRINT_STYLEA(0,"FontSize",13);
LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
LODOP.ADD_PRINT_TEXT(370,320,251,30,Ext.getDom('zkhmc').value);//子客户名称
LODOP.SET_PRINT_STYLEA(0,"FontSize",13);
LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
LODOP.ADD_PRINT_TEXT(370,602,150,30,Ext.getDom('zrsl').value);//转入数量
LODOP.SET_PRINT_STYLEA(0,"FontSize",13);
LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
LODOP.ADD_PRINT_TEXT(410,150,150,30,Ext.getDom('jhdh').value);//计划单号
LODOP.SET_PRINT_STYLEA(0,"FontSize",13);
LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
LODOP.ADD_PRINT_TEXT(410,320,251,30,Ext.getDom('pzgg').value);//品种规格
LODOP.SET_PRINT_STYLEA(0,"FontSize",13);
LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
LODOP.ADD_PRINT_TEXT(410,602,150,30,Ext.getDom('zcsl').value);//转出数量
LODOP.SET_PRINT_STYLEA(0,"FontSize",13);
LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
LODOP.ADD_PRINT_TEXT(447,148,150,30,Ext.getDom('ffkh').value);//发放库号
LODOP.SET_PRINT_STYLEA(0,"FontSize",13);
LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
LODOP.ADD_PRINT_TEXT(447,320,251,30,Ext.getDom('cydwmc').value);//承运单位名称
LODOP.SET_PRINT_STYLEA(0,"FontSize",13);
LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
LODOP.ADD_PRINT_TEXT(447,602,150,30,Ext.getDom('cyclbm').value);//承运车辆
LODOP.SET_PRINT_STYLEA(0,"FontSize",13);
LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
LODOP.ADD_PRINT_TEXT(480,148,150,30,Ext.getDom('kczl').value);//空车重量
LODOP.SET_PRINT_STYLEA(0,"FontSize",13);
LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
LODOP.ADD_PRINT_TEXT(480,320,251,30,Ext.getDom('jhsl').value);//计划数量
LODOP.SET_PRINT_STYLEA(0,"FontSize",13);
LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
LODOP.ADD_PRINT_TEXT(480,602,150,30,Ext.getDom('hczl').value);//回车重量
LODOP.SET_PRINT_STYLEA(0,"FontSize",13);
LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
LODOP.ADD_PRINT_TEXT(507,148,150,30,Ext.getDom('zczl').value);//装车重量
LODOP.SET_PRINT_STYLEA(0,"FontSize",13);
LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
LODOP.ADD_PRINT_TEXT(507,320,251,30,Ext.getDom('fhlj').value);//发货累计
LODOP.SET_PRINT_STYLEA(0,"FontSize",13);
LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
LODOP.ADD_PRINT_TEXT(507,602,150,30,Ext.getDom('sfzl').value);//实发重量
LODOP.SET_PRINT_STYLEA(0,"FontSize",13);
LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
LODOP.ADD_PRINT_TEXT(533,148,150,30,Ext.getDom('jzsl').value);//净重数量
LODOP.SET_PRINT_STYLEA(0,"FontSize",13);
LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
LODOP.ADD_PRINT_TEXT(534,320,251,30,Ext.getDom('ys').value);//余数
LODOP.SET_PRINT_STYLEA(0,"FontSize",13);
LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
LODOP.ADD_PRINT_TEXT(534,602,150,30,Ext.getDom('ccbh').value);//出厂编号
LODOP.SET_PRINT_STYLEA(0,"FontSize",13);
LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
LODOP.ADD_PRINT_TEXT(584,264,90,30,Ext.getDom('kpy').value);//开票员
LODOP.SET_PRINT_STYLEA(0,"FontSize",13);
LODOP.SET_PRINT_STYLEA(0,"Alignment",2);

	
	LODOP.PRINT_SETUP();//打印维护
	LODOP.PRINT;// 直接打印
}