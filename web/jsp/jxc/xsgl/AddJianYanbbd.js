
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
							},'-',{
								text : "重置",
								iconCls : "reset",
								id : "reset",
								handler : function() {
									document.location.reload();
								},
								scope : this
							}]
				});
				
	
				
	if(Ext.getDom('NO').value !=  "" )
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
			url:'JianYanbbd!queryPzxx.action', 
			params: 'pzdm='+pzCombo.getValue(), 
			method:'POST',
			success: function(resp,opts) 
		    { 
		     	var res = Ext.util.JSON.decode(resp.responseText);
		     	Ext.getDom('djqd').value=res[0].QD;
		     	Ext.getDom('dh').value=res[0].DH;
		     	
		     	Ext.getDom('bz_brw').value=res[0].XMBZ001;
		     	if(res[0].XMBZ001 == "----")
		     	{
		     		 	Ext.getDom('sj_brw').value=res[0].XMBZ001;
		     	}else
		     	{
		     		Ext.getDom('sj_brw').value="";
		     	}
		     	
		     	
            	Ext.getDom('bz_ssl').value=res[0].XMBZ002;
            	if(res[0].XMBZ002 == "----")
		     	{
		     		 	Ext.getDom('sj_ssl').value=res[0].XMBZ002;
		     	}else
		     	{
		     			Ext.getDom('sj_ssl').value="";
		     	}
            	
            	
            	Ext.getDom('bz_yhm').value=res[0].XMBZ003;
            	Ext.getDom('bz_syhl').value=res[0].XMBZ004;
            	Ext.getDom('bz_llz').value=res[0].XMBZ005;
            	Ext.getDom('bz_bbmj').value=res[0].XMBZ006;
            	if(res[0].XMBZ006 == "----")
		     	{
		     		 	Ext.getDom('sj_bbmj').value=res[0].XMBZ006;
		     	}else
		     	{
		     		Ext.getDom('sj_bbmj').value="";
		     	}
            	
            	
            	Ext.getDom('bz_ldlbsy').value=res[0].XMBZ007;
            	if(res[0].XMBZ007 == "----")
		     	{
		     		 	Ext.getDom('sj_ldlbsy').value=res[0].XMBZ007;
		     	}else
		     	{
		     		Ext.getDom('sj_ldlbsy').value="";
		     	}
            	
            	Ext.getDom('bz_bzcdysl').value=res[0].XMBZ008;
            	if(res[0].XMBZ008 == "----")
		     	{
		     		 	Ext.getDom('sj_bzcdysl').value=res[0].XMBZ008;
		     	}else
		     	{
		     		Ext.getDom('sj_bzcdysl').value="";
		     	}
            	
            	
            	Ext.getDom('bz_ljsj_cl').value=res[0].XMBZ009;
            	Ext.getDom('bz_ljsj_zl').value=res[0].XMBZ010;
            	Ext.getDom('bz_aqx').value=res[0].XMBZ011;
            	Ext.getDom('bz_3tqd_kz').value=res[0].XMBZ012;
            	Ext.getDom('bz_3tqd_ky').value=res[0].XMBZ013;
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
			url:'JianYanbbd!submitData.action', 
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
	if(Ext.getDom('slsc').value ==""){Ext.Msg.alert('错误','熟料生产不能为空!!!');return false;}
	if(Ext.getDom('xy').value ==""){Ext.Msg.alert('错误','旋窑不能为空！！');return false;}
	if(Ext.getDom('ghsl').value ==""){Ext.Msg.alert('错误','购货数量不能为空!!');return false;}
	if(Ext.getDom('cyr').value ==""){Ext.Msg.alert('错误','承运人不能为空！！');return false;}
	if(Ext.getDom('sj_brw').value ==""){Ext.Msg.alert('错误','不容物实际值不能为空！！');return false;}
	if(Ext.getDom('sj_ssl').value ==""){Ext.Msg.alert('错误','烧失量实际值不能为空!!');return false;}
	if(Ext.getDom('sj_yhm').value ==""){Ext.Msg.alert('错误','氧化镁实际值不能为空!!');return false;}
	if(Ext.getDom('sj_syhl').value ==""){Ext.Msg.alert('错误','三氧化硫实际值不能为空!!');return false;}
	if(Ext.getDom('sj_llz').value ==""){Ext.Msg.alert('错误','氯离子实际值不能为空!!');return false;}
	if(Ext.getDom('sj_bbmj').value ==""){Ext.Msg.alert('错误','比表面积实际值不能为空！！');return false;}
	if(Ext.getDom('sj_ldlbsy').value ==""){Ext.Msg.alert('错误','0.08筛余不能为空！！');return false;}
	if(Ext.getDom('sj_bzcdysl').value ==""){Ext.Msg.alert('错误','标准稠度用水量不能为空！！');return false;}
	if(Ext.getDom('sj_ljsj_cl').value ==""){Ext.Msg.alert('错误','初凝实际值不能为空!!!');return false;}
	if(Ext.getDom('sj_ljsj_zl').value ==""){Ext.Msg.alert('错误','终凝实际值不能为空!!!');return false;}
	if(Ext.getDom('sj_aqx').value =="")    {Ext.Msg.alert('错误','安全性实际不能为空！！');return false;}
	if(Ext.getDom('sj_3tqd_kz_one').value ==""){Ext.Msg.alert('错误','3天强度抗折不能为空！！');return false;}
	if(Ext.getDom('sj_3tqd_kz_two').value ==""){Ext.Msg.alert('错误','3天强度抗折不能为空！');return false;}
	if(Ext.getDom('sj_3tqd_kz_three').value ==""){Ext.Msg.alert('错误','3天强度抗折不能为空！');return false;}
	if(Ext.getDom('sj_3tqd_ky_one').value ==""){Ext.Msg.alert('错误','3天强度抗压不能为空如果没有请输入0!!!');return false;}
	if(Ext.getDom('sj_3tqd_ky_two').value ==""){Ext.Msg.alert('错误','3天强度抗压不能为空如果没有请输入0!!!');return false;}
	if(Ext.getDom('sj_3tqd_ky_three').value ==""){Ext.Msg.alert('错误','3天强度抗压不能为空如果没有请输入0!!!');return false;}
	if(Ext.getDom('sj_3tqd_ky_four').value ==""){Ext.Msg.alert('错误','3天强度抗压不能为空如果没有请输入0!!!');return false;}
	if(Ext.getDom('sj_3tqd_ky_five').value ==""){Ext.Msg.alert('错误','3天强度抗压不能为空如果没有请输入0!!!');return false;}
	if(Ext.getDom('sj_3tqd_ky_six').value ==""){Ext.Msg.alert('错误','3天强度抗压不能为空如果没有请输入0!!!');return false;}
	if(Ext.getDom('cl_fmh').value ==""){Ext.Msg.alert('错误','粉煤灰不能为空!!!');return false;}
	if(Ext.getDom('cl_shs').value ==""){Ext.Msg.alert('错误','石灰石不能为空!!!');return false;}
	if(Ext.getDom('cl_kf').value ==""){Ext.Msg.alert('错误','矿粉不能为空!!!');return false;}
	if(Ext.getDom('cl_sg').value ==""){Ext.Msg.alert('错误','石膏不能为空!!!');return false;}
	if(Ext.getDom('cl_zmj').value ==""){Ext.Msg.alert('错误','助磨剂不能为空!!!');return false;}
	
	return true;
}


function fzData(bj)
{
	var record = new Ext.data.Record();
	record.set('ghdw',Ext.getCmp('ghdwCombo').getValue());
	record.set('pz', Ext.getCmp('pzCombo').getValue());
	record.set('ccbh',Ext.getDom('ccbh').value);
	record.set('slsc',Ext.getDom('slsc').value);
	record.set('xy',Ext.getDom('xy').value);
	record.set('ghrq',Ext.getDom('ghrq').value);
	record.set('ghsl',Ext.getDom('ghsl').value);
	record.set('cyr',Ext.getDom('cyr').value);
	
	
	record.set('sj_brw',Ext.getDom('sj_brw').value);
	record.set('sj_ssl',Ext.getDom('sj_ssl').value);
	record.set('sj_yhm',Ext.getDom('sj_yhm').value);
	record.set('sj_syhl',Ext.getDom('sj_syhl').value);
	record.set('sj_llz',Ext.getDom('sj_llz').value);
	record.set('sj_bbmj',Ext.getDom('sj_bbmj').value);
	record.set('sj_ldlbsy',Ext.getDom('sj_ldlbsy').value);
	record.set('sj_bzcdysl',Ext.getDom('sj_bzcdysl').value);
	
	record.set('sj_ljsj_cl',Ext.getDom('sj_ljsj_cl').value);
	record.set('sj_ljsj_zl',Ext.getDom('sj_ljsj_zl').value);
	record.set('sj_aqx',Ext.getDom('sj_aqx').value);
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
	
	record.set('cl_fmh',Ext.getDom('cl_fmh').value);
	record.set('cl_shs',Ext.getDom('cl_shs').value);
	record.set('cl_kf',Ext.getDom('cl_kf').value);
	record.set('cl_sg',Ext.getDom('cl_sg').value);
	record.set('cl_zmj',Ext.getDom('cl_zmj').value);
	
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

function print()
{
	//var NO = Ext.getDom('NO').value
	//if(NO=="")
	//{
	//	Ext.Msg.alert('错误','表单提交后打印！！');
	//	return;
	//}
	
	
	LODOP.PRINT_INIT("检验报告单套打");//打印初始化  
	LODOP.SET_PRINT_PAGESIZE("0","210mm","279mm","检验报告单套打")//设定纸张大小 为	A4

	//448  22222222  最下面
	//428  33333333  中间
	//408  44444444   上面
	
	LODOP.ADD_PRINT_TEXT(340,120,175,30,Ext.getDom('ghdw').value);//购货单位
	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
	
	LODOP.ADD_PRINT_TEXT(340,560,125,30,Ext.getDom('NO').value);//NO
	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
	
	
	
	//上边距，左边距，宽度，高度
	LODOP.ADD_PRINT_TEXT(370,150,180,30,Ext.getDom('pz').value);//品种
	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);

	LODOP.ADD_PRINT_TEXT(370,360,120,30,Ext.getDom('dh').value);//代号
	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
	
	LODOP.ADD_PRINT_TEXT(370,560,120,30,Ext.getDom('djqd').value);//登记强度
	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
	
	
	
	
	LODOP.ADD_PRINT_TEXT(415,150,150,30,Ext.getDom('ccbh').value);//出厂编号
	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
	
	LODOP.ADD_PRINT_TEXT(415,360,150,30,Ext.getDom('slsc').value);//熟料生产
	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
	
	LODOP.ADD_PRINT_TEXT(415,560,150,30,Ext.getDom('xy').value);//旋窑
	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
	
	
	
	LODOP.ADD_PRINT_TEXT(450,150,150,30,Ext.getDom('ghrq').value);//购货日期
	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
	
	LODOP.ADD_PRINT_TEXT(450,360,150,30, Ext.getDom('ghsl').value);//购货数量
	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
	
	LODOP.ADD_PRINT_TEXT(450,560,150,30,Ext.getDom('cyr').value);//承运人
	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
	
	
	
	/** 未确定位置**/
	LODOP.ADD_PRINT_TEXT(550,160,90,30,Ext.getDom('bz_brw').value);////不溶物(标准)
	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
	
	LODOP.ADD_PRINT_TEXT(550,240,90,30,Ext.getDom('sj_brw').value);
	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
	
	
	LODOP.ADD_PRINT_TEXT(590,160,90,30,Ext.getDom('bz_ssl').value);//烧失量
	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
	
	LODOP.ADD_PRINT_TEXT(590,240,90,30,Ext.getDom('sj_ssl').value);
	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
	
	
	
	LODOP.ADD_PRINT_TEXT(630,160,90,30,Ext.getDom('bz_yhm').value);//氧化镁
	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
	
	LODOP.ADD_PRINT_TEXT(630,240,90,30,Ext.getDom('sj_yhm').value);
	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
	
	
	LODOP.ADD_PRINT_TEXT(670,160,90,30,Ext.getDom('bz_syhl').value);//三氧化硫
	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
	
	LODOP.ADD_PRINT_TEXT(670,240,90,30,Ext.getDom('sj_syhl').value);
	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
	
	LODOP.ADD_PRINT_TEXT(710,160,90,30,Ext.getDom('bz_llz').value);//氯离子
	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
	
	LODOP.ADD_PRINT_TEXT(710,240,90,30,Ext.getDom('sj_llz').value);
	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
	
	LODOP.ADD_PRINT_TEXT(740,160,90,30,Ext.getDom('bz_bbmj').value);//比表面积
	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
	
	LODOP.ADD_PRINT_TEXT(740,240,90,30,Ext.getDom('sj_bbmj').value);
	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
	
	LODOP.ADD_PRINT_TEXT(780,160,90,30,Ext.getDom('bz_ldlbsy').value);//0.08筛余
	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
	
	LODOP.ADD_PRINT_TEXT(780,240,90,30,Ext.getDom('sj_ldlbsy').value);
	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
	
	LODOP.ADD_PRINT_TEXT(815,160,90,30,Ext.getDom('bz_bzcdysl').value);//标准稠度用水量
	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
	
	LODOP.ADD_PRINT_TEXT(815,240,90,30,Ext.getDom('sj_bzcdysl').value);
	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
	
	
	
	//LODOP.ADD_PRINT_TEXT(550,480,60,30,Ext.getDom('bz_ljsj_cl').value);//凝结时间_初凝
	//LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
	
	LODOP.ADD_PRINT_TEXT(550,550,150,30,Ext.getDom('sj_ljsj_cl').value);
	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
	
//	LODOP.ADD_PRINT_TEXT(590,480,60,30,Ext.getDom('bz_ljsj_zl').value);//凝结时间_终凝
//	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
	
	LODOP.ADD_PRINT_TEXT(590,550,150,30,Ext.getDom('sj_ljsj_zl').value);
	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
	
//	LODOP.ADD_PRINT_TEXT(630,480,60,30,Ext.getDom('bz_aqx').value);//安全性
//	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
	
	LODOP.ADD_PRINT_TEXT(630,550,150,30,Ext.getDom('sj_aqx').value);
	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
	
	
	LODOP.ADD_PRINT_TEXT(690,480,60,50,Ext.getDom('bz_3tqd_kz').value);//抗折标准
	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
	
	LODOP.ADD_PRINT_TEXT(665,540,60,30,Ext.getDom('sj_3tqd_kz_one').value);
	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
	
	LODOP.ADD_PRINT_TEXT(665,600,60,30,Ext.getDom('sj_3tqd_kz_two').value);
	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
	
	LODOP.ADD_PRINT_TEXT(665,650,60,30,Ext.getDom('sj_3tqd_kz_three').value);
	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
	
	LODOP.ADD_PRINT_TEXT(700,600,110,30,Ext.getDom('sj_3tqd_kz_pz').value);//抗折平均
	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
	
	
	
	LODOP.ADD_PRINT_TEXT(780,480,60,80,Ext.getDom('bz_3tqd_ky').value);//抗压标准
	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
	
	LODOP.ADD_PRINT_TEXT(740,540,60,30,Ext.getDom('sj_3tqd_ky_one').value);
	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
	
	LODOP.ADD_PRINT_TEXT(740,600,60,30,Ext.getDom('sj_3tqd_ky_two').value);
	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
	
	LODOP.ADD_PRINT_TEXT(740,650,60,30,Ext.getDom('sj_3tqd_ky_three').value);
	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
	
	LODOP.ADD_PRINT_TEXT(780,540,60,30,Ext.getDom('sj_3tqd_ky_four').value);
	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
	
	LODOP.ADD_PRINT_TEXT(780,600,60,30,Ext.getDom('sj_3tqd_ky_five').value);
	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
	
	LODOP.ADD_PRINT_TEXT(780,650,60,30,Ext.getDom('sj_3tqd_ky_six').value);
	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
	
	LODOP.ADD_PRINT_TEXT(815,600,110,30,Ext.getDom('sj_3tqd_ky_pz').value);//抗压平均
	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
	
	
	
	LODOP.ADD_PRINT_TEXT(915,155,90,30,Ext.getDom('cl_fmh').value);//参量粉煤灰
	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
	
	LODOP.ADD_PRINT_TEXT(915,250,90,30,Ext.getDom('cl_shs').value);//参量石灰石
	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
	
	LODOP.ADD_PRINT_TEXT(915,350,90,30,Ext.getDom('cl_kf').value);//矿粉
	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
	
	LODOP.ADD_PRINT_TEXT(915,440,90,30,Ext.getDom('cl_sg').value);//石膏
	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
	
	LODOP.ADD_PRINT_TEXT(915,530,90,30,Ext.getDom('cl_zmj').value);//助磨剂
	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
	
	
	
	LODOP.ADD_PRINT_TEXT(985,150,90,30,Ext.getDom('tbr').value);//填表人
	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
	
	//LODOP.ADD_PRINT_TEXT(1055,352,100,20,Ext.getDom('pzr').value);//批准人
	//LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
	
	LODOP.ADD_PRINT_TEXT(985,600,100,30,Ext.getDom('tbrq').value);//填表日期
	LODOP.SET_PRINT_STYLEA(0,"FontSize",13);LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
	
	
	
	
	
	LODOP.PRINT_SETUP();//打印维护
	LODOP.PRINT;// 直接打印
}

