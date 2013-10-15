
var columnArray = new Array();
var fieldArray = new Array();

Ext.onReady(function(){
	Ext.QuickTips.init();
	Ext.lib.Ajax.defaultPostHeader += ";charset=utf-8";
	
	/**
	 * 工具栏
	 */
	var tb = new Ext.Toolbar({
					width: '100%',
					items : [{
								text : "查询",
								iconCls : "query",
								id : "query",
								handler : function() {
									queryData();
								},
								scope : this
							},'-',
							{
								text : "重置",
								iconCls : "reset",
								id : "reset",
								handler : function() {
									form.getForm().reset();
								},
								scope : this
							},'-',
							{
								text : "有记录打印(套打)",
								iconCls : "reset",
								id : "havedata",
								handler : function() {
									Print('have','tt');
								},
								scope : this
							},'-',
							{
								text : "无记录打印(套打)",
								iconCls : "reset",
								id : "nodata",
								handler : function() {
									Print('no','tt');
								},
								scope : this
							},'-',
							{
								text : "有记录打印(web)",
								iconCls : "reset",
								id : "havedata2",
								handler : function() {
									Print('have','web');
								},
								scope : this
							},'-',
							{
								text : "无记录打印(web)",
								iconCls : "reset",
								id : "nodata2",
								handler : function() {
									Print('no','web');
								},
								scope : this
							}]
				});	
	
				
				
				
	// 客户名称下拉框			
	 var khCombo = new Ext.form.ComboBox({
        id:'khCombo',
        width:220,
        name: 'khmcText',
        fieldLabel: '客户名称',
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
	
    
    
    // 客户名称下拉框			
	 var djlxCombo = new Ext.form.ComboBox({
        id:'djlxCombo',
        width:220,
        name: 'djlxText',
        fieldLabel: '单据类型',
		hiddenName: 'djlx',
		xtype: 'combo',
		store: new Ext.data.SimpleStore({
                          fields: ['value','text'],
                          data: [['001','销售单'],['002','发货单'],['003','提发货单'],['004','退货单'],['005','订货单']]}),
		emptyText: '请选择',  
		mode: 'local',
		triggerAction: 'all',
		valueField: 'value',
		displayField: 'text',
		readOnly: true
    });			
    
	 djlxCombo.on('select', getHead); 
               var pymValue ="";      
       
        Ext.getCmp('khCombo').on('beforequery',function(e){     
       		 if(!e.forceAll){   
            		pymValue = e.query;   
            		//if (!pymValue == "")
            		Ext.getCmp('khCombo').getStore().reload({callback: function(records, options, success)
									{
//									if( Ext.getCmp('khCombo').getStore().getCount()>1 && (!pymValue == ""))
//										{
//											var firstValue = Ext.getCmp('khCombo').getStore().getRange()[1].data.value;//这种方法可以获得第一项的值 
//											 Ext.getCmp('khCombo').setValue(firstValue);//选中    	
//											 Ext.getCmp('khCombo').focus();	
//											 							
//										}	
									}
		});
        }  
        //}
         }); 
    
          var pym ="";     
   	  Ext.getCmp('khCombo').getStore().on('beforeload', function() {
      Ext.apply(this.baseParams, {
         pym : pymValue
        });
       });
    
	/**
	 * 查询条件fieldset框
	 */			
	var fieldset = new Ext.form.FieldSet({
		title:'查询条件',
		height:80,
		border: true,
       	labelWidth: 100,
       	labelAlign: 'right',
        buttonAlign: 'center',
        items: [
                  {layout:'column',
                  items: 
                  [
                  	{columnWidth:.5,layout: 'form',  items:djlxCombo}
                   ,{columnWidth:.5,layout: 'form',  items:khCombo}
                  ]
                 }
                 ,{layout:'column',
                  items: 
                  [
                  	{columnWidth:.5,layout: 'form'
                  	,items:{fieldLabel : '所属日期起'	,id : 'ssrqq',xtype:"datefield",format:"Ymd",width: 220,emptyText: '请选择日期 ...' ,allowBlank:false ,name : 'ssrqq'}
           			}
                   ,{columnWidth:.5,layout: 'form'
                   	,items:{fieldLabel : '所属日期止'	,id : 'ssrqz',xtype:"datefield",format:"Ymd",width: 220,emptyText: '请选择日期 ...' ,allowBlank:false ,name : 'ssrqz'}
                   	}
                  ]
                 }
                 
               ]        
	});
	/**
	 * 
	 */
	 var form = new Ext.form.FormPanel({
    	id:'form',
    	border : false,
        frame:true,
        items: [
            tb,fieldset
        ]
    });
    
     var RiZhixxRecord = Ext.data.Record.create(fieldArray);
 	
 	 var store = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy
        					({url:'AddPrintGetData!queryData.action',
        				      success: function(resp,opts){},failure:function(){}}),
        reader: new Ext.data.JsonReader({
            totalProperty: 'totalCount',root: 'rzxx'},RiZhixxRecord),remoteSort: false
    });
 	 
    
    
 	
    var columns = new Ext.grid.ColumnModel(columnArray);
   
    
   
   // 当列超出时有滚动条 
    var grid = new Ext.grid.GridPanel({
    	id:'grid',
        anchor:'99%',
        loadMask: true,
       // autoScroll:true, 
        height:390,
        store: store,
        cm: columns,
        viewConfig: {
            forceFit: true,
            scrollOffset:15
        },
        bbar: new Ext.PagingToolbar({
            pageSize: 10,
            border:false,
            store: store,
            displayInfo: true,
			displayMsg: '显示第 {0} 条到 {1} 条记录，一共 {2} 条', 
			emptyMsg: "没有记录" 
        })
    });
    
    
    
       /**
        * 
        */
       var fieldset2 = new Ext.form.FieldSet({
		title:'详细信息',
		region: 'center',
		autoHeight:true, 
		height:250,
		//autoScroll:true,
		border: true,
        items:[grid]
        })

    
        var panl = new Ext.Panel(
        {
        	frame:true,
			items:[fieldset2]
       	});
    
    
    //
     var viewport = new Ext.Viewport({
     	border: false,
     	renderTo: 'main',
        items: [form,panl]
    });
  
});



/**
 * 当日志文件被选中时获取表头
 */
 function getHead()
 {
	/***调用ajax从后台取列名信息 start**/

	Ext.Ajax.request
	({    
		url:'AddPrint!queryColumnData.action', 
		params: {djlx:Ext.getCmp('djlxCombo').getValue()}, 
		method:'POST',
		success: function(resp,opts) 
	    { 
	     	if(resp.responseText=="")
             {
                return;
             }else
             {
             	var arrayC = new Array();
             	var arrayF = new Array();
             	
             	var res = Ext.util.JSON.decode(resp.responseText);
            	for(var i=0;i<res.length;i++)
             	{
                   	 arrayC.push(res[i]);
                   	 arrayF.push({name: res[i].dataIndex,mapping:res[i].dataIndex,type: 'string'});
             	}
             	refGrid(arrayC,arrayF);
             }         
	    },
	    failure:function()
		{
			 Ext.Msg.alert("消息","加载表头数据出错");
		}
	});	  
}


/**
 * 刷新grid
 */
function refGrid(arrayC,arrayF)
{
	
		var columnArray = arrayC;
		var fieldArray = arrayF;
		
		  //向数组头部添加
	 	columnArray.unshift(new Ext.grid.RowNumberer());
	 	
		 var RiZhixxRecord = Ext.data.Record.create(fieldArray);
		 var columns = new Ext.grid.ColumnModel(columnArray);
		 
		 var store = new Ext.data.Store({
	        proxy: new Ext.data.HttpProxy
	        					({url:'AddPrintGetData!queryData.action',
	        				      success: function(resp,opts) 
							      { 
							      	// 如果程序执行正确，但没有信息，返回没有对应的信息
							     	var result = Ext.decode(resp.responseText);
							       	//msg 是从后台返回的如果程序出错执行不到这一步，msg为空
							     	if(true == result.success&&""!=result.msg)
							     	{
							     		Ext.Msg.alert('信息',result.msg);
							     	}
							      },
							      failure:function()
								  {
									Ext.Msg.alert('错误','加载数据出错!!');
								  }
	        					 }),
	        reader: new Ext.data.JsonReader({
	            totalProperty: 'totalCount',
	            root: 'rzxx'
	        },RiZhixxRecord),
	        remoteSort: false
	    });
	    
		// 初始化添加参数
		 store.on('beforeload', function() {
	      Ext.apply(this.baseParams, {
	        	ssrqq : Ext.getCmp('ssrqq').getValue().format('Ymd'),
	         	ssrqz : Ext.getCmp('ssrqz').getValue().format('Ymd'),
	         	khbm  : Ext.getCmp('khCombo').getValue(),
	         	djlx  : Ext.getCmp('djlxCombo').getValue()
	        });
	        
	     });
	    
	     
		 //刷新
		Ext.getCmp('grid').reconfigure(store,columns);
	  //  Ext.getCmp('grid').getView().refresh(true);
	
}


function queryData()
{
	if(basecheck())
	{
	    Ext.getCmp('grid').getStore().load({
		    	callback: function(records, options, success)
				{
					if(0 ==  Ext.getCmp('grid').getStore().getCount())
					{
						Ext.MessageBox.alert('消息','没有您要查询的信息！！！');
					}
				}
			})
	}
}

function  basecheck()
{
	if(Ext.getCmp('djlxCombo').getValue() =="")
	{
		Ext.Msg.alert('错误','单据类型不能为空!!');
		return false
	}
	if(Ext.getCmp('khCombo').getValue() =="")
	{
		Ext.Msg.alert('错误','客户名称不能为空!!');
		return false
	}
	if( Ext.getCmp('ssrqq').getValue() =="")
	{
		Ext.Msg.alert('错误','所属日期起不能为空!!');
		return false;
	}
	if( Ext.getCmp('ssrqz').getValue() =="")
	{
		Ext.Msg.alert('错误','所属日期止不能为空!!');
		return false;
	}
	return true;
}


function Print(bj,flag)
{
	
	var selections = Ext.getCmp('grid').getSelectionModel().getSelections();
	if(selections.length!=1)
	{
		Ext.Msg.alert('错误','请选择一条记录进行打印');
		return;
	}
	
	var data = "";
	var jsonArray = [];
	var record = selections[0];
	
	var djlx = record.get("djlx");
	
//	var khmc = record.get("khmc");
//    var zkhmc = record.get("zkhmc");
	
	Ext.each(record,function(item)
	{
		jsonArray.push(item.data);
	});
	
	data = Ext.encode(jsonArray);

	Ext.Ajax.request
	({    
		url:'AddPrint!queryBdData.action', 
		params: 'data='+encodeURIComponent(data), 
		method:'POST',
		//options : Object 请求所调用的参数。
		success: function(resp,opts) 
	    { 
	     		var res = Ext.util.JSON.decode(resp.responseText);
	     		forward(bj,djlx,res[0],flag);
	    },
	    failure:function()
		{
			Ext.Msg.alert('错误','操作失败!!');
		}
	});	  
	
}

function forward(bj,djlx,object,flag)
{
	var record = new Ext.data.Record();
	var url = '';
	if(djlx == '001')//销售单
	{
		if(object.jhdh == "")
		{
			Ext.Msg.alert('错误','数据错误,请确认');
			return;
		}
		url ='XiaoShowDanPrint!PrintData.action?flag='+flag+'&data=';
		var je = formatNambToDouble(parseFloat(object.dj)*parseFloat(object.sl));
		record.set('kpsj'  	,object.kpsj);
		record.set('sl'		,formatNambToDouble(object.sl));
		record.set('dj'		,formatNambToDouble(object.dj));
		record.set('bz'		,object.bz);
		record.set('kpy'	,object.kpy);
		record.set('khmc' 	,object.khmc);
		record.set('zkhmc'	,object.zkhmc);
		record.set('pzgg'	,object.pzgg);
		record.set('jhdh'	,object.jhdh);
		record.set('je'		,je);
		record.set('dxje'	,Arabia_to_Chinese(je));
	}else if(djlx == '002')// 发货单
	{
		url ='FaHuoDanPrint!PrintData.action?flag='+flag+'&data=';
		
		record.set('fhdh', object.fhdh);
		record.set('fhsj', object.fhsj);
		record.set('khmc', object.khmc);
		record.set('zkhmc',object.zkhmc);
		record.set('cych', object.cych);
		record.set('cydw', object.cydw);
		record.set('jhdh', object.jhdh);
		record.set('pzgg', object.pzgg);
		record.set('ccbh', object.ccbh);
		record.set('fhsl', formatNambToDouble(object.fhsl));
		record.set('zhdz', formatNambToDouble(object.zhdz));
		record.set('kczl', formatNambToDouble(object.kczl));
	
		record.set('kpy',  object.kpy);
		
		record.set('zrsl', formatNambToDouble(object.zrsl));
		record.set('zcsl', formatNambToDouble(object.zcsl));
		
		if(bj == "have")
		{
			record.set('jhsl', formatNambToDouble(object.jhsl));
			record.set('fhlj', formatNambToDouble((object.fhlj)));
			record.set('ys', formatNambToDouble(parseFloat(object.jhsl)-parseFloat(object.fhlj)+parseFloat(object.zrsl)-parseFloat(object.zcsl)));
		
		}	
	}else if(djlx == '003')// 提发货单
	{
		url ='TFHDanPrint!PrintData.action?flag='+flag+'&data=';
		record.set('jhdh', 	object.jhdh);
		record.set('tfhdh', object.tfhdh);
		record.set('khmc', 	object.khmc);
		record.set('zkhmc',	object.zkhmc);
		record.set('pzgg', 	object.pzgg);
		record.set('cydwmc', object.cydwmc);
		record.set('cyclbm', object.cyclbm);
		record.set('fhsj',	object.fhsj);
		record.set('kpy',	object.kpy);
		record.set('ccbh', object.ccbh);
		record.set('jzsl', 	formatNambToDouble(object.jzsl));
		record.set('kczl',	formatNambToDouble(object.kczl));//空车重量
		record.set('zczl',	formatNambToDouble(object.zczl));//装车重量
		record.set('hczl',	formatNambToDouble(object.hczl));//回车重量
		record.set('sfzl',	formatNambToDouble(object.sfzl));//实发重量
		record.set('ffkh',	object.ffkh);//发放库号
		
		record.set('zrsl', formatNambToDouble(object.zrsl));
		record.set('zcsl', formatNambToDouble(object.zcsl));
		
		if(bj == "have")
		{
			record.set('jhsl', formatNambToDouble(object.jhsl));
			record.set('fhlj', formatNambToDouble(object.fhlj));
			record.set('ys',   formatNambToDouble(parseFloat(object.jhsl)-parseFloat(object.fhlj)+parseFloat(object.zrsl)-parseFloat(object.zcsl)));
		}	
	}
	else if(djlx == '004'){
		url ='TuiHuo!PrintData.action?data=';
		var je = formatNambToDouble(parseFloat(object.dj)*parseFloat(object.sl));
		record.set('kpsj'  	,object.kpsj);
		record.set('sl'		,formatNambToDouble(object.sl));
		record.set('dj'		,formatNambToDouble(object.dj));
		record.set('bz'		,object.bz);
		record.set('kpy'	,object.kpy);
		record.set('khmc' 	,object.khmc);
		record.set('zkhmc'	,object.zkhmc);
		record.set('pzgg'	,object.pzgg);
		record.set('jhdh'	,object.jhdh);
		record.set('thdh'	,object.thdh);
		record.set('je'		,je);
		record.set('dxje'	,Arabia_to_Chinese(je));
	}
    else {
    	url ='YuShowDanPrint!PrintData.action?flag='+flag+'&data=';
//		url ='YuShowDanPrint!PrintData.action?data=';
		var je = formatNambToDouble(parseFloat(object.dj)*parseFloat(object.sl));
		record.set('kpsj'  	,object.kpsj);
		record.set('sl'		,formatNambToDouble(object.sl));
		
		record.set('dj'		,formatNambToDouble(object.dj));
		record.set('bz'		,object.bz);
		record.set('kpy'	,object.kpy);
		record.set('khmc' 	,object.khmc);
		record.set('pzgg'	,object.pzgg);
		record.set('jhdh'	,object.jhdh);
		record.set('je'		,je);
		record.set('dxje'	,Arabia_to_Chinese(je));
	}
	
	
	var jsonArray = [];
	
	Ext.each(record,function(item)
	{
		jsonArray.push(item.data);
	});
	
	var data = Ext.encode(jsonArray);
	
	var url = url+encodeURIComponent(data);
	openMaxWindow(url);

	
}




