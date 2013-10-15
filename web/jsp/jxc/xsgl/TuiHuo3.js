
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
								text : "作废",
								iconCls : "reset",
								id : "tuihuo",
								handler : function() 
								{
									tuiHuo();
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
	
    
      // 计划单号下拉
       var jhdhCombo = new Ext.form.ComboBox({
        id:'jhdhCombo',
        width: 220,
        name: 'jhdhText',
        fieldLabel: '订货单号',
		hiddenName: 'jhdhbm',
		xtype: 'combo',
		store:new Ext.data.Store({
    						autoLoad:false,
							 proxy: new Ext.data.HttpProxy({
							 						url:'ComboboxAction!queryJhdh.action?dhlx=3'}),
							reader: new Ext.data.JsonReader({
							  root:'combobox',
   							fields:['value','text']}), 
						remoteSort: true  }),
		emptyText: '请选择',  
		mode: 'remote',
		triggerAction: 'all',
		valueField: 'value',
		displayField: 'text',
		editable:true
    });
    
    var khbm ="";
   	
    
      //客户下拉框，如果被改变，子客户下拉框置空
     khCombo.on('select', getZJHDH);     
     function getZJHDH(){
		jhdhCombo.setValue("");// 计划单号制空
    	khbm = Ext.get('khbm').dom.value;
   		jhdhCombo.getStore().reload({callback: function(records, options, success)
										{
											if(0 == jhdhCombo.getStore().getCount())
											{
												Ext.MessageBox.alert('消息!!!','没有对应的预售单号，请重新选择！！！');
											}
										}
									})
    }
    
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
  * 计划单号加载前，加参数
  * */
  jhdhCombo.getStore().on('beforeload', function() {
  		Ext.apply(this.baseParams,{khbm:khbm});
 });
 
    
 
   // 品种规格名称下拉
     var spxx = new Ext.form.ComboBox({
        id:'spCombo',
        width:220,
        name: 'spmcText',
        fieldLabel: '品种规格',
		hiddenName: 'splx',
		xtype: 'combo',
		store:  new Ext.data.Store({
    						autoLoad:false,
							 proxy: new Ext.data.HttpProxy({
							 						url:'ComboboxAction!queryPpgg.action'}),
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
   
    
    
    
	/**
	 * 查询条件fieldset框
	 */			
	var fieldset = new Ext.form.FieldSet({
		title:'查询条件',
		height:100,
		border: true,
       	labelWidth: 100,
       	labelAlign: 'right',
        buttonAlign: 'center',
        items: [
                  {layout:'column',
                  items: 
                  [
                  	{columnWidth:.5,layout: 'form',  items:khCombo}
                   ,{columnWidth:.5,layout: 'form',  items:spxx}
                  ]
                 }
                 ,{layout:'column',
                  items: 
                  [{columnWidth:.5,layout: 'form',  items:{fieldLabel : '所属日期起'	,id : 'ssrqq',xtype:"datefield",format:"Ymd",width: 220,emptyText: '请选择日期 ...' ,allowBlank:false ,name : 'ssrqq'}}
                  	,
                  	{columnWidth:.5,layout: 'form'
                  	,items:{fieldLabel : '所属日期止'	,id : 'ssrqz',xtype:"datefield",format:"Ymd",width: 220,emptyText: '请选择日期 ...' ,allowBlank:false ,name : 'ssrqz'}
           			}
                   
                  ]
                 }
                 ,{layout:'column',
                  items: 
                  [
                  	{columnWidth:.5,layout: 'form',  items:jhdhCombo}
                   ,{columnWidth:.5,layout: 'form'
                   	,items:{}
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
    
    
    var splbRecord = Ext.data.Record.create([
        {name: 'xsdh' 		,mapping:'xsdh'		    ,type: 'string'},
        {name: 'spmc' 		,mapping:'spmc'		    ,type: 'string'},
        {name: 'spbm' 		,mapping:'spbm'		    ,type: 'string'},
        {name: 'jhsl'       ,mapping:'jhsl'			,type: 'string'},
        //{name: 'fhlj'      	,mapping:'fhlj'	        ,type: 'string'},
        //{name: 'ys'			,mapping:'ys' 	    	,type: 'string'},
        {name: 'jc'			,mapping:'jc'     		,type: 'string'},
        {name: 'wldwmc'		,mapping:'wldwmc'     	,type: 'string'},
        {name: 'wldwbm'		,mapping:'wldwbm'     	,type: 'string'},
        //{name: 'zkhmc'		,mapping:'zkhmc'     	,type: 'string'},
        //{name: 'zkhbm'		,mapping:'zkhbm'     	,type: 'string'},
        {name: 'kprq'		,mapping:'kprq'     	,type: 'string'},
        {name: 'kpry'		,mapping:'kpry'     	,type: 'string'}
        //{name: 'bz'		    ,mapping:'bz'    		,type: 'string'}
    ]);

    var store = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy
        					({url:'queryYsdxx!queryXsdxx.action?thlx=3',
	        				    success: function(resp,opts) 
							    { 
							     	var result = Ext.decode(resp.responseText);
							       	//msg 是从后台返回的如果程序出错执行不到这一步，msg为空
							     	if(true == result.success&&""!=result.msg)
							     	{
							     		Ext.Msg.alert('信息',result.msg);
							     	}
							    },
							    failure:function()
								{	
									Ext.Msg.alert('错误提示','加载数据出错!');
								}
        					}),
        	reader: new Ext.data.JsonReader({
            totalProperty: 'totalCount',
            root: 'xsdxx'
        },splbRecord),
        remoteSort: true
    });
 
    // 初始化添加参数
		 store.on('beforeload', function() {
	      Ext.apply(this.baseParams, {
	        	splx  : Ext.getCmp('spCombo').getValue(),
	        	ssrqq : Ext.getCmp('ssrqq').getValue().format('Ymd'),
	         	ssrqz : Ext.getCmp('ssrqz').getValue().format('Ymd'),
	         	khbm  : Ext.getCmp('khCombo').getValue(),
	           jhdhbm : Ext.getCmp('jhdhCombo').getValue()
	         	
	        });
	        
	     });
    
    
    
	//var checkbox = new Ext.grid.CheckboxSelectionModel({id:'checkbox',handleMouseDown:Ext.emptyFn,width:30}); //CheckBox选择列 
    var columns = new Ext.grid.ColumnModel([  
    	//checkbox,
    	new Ext.grid.RowNumberer(), //行号列
	    {header: '单号'    	,dataIndex: 'xsdh'   },
	    {header: '商品名称'		,dataIndex: 'spmc'},
	    //{header: '计划数量(吨)' 	,dataIndex: 'jhsl'},
	    {header: '预售数量' 		,dataIndex: 'jhsl'},
	    {header: '结存数量' 			,dataIndex: 'jc'},
        //{header: '单价(元)'   	,dataIndex: 'dj'},
        {header: '客户名称'		,dataIndex: 'wldwmc'},
        //{header: '子客户名称'		,dataIndex: 'zkhmc'},
        {header: '开票日期'		,dataIndex: 'kprq'},
        {header: '开票人员'		,dataIndex: 'kpry'}
        //{header: '备注'	    	,dataIndex: 'bz'}
        
    ]);

    var grid = new Ext.grid.GridPanel({
    	id:'grid',
        anchor:'99%',
        loadMask: true,
        height:390,
        store: store,
        cm: columns,
        //每次只能选择一行new Ext.grid.RowSelectionModel({singleSelect:true}),，如果sm：checkbox 则可以多选
        sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
        viewConfig: {
            forceFit: true
        },
        autoScroll:true,
      
        bbar: new Ext.PagingToolbar({
            pageSize: 10,
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
		height:280,
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
	if(Ext.getCmp('spCombo').getValue() =="")
	{
		Ext.Msg.alert('错误','品种规格不能为空!!');
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

function tuiHuo()
{
	
	var data = "";
	var jsonArray = [];
	
	var selections = Ext.getCmp('grid').getSelectionModel().getSelections();
	var record = selections[0];
	Ext.each(record,function(item)
	{
		jsonArray.push(item.data);
	});
	data = Ext.encode(jsonArray);
	
	Ext.Ajax.request
	({    
		url:'TuiHuo3!saveTuiHuoxx.action', 
		params: 'data='+encodeURIComponent(data), 
		//params: 'data='+encodeURIComponent(data)+'&struts.token.name=token&token='+document.getElementsByName("token")[0].value, 
		method:'POST',
		//options : Object 请求所调用的参数。
		success: function(resp,opts) 
	    { 
	     		var res = Ext.util.JSON.decode(resp.responseText);
	     		Ext.Msg.alert('信息',res.msg);
	     		 Ext.getCmp('grid').getStore().reload()
	    },
	    failure:function()
		{
			Ext.Msg.alert('错误','操作失败!!');
		}
	});	  
}

