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
							},
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
        		defaults: {width: 200,allowBlank: false},
        		columnWidth:.5,
        		border: false,
        		layout:'form',
        		items:[{
            			id:'cydw_mc',
            			xtype: 'combo',
            			fieldLabel: '承运单位',
            			name: 'cydw_mc',
            			hiddenName: 'cydw',
            			allowBlank: false,
            			
            			store: new Ext.data.Store({
            									// 
       										 proxy: new Ext.data.HttpProxy({url:'ComboboxAction!queryComboxList.action'}),
        									 reader: new Ext.data.JsonReader({
        									  root:'combobox',
        		   							fields:['value','text']}), 
        								remoteSort: true  }) ,
            			//emptyText: '请选择',  
            			mode: 'remote',
            			triggerAction: 'all',
            			width:220,
            			valueField: 'value',
            			displayField: 'text',
           				readOnly: false
					},{fieldLabel : '发货日期起'
        				,id : 'fhsjq'
        				,xtype:"datefield"
						,format:"Ymd"
						,width: 220
						,emptyText: '请选择日期 ...'
						,allowBlank:false
						,name : 'fhsjq'
						},
						{
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
            			displayField: 'text',
           				readOnly: false}
						]
        	   },
       		  {
        	   	//defaults: {width: 200,allowBlank: false},
            	columnWidth:.5,
            	border: false,
            	layout:'form',
            	items:[{
            			id:'cych',
						xtype:"textfield",
						fieldLabel:"承运车号",
						width:220,
						name:'cych'
					},{fieldLabel : '发货日期止'
        			   	,id : 'fhsjz'
        			   	,xtype:"datefield"
						,format:"Ymd"
						,width: 220
						,emptyText: '请选择日期 ...'
						,allowBlank:false
						,name : 'fhsjz'},
						{
						id : 'zkhmcCombo2',
						xtype : 'combo',
						fieldLabel : '子客户名称',
						name : 'zkhmcText2',
						hiddenName : 'zkhmc2',
						allowBlank : true,
						width : 220,

						store : new Ext.data.Store({
							// 
							proxy : new Ext.data.HttpProxy({
										url : 'ComboboxAction!queryZkhdm.action'
									}),
							reader : new Ext.data.JsonReader({
										root : 'combobox',
										fields : ['value', 'text']
									}),
							remoteSort : true
						}),
						emptyText : '请选择...',
						mode : 'remote',
						triggerAction : 'all',
						valueField : 'value',
						displayField : 'text'
					}]
       		  }
//       		  		  {
//        	   	//defaults: {width: 200,allowBlank: false},
//            	columnWidth:.5,
//            	border: false,
//            	layout:'form',
//            	items:[{
//            			id:'zkhmcCombo',
//            			xtype: 'combo',
//            			fieldLabel: '客户名称',
//            			name: 'zkhmcText',
//            			hiddenName: 'zkhmc',
//            			allowBlank: true,
//            			width: 220,
//            			
//            			store: new Ext.data.Store({
//            									// 
//       										 proxy: new Ext.data.HttpProxy({url:'ComboboxAction!queryKhxx.action'}),
//        									 reader: new Ext.data.JsonReader({
//        									  root:'combobox',
//        		   							fields:['value','text']}), 
//        								remoteSort: true  }) ,
//            			emptyText: '请选择...',  
//            			mode: 'remote',
//            			triggerAction: 'all',
//            			valueField: 'value',
//            			displayField: 'text',
//           				readOnly: false}]
//       		  }
       		  ]
	 });
	 
	 	// 客户编码
	var khbm = "";
	Ext.getCmp('zkhmcCombo').on('select', getZKH);

	function getZKH() {
		Ext.getCmp('zkhmcCombo2').setValue(""); // 子客户下拉框制空
		// 清空子客户的内容
		// zkhCombo.getStore().removeAll();
		khbm = Ext.getCmp('zkhmcCombo').getValue();

		Ext.getCmp('zkhmcCombo2').getStore().reload({
					callback : function(records, options, success) {
						/*
						 * if(0 == zkhCombo.getStore().getCount()) {
						 * Ext.MessageBox.alert('消息!!!','没有对应的子客户信息，请重新选择！！！'); }
						 * else{ var firstValue =
						 * zkhCombo.getStore().getRange()[0].data.value;//这种方法可以获得第一项的值
						 * zkhCombo.setValue(firstValue);//选中 }
						 */
					}
				});
	}
	
	
		  	 	var pymCYDW ="";      
       
        Ext.getCmp('cydw_mc').on('beforequery',function(e){     
       		 if(!e.forceAll){   
            		pymCYDW = e.query;  
            		if (!pymCYDW == "")
            		{Ext.getCmp('cydw_mc').getStore().reload({callback: function(records, options, success)
									{
									if( Ext.getCmp('cydw_mc').getStore().getCount()>0 && (!pymCYDW == ""))
										{
											var firstValue = Ext.getCmp('cydw_mc').getStore().getRange()[1].data.value;//这种方法可以获得第一项的值 
											 Ext.getCmp('cydw_mc').setValue(firstValue);//选中    	
											 							
										}
									}
		});
        }}   
         });  
      
      var cydwpym ="";     
   	  Ext.getCmp('cydw_mc').getStore().on('beforeload', function() {
      Ext.apply(this.baseParams, {
         cydwpym : pymCYDW
        });
       }); 

	 	var pymValue ="";      
       
        Ext.getCmp('zkhmcCombo').on('beforequery',function(e){     
       		 if(!e.forceAll){   
            		pymValue = e.query;  
            		if (!pymValue == "")
            		{Ext.getCmp('zkhmcCombo').getStore().reload({callback: function(records, options, success)
									{
									if( Ext.getCmp('zkhmcCombo').getStore().getCount()>0 && (!pymValue == ""))
										{
											var firstValue = Ext.getCmp('zkhmcCombo').getStore().getRange()[1].data.value;//这种方法可以获得第一项的值 
											 Ext.getCmp('zkhmcCombo').setValue(firstValue);//选中    	
											 							
										}
									}
		});
        }}   
         });  
      
      var pym ="";     
   	  Ext.getCmp('zkhmcCombo').getStore().on('beforeload', function() {
      Ext.apply(this.baseParams, {
         pym : pymValue
        });
       }); 
       
    var pymValue2 ="";      
       
        Ext.getCmp('zkhmcCombo2').on('beforequery',function(e){     
       		 if(!e.forceAll){   
            		pymValue2 = e.query;   
            		//if (!pymValue == "")
            		Ext.getCmp('zkhmcCombo2').getStore().reload({callback: function(records, options, success)
									{
//									if( Ext.getCmp('zkhCombo').getStore().getCount()>0 && (!pymValue2 == ""))
//										{
//											var firstValue = Ext.getCmp('zkhCombo').getStore().getRange()[1].data.value;//这种方法可以获得第一项的值 
//											 Ext.getCmp('zkhCombo').setValue(firstValue);//选中    	
//											 Ext.getCmp('zkhCombo').foucs();								
//										}
									
										 Ext.getCmp('zkhmcCombo2').focus();	
									}
		});
        }  
        //}
         }); 
    
          var zkhpym ="";     
   	  Ext.getCmp('zkhmcCombo2').getStore().on('beforeload', function() {
      Ext.apply(this.baseParams, {
         zkhpym : pymValue2
        });
       });			

	Ext.getCmp('zkhmcCombo2').getStore().on('beforeload', function() {
				if ("" == khbm) {
					Ext.MessageBox.alert('消息!!!', '请先选择客户名称！！！');
					return false;
				} else {
					Ext.apply(this.baseParams, {
								khbm : khbm
							});
				}
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
			form.getForm().getEl().dom.action='clysJlQuery2!dcExcel.action'; 
			form.getForm().getEl().dom.submit(); },
        items: [
            tb,fieldset
        ]
    });
        
     var splbRecord = Ext.data.Record.create([
        {name: 'cych' 		,mapping:'cych'		,type: 'string'},
        {name: 'fhsj' 		,mapping:'fhsj'		,type: 'string'},
        {name: 'cydw'         ,mapping:'cydw'		,type: 'string'},
        {name: 'khmc'      ,mapping:'khmc'	,type: 'string'},
        {name: 'zkhmc'		,mapping:'zkhmc' 	,type: 'string'},
        {name: 'dh'		    ,mapping:'dh' 	,type: 'string'},        
        {name: 'pzggmc'		,mapping:'pzggmc'     ,type: 'string'},
        {name: 'fhsl'		,mapping:'fhsl'     ,type: 'float'},
        {name: 'sfzl'		,mapping:'sfzl'     ,type: 'float'},
        {name: 'yfdj'		,mapping:'yfdj'     ,type: 'float'},
        {name: 'je'		    ,mapping:'je'     ,type: 'float'}
    ]);

    var store = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy
        					({url:'clysJlQuery2!queryData.action',
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
    	//checkbox,
    	new Ext.grid.RowNumberer(), //行号列
	    {header: '承运车号'    ,
       	 	dataIndex: 'cych'   
       	 	,sortable :true
        },{header: '发货时间',
	        dataIndex: 'fhsj'
	        ,sortable :true
        },
        
        {header: '承运单位' 	,
        	dataIndex: 'cydw'
        	,sortable :true
        },
        {header: '客户名称'   ,
        	dataIndex: 'khmc'
        	,sortable :true
        	
        },
        {header: '子客户名称',
        	dataIndex: 'zkhmc'
        	,sortable :true
        },
        {header: '(提)发货单号',
        	dataIndex: 'dh'
        	,sortable :true
        },        
        {header: '品种规格',
        	dataIndex: 'pzggmc'
        	,sortable :true
        },
        {header: '发货数量（吨）',
        	dataIndex: 'fhsl'
        	,sortable :true
        },
        {header: '实发重量（吨）',
        	dataIndex: 'sfzl'
        	,sortable :true
        }
        /*,
        {header: '运费单价(元)',
        	dataIndex: 'yfdj'
        	,sortable :true
        },
        {header: '金额(元)',
        	dataIndex: 'je'
        	,sortable :true
        }*/
    ]);
    //columns.defaultSortable = true;

    // grid start  GridPanel
    var grid = new Ext.grid.EditorGridPanel({
    	id:'grid',
        anchor:'99%',
        loadMask: true,
        height:380,
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
         fhsjq : Ext.getCmp('fhsjq').getValue().format('Ymd'),
         fhsjz : Ext.getCmp('fhsjz').getValue().format('Ymd'),
         cydw  : Ext.get('cydw').dom.value,
         cych : Ext.getCmp('cych').getValue(),
         zkhmc : Ext.get('zkhmc').dom.value,
         zkhmc2 : Ext.get("zkhmc2").dom.value
        });
     });
     

       /**
        * 
        */
       var fieldset2 = new Ext.form.FieldSet({
		title:'车辆运输记录信息',
		region: 'center',
		autoHeight:true, 
		height:350,
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