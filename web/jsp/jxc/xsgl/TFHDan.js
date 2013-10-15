var ysfhlj = "0";

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
								text : "重置",
								iconCls : "reset",
								id : "reset",
								handler : function() {
									document.location.reload();
								},
								scope : this
							}
							,'-', {
								text : "有发货记录打印(套打)",
								id : "pritDataBtn",
								iconCls : "print",
								handler : function() {
									printDataTable('tt');
								},
								scope : this
							}
							, '-', {
								text : "无发货记录打印(套打)",
								id : "pritBtn",
								iconCls : "print",
								handler : function() {
									printTable('tt');
								},
								scope : this
							},'-', {
								text : "有发货记录打印(web)",
								id : "pritDataBtn2",
								iconCls : "print",
								handler : function() {
									printDataTable('web');
								},
								scope : this
							}
							, '-', {
								text : "无发货记录打印(web)",
								id : "pritBtn2",
								iconCls : "print",
								handler : function() {
									printTable('web');
								},
								scope : this
							}]
				});
				
    //称重系统(t_standard)主键ID     
		var standardIDField = new Ext.form.TextField({
		   id:'standardIDField',
		   fieldLabel: 'standard',
		   name: 'standardIDField'
		});				
				
				
	// 发货时间
	var fhsj = new Ext.form.DateField({    
      applyTo : 'fhsj',    
      width: '70%',    
      format: 'Y-m-d H:i:s',    
      emptyText: '请选择日期 ...'
      //value:new Date()
     });    
     
     
     fhsj.on('select',function(obj,date)
		     {
					fhsj.setValue(getDate(date));
		     });
 
				
	// 客户名称下拉框			
	 var khCombo = new Ext.form.ComboBox({
        id:'khCombo',
        applyTo: 'khmc',
        width:'90%',
        name: 'khmcText',
		hiddenName: 'khbm',
		xtype: 'combo',
		store: new Ext.data.Store({
							 autoLoad:false,
							 proxy: new Ext.data.HttpProxy({url:'ComboboxAction!queryKhxx.action'}),
							reader: new Ext.data.JsonReader({
							  root:'combobox',
   							fields:['value','text']}), 
						remoteSort: true  }) ,
		emptyText: '请选择',  
		mode: 'remote',
		triggerAction: 'all',
		valueField: 'value',
		displayField: 'text',
		readOnly: false
    });
    
    
        // 通过关键字过滤客户名称
      var pymValue ="";      
       
      khCombo.on('beforequery',function(e){     
       		 if(!e.forceAll){   
            		pymValue = e.query;   
            		//if (!pymValue == "")
            		khCombo.getStore().reload({callback: function(records, options, success)
									{
									}
		});
        }  
         }); 
    
      var pym ="";     
   	  khCombo.getStore().on('beforeload', function() {
      Ext.apply(this.baseParams, {
         pym : pymValue
        });
       });
       
         // 子客户名称下拉
     var zkhCombo = new Ext.form.ComboBox({
        id:'zkhCombo',
        applyTo: 'zkhmc',
        width:'90%',
        name: 'zkhmcText',
		hiddenName: 'zkhbm',
		xtype: 'combo',
		store:  new Ext.data.Store({
    						autoLoad:false,
							 proxy: new Ext.data.HttpProxy({
							 						url:'ComboboxAction!queryZkhdm.action?kpbj=0'}),
							reader: new Ext.data.JsonReader({
							  root:'combobox',
   							fields:['value','text']}), 
						remoteSort: true  }),
		emptyText: '请选择',  
		mode: 'remote',
		triggerAction: 'all',
		valueField: 'value',
		displayField: 'text',
		readOnly: false
    });

     //根据关键字 过滤子客户名称
       var pymValue2 ="";      
       
        zkhCombo.on('beforequery',function(e){     
       		 if(!e.forceAll){   
            		pymValue2 = e.query;   
            		//if (!pymValue == "")
            		zkhCombo.getStore().reload({callback: function(records, options, success)
									{
									}
		});
        }  
        //}
         }); 
    
          var zkhpym ="";     
   	  zkhCombo.getStore().on('beforeload', function() {
      Ext.apply(this.baseParams, {
         zkhpym : pymValue2
        });
       });	   
    
    // 计划单号下拉
       var jhdhCombo = new Ext.form.ComboBox({
        id:'jhdhCombo',
        applyTo: 'jhdh',
        width:'70%',
        name: 'jhdhText',
		hiddenName: 'jhdhbm',
		xtype: 'combo',
		store:new Ext.data.Store({
    						autoLoad:false,
							 proxy: new Ext.data.HttpProxy({
							 						url:'ComboboxAction!queryJhdh.action'}),
							reader: new Ext.data.JsonReader({
							  root:'combobox',
   							fields:['value','text']}), 
						remoteSort: true  }),
		emptyText: '请选择',  
		mode: 'remote',
		triggerAction: 'all',
		valueField: 'value',
		displayField: 'text',
		readOnly: true
    });
    
//    
//          //关键字触发事件
//       gjzField.on('change', function(){
//    	khCombo.setValue("");      	
//       	khCombo.getStore().reload({callback: function(records, options, success)
//									{
//									if( khCombo.getStore().getCount()>0)
//										{
//											var firstValue = khCombo.getStore().getRange()[0].data.value;//这种方法可以获得第一项的值 
//											 khCombo.setValue(firstValue);//选中    	
//											 							
//										}
//									}
//		});
//       });
      
    
    
    // 客户编码
    var khbm = "";
    // 子客户编码
    var zkhbm = "";
    
   
    //客户下拉框，如果被改变，子客户下拉框置空
     khCombo.on('select', getZKH);     
     function getZKH(){
      	zkhCombo.setValue(""); //子客户下拉框制空
      	jhdhCombo.setValue("");// 计划单号制空
	
		
    	khbm = Ext.get('khbm').dom.value;
       	
       	zkhCombo.getStore().reload();
   		jhdhCombo.getStore().reload({callback: function(records, options, success)
								{
									if(0 == jhdhCombo.getStore().getCount())
									{
										Ext.MessageBox.alert('消息!!!','没有对应的计划单号，请重新选择！！！');
									}
								}
		});
    }
    
    //客户下拉框，如果被改变，销售单下拉框置空
    /* zkhCombo.on('select', getJHDH);     
     function getJHDH(){
      	jhdhCombo.setValue(""); //下拉框制空
    	zkhbm = Ext.get('zkhbm').dom.value;     	
       	jhdhCombo.getStore().reload({callback: function(records, options, success)
									{
										if(0 == jhdhCombo.getStore().getCount())
										{
											Ext.MessageBox.alert('消息!!!','没有对应的计划单号，请重新选择！！！');
										}
									}
		});
    }*/
    
	
   zkhCombo.getStore().on('beforeload', function() {
  	if("" == khbm)
  	{
  		Ext.MessageBox.alert('消息!!!','请先选择客户名称！！！');
  		return false;
  	}else
  	{
  		Ext.apply(this.baseParams,{khbm:khbm});
  	}
 });
 
  jhdhCombo.getStore().on('beforeload', function() {
  		Ext.apply(this.baseParams,{khbm:khbm,zkhbm:zkhbm,type:"0"});
 });
    
   jhdhCombo.on('select', function(comboBox){
    	var jhdh = comboBox.getValue();
    	
	   // 调用ajax 从后台获取列名
		Ext.Ajax.request
		({    
			url:'TFHDan!queryData.action', 
			params: 'jhdh='+jhdh, 
			method:'POST',
			success: function(resp,opts) 
		    { 
               	var res = Ext.util.JSON.decode(resp.responseText);
            	Ext.getDom('fhlj').value=formatNambToDouble(res[0].FHLJ);
            	ysfhlj = formatNambToDouble(res[0].FHLJ);
            	Ext.getDom('jhsl').value=formatNambToDouble(res[0].JHSL);
            	Ext.getDom('pzgg').value=res[0].SPMC;
            	//Ext.getDom('hsbl').value=res[0].HSBL;
            	Ext.getDom('spbm').value=res[0].SPBM;
            	Ext.getDom('zrsl').value=res[0].ZRSL;
            	Ext.getDom('zcsl').value=res[0].ZCSL;     
            	Ext.getDom('ys').value = formatNambToDouble(parseFloat(res[0].JHSL)-parseFloat(res[0].FHLJ)+parseFloat(res[0].ZRSL)-parseFloat(res[0].ZCSL));
		    },
		    failure:function()
			{
				 Ext.Msg.alert("消息","加载数据出错");
			}
		});	  
    }); 
    		     
		  	// 承运单位下拉框			
		var cydwCombo = new Ext.form.ComboBox({
        id:'cydwCombo',
        applyTo: 'cydw',
        //width:'50%',
        name: 'cydwText',
		hiddenName: 'cydwbm',
		xtype: 'combo',
		store: new Ext.data.Store({
							 autoLoad:false,
							 proxy: new Ext.data.HttpProxy({url:'ComboboxAction!queryCydw.action'}),
							reader: new Ext.data.JsonReader({
							  root:'combobox',
   							fields:['value','text']}), 
						remoteSort: true  }) ,
		emptyText: '请选择',  
		mode: 'remote',
		triggerAction: 'all',
		valueField: 'value',
		displayField: 'text',
		readOnly: false
    });
    
    //根据关键字过滤承运单位
      var pymValue3 ="";           
      cydwCombo.on('beforequery',function(e){     
       		 if(!e.forceAll){   
            		pymValue3 = e.query;   
            		//if (!pymValue == "")
            		cydwCombo.getStore().reload({callback: function(records, options, success)
									{
									}
		});
        }  
         }); 
    
          var pym2 ="";     
   	      cydwCombo.getStore().on('beforeload', function() {
           Ext.apply(this.baseParams, {
           pym2 : pymValue3
        });
       });
    
    
    
    // 承运车辆下拉
     var cyclCombo = new Ext.form.ComboBox({
        id:'cyclCombo',
        applyTo: 'cycl',
        width:'80%',
        name: 'cyclText',
		hiddenName: 'cyclbm',
		xtype: 'combo',
		store:  new Ext.data.Store({
    						autoLoad:false,
							 proxy: new Ext.data.HttpProxy({
							 						url:'ComboboxAction!queryCycl.action'}),
							reader: new Ext.data.JsonReader({
							  root:'combobox',
   							fields:['value','text']}), 
						remoteSort: true  }),
		emptyText: '请选择',  
		mode: 'remote',
		triggerAction: 'all',
		valueField: 'value',
		displayField: 'text',
		readOnly: true
    });
    
    
    //选择承运，获取过磅记录
    cyclCombo.on('select', function(comboBox){
    	var cych = comboBox.getValue();
    	
	   // 调用ajax 从后台获取列名
		Ext.Ajax.request
		({    
			url:'TFHDan!queryGBJLData.action', 
			params: 'cych='+cych, 
			method:'POST',
			success: function(resp,opts) 
		    { 
               	var res = Ext.util.JSON.decode(resp.responseText);
               	var kczl = formatNambToDouble(res[0].KCZL);
               	var zczl = formatNambToDouble(res[0].ZCZL);
               	var zrsl = parseFloat(Ext.getDom('zrsl').value);//转入数量
	            var zcsl = parseFloat(Ext.getDom('zcsl').value);//转出数量
               	
            	Ext.getDom('kczl').value=kczl;        	
            	Ext.getDom('zczl').value=zczl;
            	Ext.getDom('jzsl').value = formatNambToDouble(zczl-kczl) ;
            	
            	var fhlj =  parseFloat(ysfhlj); //发货累计
            	var ys = parseFloat(Ext.getDom('ys').value);
            	var a = fhlj + (zczl-kczl);
		        		
		        Ext.getDom('sfzl').value = formatNambToDouble(zczl-kczl);  //开提发货单时 回车重量默认为0，实际发货数量为净重量	
		        Ext.getDom('fhlj').value = formatNambToDouble(a) ;
		        var jhsl =  parseFloat(Ext.getDom('jhsl').value);	//计划数量
		        Ext.getDom('ys').value = formatNambToDouble(jhsl-a+zrsl-zcsl);
		        
		        if(Ext.getDom('jzsl').value > ys){
			 		Ext.Msg.alert("错误！！","净重数量不能大于余数，请重新填写");
	     	 		return false;
				}
		        
		        Ext.getCmp('standardIDField').value = res[0].F_ID;
		        },
		    failure:function()
			{
				 Ext.Msg.alert("消息","加载数据出错");
			}
		});	  
    }); 

    
    // 客户编码
     var cydwbm = "";
     cydwCombo.on('select', getCYCL);   
    
     function getCYCL(){
      	cyclCombo.setValue(""); //子客户下拉框制空
    	// 清空子客户的内容
		//zkhCombo.getStore().removeAll();
    	cydwbm = Ext.get('cydwbm').dom.value;
       	
       	cyclCombo.getStore().reload({callback: function(records, options, success)
									{
										if(0 == cyclCombo.getStore().getCount())
										{
											Ext.MessageBox.alert('消息!!!','没有对应的车辆信息，请重新选择！！！');
										}
										else{
										    var firstValue = cyclCombo.getStore().getRange()[0].data.value;//这种方法可以获得第一项的值 
											cyclCombo.setValue(firstValue);//选中  
										}
									}
		});
    }

    	
   cyclCombo.getStore().on('beforeload', function() {
  	if("" == cydwbm)
  	{
  		Ext.MessageBox.alert('消息!!!','请先选择承运单位！！！');
  		return false;
  	}else
  	{
  		Ext.apply(this.baseParams,{cydwbm:cydwbm});
  	}
 });
    
 });

/**
 * 根据空车重量计算数据
 * @param {} obj
 */
function jsdataBykczl(obj)
{
	var zczl =   parseFloat(Ext.getDom('zczl').value);// 装车重量(吨)
	var jhsl =  parseFloat(Ext.getDom('jhsl').value);	//计划数量
	
	if(isNaN(jhsl))
	{
		Ext.Msg.alert("错误！！","请先选择计划单号！！");
		obj.value = "";
		return;
	}
	
	var b = checkedAndFromt(Ext.getDom('kczl'));
	if(b == false||isNaN(zczl))
	{
		return;
	}
	
	var kczl =   parseFloat(b);// 空车重量
	var fhlj =  parseFloat(ysfhlj); //发货累计
	

	
	if(kczl >zczl)
	{
	 Ext.Msg.alert("错误！！","空车重量不能大于装车数量！！");
	 obj.value = "";
	 return false;
	}else
	{
		var a = fhlj + (zczl-kczl);
		Ext.getDom('jzsl').value = formatNambToDouble(zczl-kczl) ;
		
		Ext.getDom('sfzl').value = formatNambToDouble(zczl-kczl);  //开提发货单时 回车重量默认为0，实际发货数量为净重量
		
		Ext.getDom('fhlj').value = formatNambToDouble(a) ;
		Ext.getDom('ys').value = formatNambToDouble(jhsl-a);
		return true;
	}
	
	// 余数
	var ys = parseFloat(Ext.getDom('ys').value);
	if(Ext.getDom('jzsl').value > ys){
		 Ext.Msg.alert("错误！！","净重数量不能大于余数，请重新填写");
	 return false;
	}
} 
 
 
/**
 * 根据装车重量计算数据
 * @param {} obj
 */
function jsdataByzczl(obj)
{
	var kczl =   parseFloat(Ext.getDom('kczl').value);// 空车重量
	var jhsl =  parseFloat(Ext.getDom('jhsl').value);	//计划数量
	
	if(isNaN(jhsl))
	{
		Ext.Msg.alert("错误！！","请先选择计划单号！！");
		obj.value = "";
		return;
	}
	
	//先判断是不是数字，如果是格式化
	var c= checkedAndFromt(obj);
	if(c==false||isNaN(kczl))
	{
		return;
	}
	
	
	var zczl =   parseFloat(c);// 装车重量(吨)
	var fhlj =  parseFloat(ysfhlj); //发货累计
	
	if(kczl >zczl)
	{
		 Ext.Msg.alert("错误！！","空车重量不能大于装车数量！！");
		 obj.value = "";
		 return false;
	}else
	{
		var a = fhlj + (zczl-kczl);
		Ext.getDom('jzsl').value = formatNambToDouble(zczl-kczl) ;
		
		Ext.getDom('sfzl').value = formatNambToDouble(zczl-kczl);  //开提发货单时 回车重量默认为0，实际发货数量为净重量
		
		Ext.getDom('fhlj').value = formatNambToDouble(a) ;
		Ext.getDom('ys').value = formatNambToDouble(jhsl-a);
		return true;
	}
	
	// 余数
	var ys = parseFloat(Ext.getDom('ys').value);
	if(Ext.getDom('jzsl').value > ys){
		 Ext.Msg.alert("错误！！","净重数量不能大于余数，请重新填写");
	 return false;
	}
	
}

function check(){
	
	if(Ext.getCmp('khCombo').getValue() == "")
	{
		Ext.Msg.alert('错误','客户名称不能为空！！');
		return false;
	}
	if(Ext.getCmp('zkhCombo').getValue() == "")
	{
		Ext.Msg.alert('错误','子客户名称不能为空！！');
		return false;
	}
	if(Ext.getCmp('jhdhCombo').getValue() == "")
	{
		Ext.Msg.alert('错误','计划单号不能为空！！');
		return false;
	}
	if(Ext.getDom('jzsl').value =="")
	{
		Ext.Msg.alert('错误','净重数量不能为空！！');
		return false;
	}
	var hczl = parseFloat(Ext.getDom('hczl').value);
	var sfzl = parseFloat(Ext.getDom('sfzl').value);
	if(isNaN(hczl))
	{
		 Ext.Msg.alert("错误！！","请输入回车重量！！");
		 return false;
	}
	if(isNaN(sfzl))
	{
		 Ext.Msg.alert("错误！！","请输入实发重量！！");
		 return false;
	}
	if(Ext.getCmp('cyclCombo').getValue() == "")
	{
		Ext.Msg.alert('错误','承运车辆不能为空！！');
		return false;
	}
	if(Ext.getDom('ffkh').value =="")
	{
		Ext.Msg.alert('错误','发放库号不能为空！！');
		return false;
	}
	if(Ext.getDom('ccbh').value =="")
	{
		Ext.Msg.alert('错误','出厂编号不能为空！！');
		return false;
	}
	return true;
}

function submitData()
{

   if( check()){
	var data = fzData("save");

	
	Ext.Ajax.request
	({    
		url:'TFHDan!savaData.action', 
		params: 'data='+encodeURIComponent(data), 
		//params: 'data='+encodeURIComponent(data)+'&struts.token.name=token&token='+document.getElementsByName("token")[0].value, 
		method:'POST',
		success: function(resp,opts) 
	    { 
	     	var result = Ext.decode(resp.responseText);
	     	Ext.getDom('tfhdh').value=result.fhdh;
	        Ext.Msg.alert('信息',result.msg);
	        Ext.getCmp('submitBtn').setDisabled(true);
	    },
	    failure:function()
		{
			Ext.Msg.alert('错误','操作失败!!');
		}
	});	  
	}
}
/***
 * 
 *
 * 
 * @return {}
 */

function fzData(bj)
{
	var record = new Ext.data.Record();
	
	record.set('fhsj',Ext.getDom('fhsj').value);
	record.set('kpy', Ext.getDom('kpy').value);
	record.set('kczl',Ext.getDom('kczl').value);//空车重量
	record.set('hczl',Ext.getDom('hczl').value);//回车重量
	record.set('zczl',Ext.getDom('zczl').value);//装车重量
	record.set('sfzl',Ext.getDom('sfzl').value);//实发重量
	record.set('ffkh',Ext.getDom('ffkh').value);//实发重量
	record.set('ccbh',Ext.getDom('ccbh').value);//出厂编号
	record.set('zrsl',Ext.getDom('zrsl').value);
	record.set('zcsl',Ext.getDom('zcsl').value);
    record.set('cydwbm',Ext.getCmp('cydwCombo').getValue());
	
	
	var zkhmc = Ext.getDom('zkhmc').value;
	if(zkhmc == "请选择")
	{
		zkhmc = "";
	}
	
	if(bj== "save")
	{
		record.set('spbm', Ext.getDom('spbm').value);
		record.set('zkhdm',Ext.getCmp('zkhCombo').getValue());
		record.set('khdm',Ext.getCmp('khCombo').getValue());
		record.set('jhdh',Ext.getCmp('jhdhCombo').getValue());
		record.set('cyclbm',Ext.getCmp('cyclCombo').getValue());
		record.set('ys',   Ext.getDom('ys').value);
		record.set('f_id',   Ext.getCmp('standardIDField').getValue());
	}else if(bj== "nojls")
	{
		record.set('jhdh', Ext.getDom('jhdh').value);
		record.set('tfhdh', Ext.getDom('tfhdh').value);
		record.set('khmc', Ext.getDom('khmc').value);
		record.set('zkhmc',zkhmc);
		record.set('cydwmc', Ext.getDom('cydw').value);
		record.set('cyclbm', Ext.getDom('cycl').value);
		record.set('pzgg', Ext.getDom('pzgg').value);
		record.set('jzsl', Ext.getDom('jzsl').value);
		
	}else
	{	
		record.set('jhdh', Ext.getDom('jhdh').value);
		record.set('tfhdh', Ext.getDom('tfhdh').value);
		record.set('khmc', Ext.getDom('khmc').value);
		record.set('zkhmc',zkhmc);
		record.set('pzgg', Ext.getDom('pzgg').value);
		record.set('jzsl', Ext.getDom('jzsl').value);
		record.set('cydwmc', Ext.getDom('cydw').value);
		record.set('cyclbm', Ext.getDom('cycl').value);
		
		record.set('jhsl', Ext.getDom('jhsl').value);
		record.set('fhlj', Ext.getDom('fhlj').value);
		record.set('ys',   Ext.getDom('ys').value);
	}
	
	
	var jsonArray = [];
	
	Ext.each(record,function(item)
	{
		jsonArray.push(item.data);
	});

	data = Ext.encode(jsonArray);
	return data;
}


function printDataTable(flag)
{
	
	if(Ext.getDom('tfhdh').value=="")
	{
		Ext.Msg.alert('错误','请保存后打印！！！');
	}else
	{	var data = fzData("have");
		var url = 'TFHDanPrint!PrintData.action?flag='+flag+'&data='+encodeURIComponent(data);
		openMaxWindow(url);
	}
	
}

 // open新页面可以抽出放在公共js中
 function openMaxWindow(url) {
      //alert(url);
	var winheight = screen.availHeight - 55;
	var winwidth = screen.availWidth - 10;
	var param = "height="
			+ winheight
			+ ",width="
			+ winwidth
			+ ",top=0,left=0,toolbar=no,menubar=no,scrollbars=yes,resizable=no,location=no,status=no,titlebar=no";
	window.open(url, "", param);
  }


function printTable(flag)
{
	
	if(Ext.getDom('tfhdh').value=="")
	{
		Ext.Msg.alert('错误','请保存后打印！！！');
	}else
	{
		var data = fzData("nojls");
		var url = 'TFHDanPrint!PrintData.action?flag='+flag+'&data='+encodeURIComponent(data);
		openMaxWindow(url);
	}
}


