
Ext.onReady(function() {
		var tb = new Ext.Toolbar({
					renderTo : "toolbar",
					items : [{
								text : "提交",
								iconCls : "submit",
								id : "submitBtn",
								handler : function() {
									submitData();
								},
								scope : this
							},'-',{
								text : "打印",
								iconCls : "print",
								id : "print",
								handler : function() {
									print();
								},
								scope : this
							},
							'-',{
										text : "打印预览",
										iconCls : "print",
										handler : function() {
											printpreview();
										},
										scope : this
									},
							'-',{
								text : "重置",
								iconCls : "reset",
								id : "reset",
								handler : function() {
									document.location.reload();
								},
								scope : this
							}]
				});
				
	
				
	if(Ext.getDom('sj_3tqd_ky_one').value !=  "" )
	{
		tb.remove('submitBtn',true);
	}

				
 
	/**
	 * 关键字
	 */    
//		var gjzField = new Ext.form.TextField({
//		   id:'gjzField',
//		   fieldLabel: '关键字',
//		   name: 'gjzField',
//		   applyTo:'gjz'
//		});
		
				
				
	/**
	 * 购货单位下拉框
	 */		
	var ghdwField = new Ext.form.TextField({
		   id:'ghdwCombo',
		   fieldLabel: '关键字',
		   name: 'ghdwCombo',
		   applyTo:'ghdw'
		});
//	 var ghdwCombo = new Ext.form.ComboBox({
//        id:'ghdwCombo',
//        applyTo: 'ghdw',
//        width:'100%',
//        name: 'ghdwText',
//		hiddenName: 'ghdwbm',
//		xtype: 'combo',
//		store: new Ext.data.Store({
//							 autoLoad:false,
//							 proxy: new Ext.data.HttpProxy({url:'ComboboxAction!queryKhxx.action'}),
//							reader: new Ext.data.JsonReader({
//							  root:'combobox',
//   							fields:['value','text']}), 
//						remoteSort: true  }) ,
//		emptyText: '请选择',  
//		mode: 'remote',
//		triggerAction: 'all',
//		valueField: 'value',
//		displayField: 'text',
//		readOnly: true
//    });
    	
		
   /**
    * 关键字选择后触发事件
    */
//   gjzField.on('change', function(){
//	ghdwCombo.setValue("");      	
//   	ghdwCombo.getStore().reload({callback: function(records, options, success)
//								{
//								if( ghdwCombo.getStore().getCount()>0)
//									{
//										var firstValue = ghdwCombo.getStore().getRange()[0].data.value;//这种方法可以获得第一项的值 
//										 ghdwCombo.setValue(firstValue);//选中    	
//										 							
//									}
//								}
//	});
//   });

    /**
     *关键字传参
     */
//      var pym ="";     
//   	  ghdwCombo.getStore().on('beforeload', function() {
//      Ext.apply(this.baseParams, {
//         pym : gjzField.getValue()
//        });
//     });
     
     
     
      /**
       * 品种下拉框
       */			
	 var pzCombo = new Ext.form.ComboBox({
        id:'pzCombo',
        applyTo: 'pz',
        width:220,
        name: 'pzText',
       	hiddenName: 'pzdm',
		xtype: 'combo',
		store: new Ext.data.SimpleStore({
                          fields: ['value','text'],
                          data: [['01','普通硅酸盐水泥'],['02','复合硅酸盐水泥']]}),
		emptyText: '请选择',  
		mode: 'local',
		triggerAction: 'all',
		valueField: 'value',
		displayField: 'text',
		readOnly: true
    });		
     
    
    pzCombo.on('select',function()
    {
    	Ext.Ajax.request
		({    
			url:'JianYanbbdTWO!queryPzxx.action', 
			params: 'pzdm='+pzCombo.getValue(), 
			method:'POST',
			success: function(resp,opts) 
		    { 
		     	var res = Ext.util.JSON.decode(resp.responseText);
		     	Ext.getDom('djqd').value=res[0].QD;
            	Ext.getDom('bz_3tqd_kz').value=res[0].XMBZ014;
            	Ext.getDom('bz_3tqd_ky').value=res[0].XMBZ015;
		    },
		    failure:function()
			{
				Ext.Msg.alert('错误','操作失败!!');
			}
		});	  
    });
    
    
    /**
     * 发货日期
     */
    var ghrq = new Ext.form.DateField({    
      applyTo : 'ghrq',    
      width: '70%',  
       format: 'Y-m-d',   
      //format: 'Y-m-d H:i:s',    
      emptyText: '请选择日期 ...',
      value:Ext.getDom('ghrq').value==""?new Date():Ext.getDom('ghrq').value
     });   
     
     
    /* ghrq.on('select',function(obj,date)
     {
			ghrq.setValue(getDate(date));
     });*/
     
   
  
     
     /**
     * 填表日期
     */
    var tbrq = new Ext.form.DateField({    
      applyTo : 'tbrq',    
      width: '70%',    
      //format: 'Y-m-d H:i:s',  
      format: 'Y-m-d',   
      emptyText: '请选择日期 ...',
      value:Ext.getDom('tbrq').value==""?new Date():Ext.getDom('tbrq').value
     });   
     
     
   /* tbrq.on('select',function(obj,date)
     {
			tbrq.setValue(getDate(date));
     });*/
     
});

/**
 * 计算抗压平均值
 */
function jskypjz(obj)
{
	if(!checkedAndFromt(obj))
	{
		return
	}
	
	var one  = Ext.getDom('sj_3tqd_ky_one').value;
	var two = Ext.getDom('sj_3tqd_ky_two').value;
	var three = Ext.getDom('sj_3tqd_ky_three').value;
	var four = Ext.getDom('sj_3tqd_ky_four').value;
	var five = Ext.getDom('sj_3tqd_ky_five').value;
	var six = Ext.getDom('sj_3tqd_ky_six').value;
	
	
	
	if(one!=""&&two!=""&&three!=""&&four!=""&&five!=""&&six!="")
	{
		var sl = 0;
		var array = new Array();
		
		array.push(one);
		array.push(two);
		array.push(three);
		array.push(four);
		array.push(five);
		array.push(six);
		
		for(var i=0;i<array.length;i++)
		{
			if(array[i]!="0.00")
			{
				sl = sl+1
			}
		}
		
		Ext.getDom('sj_3tqd_ky_pz').value = 
		formatNambToDouble((parseFloat(one)+parseFloat(two)+parseFloat(three)+parseFloat(four)+parseFloat(five)+parseFloat(six))/sl);
	}else
	{
		return;
	}

}


/**
 * 计算抗折平均值
 */

function jskzpjz(obj)
{
	
	if(!checkedAndFromt(obj))
	{
		return
	}
	
	var one  = Ext.getDom('sj_3tqd_kz_one').value;
	var two = Ext.getDom('sj_3tqd_kz_two').value;
	var three = Ext.getDom('sj_3tqd_kz_three').value;
	
	if(one!=""&&two!=""&&three!="")
	{
		Ext.getDom('sj_3tqd_kz_pz').value = 
		formatNambToDouble((parseFloat(one)+parseFloat(two)+parseFloat(three))/3);
	}else
	{
		return;
	}
}

/**
 * 提交表单
 */
function submitData()
{
	if(baseCheck())
	{
		var data = fzData("save");
		//encodeURIComponent(data)
		Ext.Ajax.request
		({    
			url:'JianYanbbdTWO!submitData.action', 
			params: {data:data}, 
			method:'POST',
			success: function(resp,opts) 
		    { 
		     	var result = Ext.decode(resp.responseText);
		     	Ext.getDom('NO').value=result.NO;
		     	Ext.getCmp('submitBtn').setDisabled(true);
		        Ext.Msg.alert('信息',result.msg);
		    },
		    failure:function()
			{
				Ext.Msg.alert('错误','操作失败!!');
			}
		});	  
	}
}

function baseCheck()
{
	if(Ext.getDom('ghdw').value ==""){Ext.Msg.alert('错误','购货单位不能为空');return false;}
	if(Ext.getDom('pz').value ==""){Ext.Msg.alert('错误','品种不能为空！！');return false;}
	if(Ext.getDom('ccbh').value ==""){Ext.Msg.alert('错误','出厂编号不能为空！！');return false;}
	if(Ext.getDom('ghsl').value ==""){Ext.Msg.alert('错误','购货数量不能为空!!');return false;}
	
	if(Ext.getDom('sj_3tqd_kz_one').value ==""){Ext.Msg.alert('错误','28天强度抗折不能为空！！');return false;}
	if(Ext.getDom('sj_3tqd_kz_two').value ==""){Ext.Msg.alert('错误','28天强度抗折不能为空！');return false;}
	if(Ext.getDom('sj_3tqd_kz_three').value ==""){Ext.Msg.alert('错误','28天强度抗折不能为空！');return false;}
	if(Ext.getDom('sj_3tqd_ky_one').value ==""){Ext.Msg.alert('错误','28天强度抗压不能为空如果没有请输入0!!!');return false;}
	if(Ext.getDom('sj_3tqd_ky_two').value ==""){Ext.Msg.alert('错误','28天强度抗压不能为空如果没有请输入0!!!');return false;}
	if(Ext.getDom('sj_3tqd_ky_three').value ==""){Ext.Msg.alert('错误','28天强度抗压不能为空如果没有请输入0!!!');return false;}
	if(Ext.getDom('sj_3tqd_ky_four').value ==""){Ext.Msg.alert('错误','28天强度抗压不能为空如果没有请输入0!!!');return false;}
	if(Ext.getDom('sj_3tqd_ky_five').value ==""){Ext.Msg.alert('错误','28天强度抗压不能为空如果没有请输入0!!!');return false;}
	if(Ext.getDom('sj_3tqd_ky_six').value ==""){Ext.Msg.alert('错误','28天强度抗压不能为空如果没有请输入0!!!');return false;}
	
	return true;
}


function fzData(bj)
{
	var record = new Ext.data.Record();
	record.set('NO',Ext.getDom('NO').value);
	record.set('ghdw',Ext.getCmp('ghdwCombo').getValue());
	record.set('pz', Ext.getCmp('pzCombo').getValue());
	record.set('ccbh',Ext.getDom('ccbh').value);
	record.set('ghrq',Ext.getDom('ghrq').value);
	record.set('ghsl',Ext.getDom('ghsl').value);


	record.set('sj_3tqd_kz_one',Ext.getDom('sj_3tqd_kz_one').value);
	record.set('sj_3tqd_kz_two',Ext.getDom('sj_3tqd_kz_two').value);
	record.set('sj_3tqd_kz_three',Ext.getDom('sj_3tqd_kz_three').value);
	record.set('sj_3tqd_kz_pz',Ext.getDom('sj_3tqd_kz_pz').value);
	
	
	record.set('sj_3tqd_ky_one',Ext.getDom('sj_3tqd_ky_one').value);
	record.set('sj_3tqd_ky_two',Ext.getDom('sj_3tqd_ky_two').value);
	record.set('sj_3tqd_ky_three',Ext.getDom('sj_3tqd_ky_three').value);
	record.set('sj_3tqd_ky_four',Ext.getDom('sj_3tqd_ky_four').value);
	record.set('sj_3tqd_ky_five',Ext.getDom('sj_3tqd_ky_five').value);
	record.set('sj_3tqd_ky_six',Ext.getDom('sj_3tqd_ky_six').value);
	record.set('sj_3tqd_ky_pz',Ext.getDom('sj_3tqd_ky_pz').value);
    record.set('bz',Ext.getDom('bz').value);
	
	record.set('tbrq',Ext.getDom('tbrq').value);

	
	var jsonArray = [];
	
	Ext.each(record,function(item)
	{
		jsonArray.push(item.data);
	});

	data = Ext.encode(jsonArray);
	//alert(data);
	return data;
	
	
}

/**
 * 
 * if(bj=="print")
	{

		record.set('NO',Ext.getDom('NO').value);
		record.set('dh',Ext.getDom('dh').value);
		record.set('djqd',Ext.getDom('djqd').value);
		
		record.set('bz_brw',Ext.getDom('bz_brw').value);
		record.set('bz_ssl',Ext.getDom('bz_ssl').value);
		record.set('bz_yhm',Ext.getDom('bz_yhm').value);
		record.set('bz_syhl',Ext.getDom('bz_syhl').value);
		record.set('bz_llz',Ext.getDom('bz_llz').value);
		record.set('bz_bbmj',Ext.getDom('bz_bbmj').value);
		record.set('bz_ldlbsy',Ext.getDom('bz_ldlbsy').value);
		record.set('bz_bzcdysl',Ext.getDom('bz_bzcdysl').value);
		
		record.set('bz_ljsj_cl',Ext.getDom('bz_ljsj_cl').value);
		record.set('bz_ljsj_zl',Ext.getDom('bz_ljsj_zl').value);
		record.set('bz_aqx',Ext.getDom('bz_aqx').value);
		record.set('bz_3tqd_kz',Ext.getDom('bz_3tqd_kz').value);
		record.set('bz_3tqd_ky',Ext.getDom('bz_3tqd_ky').value);
		
		record.set('tbr',Ext.getDom('tbr').value);
		
		
 ***/

//function print()
//{
//
//	LODOP.PRINT_INIT("检验报告单套打");//打印初始化  
//	LODOP.SET_PRINT_PAGESIZE("0","210mm","279mm","检验报告单套打")//设定纸张大小 为	A4
//
//	//448  22222222  最下面
//	//428  33333333  中间
//	//408  44444444   上面
//	
//	LODOP.ADD_PRINT_TEXT(340,120,175,30,Ext.getDom('ghdw').value);//购货单位
//	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
//	
//	LODOP.ADD_PRINT_TEXT(340,560,125,30,Ext.getDom('NO').value);//NO
//	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
//	
//	
//	
//	//上边距，左边距，宽度，高度
//	LODOP.ADD_PRINT_TEXT(366,350,180,30,Ext.getDom('pz').value);//品种
//	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
//
//	
//	LODOP.ADD_PRINT_TEXT(394,350,180,30,Ext.getDom('djqd').value);//登记强度
//	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
//	
//	
//	
//	
//	LODOP.ADD_PRINT_TEXT(422,350,180,30,Ext.getDom('ccbh').value);//出厂编号
//	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
//	
//	
//	LODOP.ADD_PRINT_TEXT(450,350,180,30,Ext.getDom('ghrq').value);//购货日期
//	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
//	
//	LODOP.ADD_PRINT_TEXT(476,350,180,30, Ext.getDom('ghsl').value);//购货数量
//	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
//	
//
//	
//	
//	LODOP.ADD_PRINT_TEXT(563,488,60,50,Ext.getDom('bz_3tqd_kz').value);//抗折标准
//	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
//	
//	LODOP.ADD_PRINT_TEXT(538,548,60,30,Ext.getDom('sj_3tqd_kz_one').value);
//	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
//	
//	LODOP.ADD_PRINT_TEXT(538,608,60,30,Ext.getDom('sj_3tqd_kz_two').value);
//	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
//	
//	LODOP.ADD_PRINT_TEXT(538,658,60,30,Ext.getDom('sj_3tqd_kz_three').value);
//	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
//	
//	LODOP.ADD_PRINT_TEXT(573,608,110,30,Ext.getDom('sj_3tqd_kz_pz').value);//抗折平均
//	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
//	
//	
//	
//	LODOP.ADD_PRINT_TEXT(653,488,60,80,Ext.getDom('bz_3tqd_ky').value);//抗压标准
//	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
//	
//	LODOP.ADD_PRINT_TEXT(613,548,60,30,Ext.getDom('sj_3tqd_ky_one').value);
//	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
//	
//	LODOP.ADD_PRINT_TEXT(613,608,60,30,Ext.getDom('sj_3tqd_ky_two').value);
//	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
//	
//	LODOP.ADD_PRINT_TEXT(613,658,60,30,Ext.getDom('sj_3tqd_ky_three').value);
//	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
//	
//	LODOP.ADD_PRINT_TEXT(653,548,60,30,Ext.getDom('sj_3tqd_ky_four').value);
//	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
//	
//	LODOP.ADD_PRINT_TEXT(653,608,60,30,Ext.getDom('sj_3tqd_ky_five').value);
//	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
//	
//	LODOP.ADD_PRINT_TEXT(653,658,60,30,Ext.getDom('sj_3tqd_ky_six').value);
//	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
//	
//	LODOP.ADD_PRINT_TEXT(688,608,110,30,Ext.getDom('sj_3tqd_ky_pz').value);//抗压平均
//	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
//		
//	LODOP.ADD_PRINT_TEXT(985,150,90,30,Ext.getDom('tbr').value);//填表人
//	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
//	
//	LODOP.ADD_PRINT_TEXT(985,600,100,30,Ext.getDom('tbrq').value);//填表日期
//	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
//	
//	LODOP.ADD_PRINT_TEXT(1005,600,100,30,Ext.getDom('bz').value);//备注
//	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
//	
//	
//	
//	LODOP.PRINT_SETUP();//打印维护
//	LODOP.PRINT;// 直接打印
//}

