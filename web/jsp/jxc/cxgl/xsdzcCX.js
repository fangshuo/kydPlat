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
								text : "导出",
								iconCls : "excel",
								id : "excel",
								handler : function() {
									dcExcel();
								},
								scope : this
							}]
				});	
	
				
	/**
	 * 查询条件fieldset框
	 */			
	var fieldset = new Ext.form.FieldSet({
		title:'查询条件',
		height:.2,
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
            			displayField: 'text'}]
       		  }]
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
    	submit: function() {   
			form.getForm().getEl().dom.target='_blank',
			form.getForm().getEl().dom.action='xsdzcCXQuery!dcExcel.action'; 
			form.getForm().getEl().dom.submit(); 
   		 }, 
        items: [
            tb,fieldset
        ]
    });
        
     var splbRecord = Ext.data.Record.create([
        {name: 'khmc'       ,mapping:'khmc'		,type: 'string'},
        {name: 'zkhmc'      ,mapping:'zkhmc'	,type: 'string'},
        {name: 'spmc'		,mapping:'spmc' 	,type: 'string'},
        {name: 'zcdh'		,mapping:'zcdh'       ,type: 'string'},
        {name: 'zcsl'		,mapping:'zcsl'       ,type: 'float'},
        {name: 'zrdh'		,mapping:'zrdh'        ,type: 'string'},
        {name: 'zrsl'	    ,mapping:'zrsl'       ,type: 'float'},
        {name: 'jzrq'	    ,mapping:'jzrq'       ,type: 'string'}
    ]);

    var store = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy
        					({url:'xsdzcCXQuery!queryData.action',
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
            root: 'xsjlList'
        },splbRecord)
       // remoteSort: true
    });
 
	var checkbox = new Ext.grid.CheckboxSelectionModel({id:'checkbox',handleMouseDown:Ext.emptyFn,width:30}); //CheckBox选择列 
    var columns = new Ext.grid.ColumnModel([  
    	//checkbox,
    	new Ext.grid.RowNumberer(), //行号列
        {header: '客户名称' 	,
        	dataIndex: 'khmc'
        	,sortable :true
        
        },
        {header: '子客户名称'   ,
        	dataIndex: 'zkhmc'
        	,sortable :true
        },
        {header: '品种规格',
        	dataIndex: 'spmc'
        	,sortable :true
        },
        {header: '转出单号',
        
        	dataIndex: 'zcdh'
        	,sortable :true
        },
        {header: '转出数量（吨）',
        	dataIndex: 'zcsl'
        	,sortable :true
        },
        {header: '转入单号',
        	dataIndex: 'zrdh'
        	,sortable :true
        }
        ,
        {header: '转入数量（吨）',
        	dataIndex: 'zrsl'
        	,sortable :true
        }
        ,
         {header: '结转时间',
        	dataIndex: 'jzrq'
        	,sortable :true
        }
        
        
    ]);
    //columns.defaultSortable = true;

    // grid start  GridPanel
    var grid = new Ext.grid.EditorGridPanel({
    	id:'grid',
        anchor:'99%',
        loadMask: true,
        height:350,
        store: store,
        cm: columns,
        //每次只能选择一行new Ext.grid.RowSelectionModel({singleSelect:true}),，如果sm：checkbox 则可以多选
        sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
        //sm: checkbox,
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
         zkhmc : Ext.get('zkhmc').dom.value
        });
     });
     

       /**
        * 
        */
       var fieldset2 = new Ext.form.FieldSet({
		title:'结转记录信息',
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
	}
}

/**
 * 导出Excl*/
 
function dcExcel()
{
	if(Ext.getCmp('grid').getStore().getTotalCount() == 0){
			Ext.MessageBox.alert("提醒","查询数据后才可导出！");
			return;
	}else
	{
		 Ext.getCmp('form').submit();
	}
}