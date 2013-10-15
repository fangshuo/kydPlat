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
								text : "转出",
								iconCls : "reset",
								id : "reset",
								handler : function() {
									doZc();
								},
								scope : this
							}]
				});	
	
				
				    //关键字     
		var gjzField = new Ext.form.TextField({
		   id:'gjzField',
		   fieldLabel: '关键字',
		   name: 'gjzField'
		});
				
	/**
	 * 查询条件fieldset框
	 */			
	var fieldset = new Ext.form.FieldSet({
		title:'查询条件',
		height:5,
		border: true,
       	labelWidth: 100,
       	labelAlign: 'right',
		layout: 'column',
        items:[
        	   
       		  		  {
        	   	//defaults: {width: 200,allowBlank: false},
            	columnWidth:.5,
            	border: false,
            	layout:'form',
            	items:[{
            			id:'zkhmcCombo',
            			xtype: 'combo',
            			fieldLabel: '客户名称',
            			name: 'zkhmcText',
            			hiddenName: 'zkhmc',
            			allowBlank: true,
            			width: 220,
            			
            			store: new Ext.data.Store({
            									// 
       										 proxy: new Ext.data.HttpProxy({url:'ComboboxAction!queryKhxx.action'}),
        									 reader: new Ext.data.JsonReader({
        									  root:'combobox',
        		   							fields:['value','text']}), 
        								remoteSort: true  }) ,
            			emptyText: '请选择...',  
            			mode: 'remote',
            			triggerAction: 'all',
            			valueField: 'value',
            			displayField: 'text'
           				}]
       		  },
       		  {columnWidth:.5,
            	border: false,
            	layout:'form',
       		 items:[{id:'pzggmcCombo',
            			xtype: 'combo',
            			fieldLabel: '商品规格',
            			name: 'pzggmcText',
            			hiddenName: 'pzggmc',
            			allowBlank: false,
            			width: 220,
            			
            			store: new Ext.data.Store({
            									// 
       										 proxy: new Ext.data.HttpProxy({url:'ComboboxAction!queryPpgg.action'}),
        									 reader: new Ext.data.JsonReader({
        									  root:'combobox',
        		   							fields:['value','text']}), 
        								remoteSort: true  }) ,
            			emptyText: '请选择...',  
            			mode: 'remote',
            			triggerAction: 'all',
            			valueField: 'value',
            			displayField: 'text',
           				readOnly: true
					}]
       		  }
       		  ]
	 });
	 
	 
	 	var pymValue ="";      
       
        Ext.getCmp('zkhmcCombo').on('beforequery',function(e){     
       		 if(!e.forceAll){   
            		pymValue = e.query;   
              		Ext.getCmp('zkhmcCombo').getStore().reload({callback: function(records, options, success)
									{
									if( Ext.getCmp('zkhmcCombo').getStore().getCount()>0 && (!pymValue == ""))
										{
											var firstValue = Ext.getCmp('zkhmcCombo').getStore().getRange()[1].data.value;//这种方法可以获得第一项的值 
											 Ext.getCmp('zkhmcCombo').setValue(firstValue);//选中    	
											 							
										}
									}
		});
        }   
         });  
      
      var pym ="";     
   	  Ext.getCmp('zkhmcCombo').getStore().on('beforeload', function() {
      Ext.apply(this.baseParams, {
         pym : pymValue
        });
       });
       
	/**
	 * 
	 */
	 var form = new Ext.form.FormPanel({
    	id:'form',
    	border : false,
        frame:true,
                //实现非AJAX提交表单一定要加下面的两行！
		onSubmit: Ext.emptyFn,   
        items: [
            tb,fieldset
        ]
    });
        
     var splbRecord = Ext.data.Record.create([
        {name: 'jhdh' 		,mapping:'jhdh'		,type: 'string'},
        {name: 'sl' 		,mapping:'sl'		,type: 'string'},
        {name: 'jc'         ,mapping:'jc'		,type: 'string'}
    ]);

    //转出单号
    var store = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy
        					({url:'xsdzcManager2!queryData.action',
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
            root: 'fhjlList'
        },splbRecord)
        //remoteSort: true
    });
 
	var checkbox = new Ext.grid.CheckboxSelectionModel({id:'checkbox',handleMouseDown:Ext.emptyFn,width:30}); //CheckBox选择列 
    var columns = new Ext.grid.ColumnModel([  
    	checkbox,
    	new Ext.grid.RowNumberer(), //行号列
	    {header: '计划单号'    ,
       	 	dataIndex: 'jhdh'   
       	 	,sortable :true
        },{header: '计划量(吨)',
	        dataIndex: 'sl'
	        ,sortable :true
        },
        
        {header: '结存量(吨)' 	,
        	dataIndex: 'jc'
        	,sortable :true
        }
    ]);

    // grid start  GridPanel
    var grid = new Ext.grid.EditorGridPanel({
    	id:'grid',
    	title: '转出单号列表',
        anchor:'99%',
        loadMask: true,
        height:200,
        store: store,
        cm: columns,
        //每次只能选择一行new Ext.grid.RowSelectionModel({singleSelect:true}),，如果sm：checkbox 则可以多选
        sm: checkbox,
        // 自动计算表格每列的宽度
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
    
       
 	// 初始化添加参数
	  store.on('beforeload', function() {

      Ext.apply(this.baseParams, {
         zkhmc : Ext.get('zkhmc').dom.value,
         spbm : Ext.get('pzggmc').dom.value
        });
     });
     
 
     //转入单号
   var store2 = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy
        					({url:'xsdzcManager2!queryData2.action',
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
            totalProperty: 'totalCount2',
            root: 'fhjlList2'
        },splbRecord)
        //remoteSort: true
    });
 
	var checkbox2 = new Ext.grid.CheckboxSelectionModel({id:'checkbox2',handleMouseDown:Ext.emptyFn,width:30}); //CheckBox选择列 
    var columns2 = new Ext.grid.ColumnModel([  
    	checkbox2,
    	new Ext.grid.RowNumberer(), //行号列
	    {header: '计划单号'    ,
       	 	dataIndex: 'jhdh'   
       	 	,sortable :true
        },{header: '计划量(吨)',
	        dataIndex: 'sl'
	        ,sortable :true
        },
        
        {header: '结存量(吨)' 	,
        	dataIndex: 'jc'
        	,sortable :true
        }
    ]);

    // grid start  GridPanel
    var grid2 = new Ext.grid.EditorGridPanel({
    	id:'grid2',
    	title: '转入单号列表',
        anchor:'99%',
        loadMask: true,
        height:200,
        store: store2,
        cm: columns2,
        //每次只能选择一行new Ext.grid.RowSelectionModel({singleSelect:true}),，如果sm：checkbox 则可以多选
        sm: checkbox2,
        // 自动计算表格每列的宽度
        viewConfig: {
            forceFit: true
        },
        autoScroll:true,
      
        bbar: new Ext.PagingToolbar({
            pageSize: 10,
            store: store2,
            displayInfo: true,
			displayMsg: '显示第 {0} 条到 {1} 条记录，一共 {2} 条', 
			emptyMsg: "没有记录" 
        })
    });
    
       
 	// 初始化添加参数
	  store2.on('beforeload', function() {

      Ext.apply(this.baseParams, {
         zkhmc : Ext.get('zkhmc').dom.value,
         spbm : Ext.get('pzggmc').dom.value
        });
     });  
     
     
     
        var panl = new Ext.Panel(
        {
        	layout:'column',
        	frame:true,
			items:[{
                region:'center',
                margins:'35 5 5 0',
                layout:'column',
                autoScroll:true,
                items:[{
                    columnWidth:1,
                    baseCls:'x-plain',
                    bodyStyle:'padding:5px 0 5px 5px',
                    items:[grid]
                }
                ,{
                    columnWidth:1, 
                    baseCls:'x-plain',
                    bodyStyle:'padding:5px 0 5px 5px',
                    items:[grid2]
                }
                ]
            }]
       	});
    
    
    //
     var viewport = new Ext.Viewport({
     	border: false,
     	renderTo: 'main',
        items: [form,panl]
    });
  
});

/**
 * 根据条件查询数据
 */
function queryData()
{	

	if(!Ext.getCmp('form').form.isValid()){
		return ;
	}else{
		Ext.getCmp('grid').getStore().reload({callback: function(records, options, success)
			{
				if(0 == Ext.getCmp('grid').getStore().getCount())
				{
					Ext.MessageBox.alert('消息','没有您要查询的信息！！！');
				}
			}
		});
		Ext.getCmp('grid2').getStore().reload({callback: function(records, options, success)
			{
				if(0 == Ext.getCmp('grid2').getStore().getCount())
				{
					Ext.MessageBox.alert('消息','没有您要查询的信息！！！');
				}
			}
		});
	}
}

function doZc(){
	var records = Ext.getCmp('grid').getSelectionModel().getSelections();
	var records2 = Ext.getCmp('grid2').getSelectionModel().getSelections();
	if(records.length>1){
		Ext.MessageBox.alert('信息提示','一次不能选择多条转出单记录！');
		return;
	}else if(records.length==0){
		Ext.MessageBox.alert('信息提示','请至少选择一条转出单记录！');
		return;
	}else if(records2.length>1){
		Ext.MessageBox.alert('信息提示','一次不能选择多条转入单记录！');
		return;
	}else if(records2.length==0){
		Ext.MessageBox.alert('信息提示','请至少选择一条转入单记录！！！');
		return;
	}else{
			
		var jsonArray = [];
			var record = records[0];
			var record2 = records2[0];
			//校验新增输入框内容不能为空
			var zcdh=record.get("jhdh");
			var zrdh=record2.get("jhdh");
			var zcsl=record.get("jc");
            var zrsl=record.get("jc");
						
			if(zcdh == zrdh ){
				Ext.MessageBox.alert('信息提示','转出单号和转入单号不能相同！');
				return;
			}
            jsonArray.push(zcdh);
            jsonArray.push(zrdh);
            jsonArray.push(zcsl);
            jsonArray.push(zrsl);
            
         data = Ext.encode(jsonArray);
	
		 Ext.getCmp('form').getForm().submit
		({
			url: 'xsdzcManager2!doZC.action',
			params:{data:data},
			//params: 'data='+encodeURIComponent(data)+'&struts.token.name=token&token='+document.getElementsByName("token")[0].value, 
			success:function(form,action)
			{
				Ext.MessageBox.alert('信息提示',action.result.msg);
				Ext.getCmp('reset').setDisabled(true);
				//重新加载数据
				//Ext.getCmp('grid').getStore().load({params:{start:0, limit:10}});
			},
			failure:function()
			{
				Ext.MessageBox.alert('错误提示','数据保存出错！！！');
			}
		});
	}
}


