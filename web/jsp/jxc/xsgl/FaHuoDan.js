var ysfhlj;

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
							, '-', {
								text : "有发货记录数打印(套打)",
								id : "pritBtn",
								iconCls : "print",
								handler : function() {
									HaveDataPrint('tt');
								},
								scope : this
							},'-', {
								text : "无发货记录数打印(套打)",
								id : "pritDataBtn",
								iconCls : "print",
								handler : function() {
									NoDataPrint('tt');
								},
								scope : this
							}, '-', {
								text : "有发货记录数打印(web)",
								id : "pritBtn2",
								iconCls : "print",
								handler : function() {
									HaveDataPrint('web');
								},
								scope : this
							},'-', {
								text : "无发货记录数打印(web)",
								id : "pritDataBtn2",
								iconCls : "print",
								handler : function() {
									NoDataPrint('web');
								},
								scope : this
							}]
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
        width:'60%',
        name: 'jhdhText',
		hiddenName: 'jhdhbm',
		xtype: 'combo',
		store:new Ext.data.Store({
    						autoLoad:false,
							 proxy: new Ext.data.HttpProxy({
							 						url:'ComboboxAction!queryJhdh.action?dhlx=1'}),
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
    
		     
		  	// 承运单位下拉框			
		var cydwCombo = new Ext.form.ComboBox({
        id:'cydwCombo',
        applyTo: 'cydw',
        width:'80%',
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
									})
    }
    
    
   /*  zkhCombo.on('select', getJHDH);     
     function getJHDH(){
      	jhdhCombo.setValue(""); 
    	zkhbm = Ext.get('zkhbm').dom.value;     	
       	jhdhCombo.getStore().reload({callback: function(records, options, success)
									{
										if(0 == jhdhCombo.getStore().getCount())
										{
											Ext.MessageBox.alert('消息!!!','没有对应的计划单号，请重新选择！！！');
										}
										// 不能选择，在选中计划单号的时候要触发事件掉计划信息
										else{
										    var firstValue = jhdhCombo.getStore().getRange()[0].data.value;//这种方法可以获得第一项的值
											jhdhCombo.setValue(firstValue);//选中  
										}
									}
		});
    }*/
    
    
      // 承运单位
     var cydwbm = "";
     cydwCombo.on('select', getCYCL);   
    
     function getCYCL(){
      	cyclCombo.setValue(""); //承运车辆下拉框制空
  
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

     
  /**
  * 子客户加载前，加参数
  * */
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
 
 
 /**
  * 计划单号加载前，加参数
  * */
  jhdhCombo.getStore().on('beforeload', function() {
  		Ext.apply(this.baseParams,{khbm:khbm,zkhbm:zkhbm,type:"1"});
 });
 
 
 
    /**
     * 机会单号选中后调用ajax加载该计划信息
     */
   jhdhCombo.on('select', function(comboBox){
    	var jhdh = comboBox.getValue();
    	
	   // 调用ajax 从后台获取列名
		Ext.Ajax.request
		({    
			url:'FaHuoDan!queryData.action', 
			params: 'jhdh='+jhdh, 
			method:'POST',
			success: function(resp,opts) 
		    { 
               	var res = Ext.util.JSON.decode(resp.responseText);
            	Ext.getDom('fhlj').value=formatNambToDouble(res[0].FHLJ);
            	ysfhlj = formatNambToDouble(res[0].FHLJ);
            	Ext.getDom('jhsl').value=formatNambToDouble(res[0].JHSL);
            	
            	Ext.getDom('pzgg').value=res[0].SPMC;
            	Ext.getDom('hsbl').value=res[0].HSBL;
            	Ext.getDom('spbm').value=res[0].SPBM;
            	
            	Ext.getDom('zrsl').value=res[0].ZRSL;
            	Ext.getDom('zcsl').value=res[0].ZCSL;
            	Ext.getDom('ys').value=formatNambToDouble(parseFloat(res[0].JHSL)-parseFloat(res[0].FHLJ)+parseFloat(res[0].ZRSL)-parseFloat(res[0].ZCSL));
		    },
		    failure:function()
			{
				 Ext.Msg.alert("消息","加载数据出错");
			}
		});	  
    }); 
  
});



function jsdata(obj)
{
	var jhsl = parseFloat(Ext.getDom('jhsl').value);// 计划数量
	var zrsl = parseFloat(Ext.getDom('zrsl').value);
	var zcsl = parseFloat(Ext.getDom('zcsl').value);
	if(isNaN(jhsl))
	{
		 Ext.Msg.alert("错误！！","请正确操作，先选择计划单号！！");
		 obj.value = "";
		 return;
	}
	
	var a = checkedAndFromt(obj);
	if( a ==false)
	{
		return;
	}
	var fhsl =  parseFloat(a);// 发货数量
	var hsbl = parseFloat(Ext.getDom('hsbl').value);// 换算比率
	var ljsl = parseFloat(ysfhlj);// 累计数量
	var ys = jhsl-(fhsl+ljsl)+zrsl-zcsl;// 余数

	
	if(ys<0)
	{
		 Ext.Msg.alert("错误！！","发货累计超出计划数量！！");
		 obj.value = "";
		 return;
	}
		
	Ext.getDom('zhdz').value = formatNambToDouble(Math.ceil(fhsl*hsbl)) ;
	Ext.getDom('fhlj').value = formatNambToDouble(fhsl+ljsl);
	Ext.getDom('ys').value = formatNambToDouble(ys);
	
}

function submitData()
{
	
	if(baseCheck())
	{
		var data = fzData("save");
		Ext.Ajax.request
		({    
			url:'FaHuoDan!savaData.action', 
			params: 'data='+encodeURIComponent(data), 
			//params: 'data='+encodeURIComponent(data)+'&struts.token.name=tokenFH&tokenFH='+document.getElementsByName("tokenFH")[0].value, 
			method:'POST',
			success: function(resp,opts) 
		    { 
		     	var result = Ext.decode(resp.responseText);
		     	Ext.getDom('fhdh').value=result.fhdh;
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


function  baseCheck()
{
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
	if(Ext.getDom('fhsl').value=="")
	{
		Ext.Msg.alert('错误','发货数量不能为空！！');
		return false;
	}
	if(Ext.getCmp('cyclCombo').getValue() == "")
	{
		Ext.Msg.alert('错误','承运车辆不能为空！！');
		return false;
	}
	if(Ext.getDom('kczl').value == "")
	{
		Ext.Msg.alert('错误','空车重量不能为空！！');
		return false;
	}
	if(Ext.getDom('ccbh').value == "")
	{
		Ext.Msg.alert('错误','出厂编号不能为空！！');
		return false;
	}
	
	
	return true;
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
	record.set('fhsl',Ext.getDom('fhsl').value);
	record.set('cych',Ext.getCmp('cyclCombo').getValue());
	record.set('cydw',Ext.getCmp('cydwCombo').getValue());
	record.set('zhdz',Ext.getDom('zhdz').value);
	record.set('kczl',Ext.getDom('kczl').value);
	record.set('jhdh',Ext.getCmp('jhdhCombo').getValue());
	record.set('ccbh',Ext.getDom('ccbh').value);
	record.set('zrsl',Ext.getDom('zrsl').value);
	record.set('zcsl',Ext.getDom('zcsl').value);
	
	var zkhmc = Ext.getDom('zkhmc').value;
	if(zkhmc == "请选择")
	{
		zkhmc = "";
	}
	
	if(bj== "save")
	{
		record.set('zkhdm',Ext.getCmp('zkhCombo').getValue());
		record.set('khdm',Ext.getCmp('khCombo').getValue());
		record.set('spbm',Ext.getDom('spbm').value);
		record.set('cyclbm',Ext.getCmp('cyclCombo').getValue());
		record.set('ys',  Ext.getDom('ys').value);
	}else if(bj=="no")
	{
		
		record.set('fhdh', Ext.getDom('fhdh').value);
		record.set('khmc', Ext.getDom('khmc').value);
		record.set('zkhmc', zkhmc); 
		record.set('cydw',  Ext.getDom('cydw').value);
		record.set('pzgg', Ext.getDom('pzgg').value);
		
	}else
	{
		record.set('jhsl', Ext.getDom('jhsl').value);
		record.set('cydw', Ext.getDom('cydw').value);
		record.set('fhlj', Ext.getDom('fhlj').value);
		record.set('ys',   Ext.getDom('ys').value);
		record.set('fhdh', Ext.getDom('fhdh').value);
		record.set('khmc', Ext.getDom('khmc').value);
		record.set('zkhmc',zkhmc);
		record.set('pzgg', Ext.getDom('pzgg').value);
	}
	
	
	var jsonArray = [];
	
	Ext.each(record,function(item)
	{
		jsonArray.push(item.data);
	});

	data = Ext.encode(jsonArray);
	return data;
}

// 有发货记录数打印
function HaveDataPrint(flag)
{
	if(""==Ext.getDom('fhdh').value)
	{
		Ext.Msg.alert('错误','保存数据后打印！！！');
	}else
	{
		var data = fzData("have");
		var url = 'FaHuoDanPrint!PrintData.action?flag='+flag+'&data='+encodeURIComponent(data);
		openMaxWindow(url);
	}
	
}

// 无发货记录数打印
function NoDataPrint(flag)
{
	if(""==Ext.getDom('fhdh').value)
	{
		Ext.Msg.alert('错误','保存数据后打印！！！');
	}else
	{
		var data = fzData("no");
		var url = 'FaHuoDanPrint!PrintData.action?flag='+flag+'&data='+encodeURIComponent(data);
		openMaxWindow(url);
	}
}

 



