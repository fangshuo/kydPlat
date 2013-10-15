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
        		columnWidth:1,
        		border: false,
        		layout:'form',
        		items:[{
            			id:'cydw_mc',
            			xtype: 'combo',
            			fieldLabel: '货物名称',
            			name: 'hwmc',
            			hiddenName: 'hwmc',
            			allowBlank: false,
            			
            			store: new Ext.data.Store({
            									// 
       										 proxy: new Ext.data.HttpProxy({url:'ComboboxAction!queryHwmcList.action'}),
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
           				readOnly: true
					}]
        	   },
       		  {
        	   	//defaults: {width: 200,allowBlank: false},
            	columnWidth:.5,
            	border: false,
            	layout:'form',
            	items:[{fieldLabel : '称毛重日期起'
        			   	,id : 'mzsjq'
        			   	,xtype:"datefield"
						,format:"Y-m-d"
						,width: 220
						,emptyText: '请选择日期 ...'
						,allowBlank:false
						,name : 'mzsjq'},
						{fieldLabel : '称皮重日期起'
        			   	,id : 'pzsjq'
        			   	,xtype:"datefield"
						,format:"Y-m-d"
						,width: 220
						,emptyText: '请选择日期 ...'
						,allowBlank:false
						,name : 'pzsjq'}]
       		  },
       		  		  {
        	   	//defaults: {width: 200,allowBlank: false},
            	columnWidth:.5,
            	border: false,
            	layout:'form',
            	items:[{fieldLabel : '称毛重日期止'
        			   	,id : 'mzsjz'
        			   	,xtype:"datefield"
						,format:"Y-m-d"
						,width: 220
						,emptyText: '请选择日期 ...'
						,allowBlank:false
						,name : 'mzsjz'},
						{fieldLabel : '称皮重日期止'
        			   	,id : 'pzsjz'
        			   	,xtype:"datefield"
						,format:"Y-m-d"
						,width: 220
						,emptyText: '请选择日期 ...'
						,allowBlank:false
						,name : 'pzsjz'}]
       		  }
       		  ]
	 });
	 

    Ext.getCmp('mzsjq').setValue(Ext.getDom('xtsj').value);
    Ext.getCmp('mzsjz').setValue(Ext.getDom('xtsj').value);
    Ext.getCmp('pzsjq').setValue(Ext.getDom('xtsj').value);
    Ext.getCmp('pzsjz').setValue(Ext.getDom('xtsj').value);
	 
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
			form.getForm().getEl().dom.action='yclCX!dcExcel.action'; 
			form.getForm().getEl().dom.submit(); },
        items: [
            tb,fieldset
        ]
    });
        
     var splbRecord = Ext.data.Record.create([
        {name: 'bdh' 		,mapping:'bdh'		,type: 'string'},
        {name: 'ch' 		,mapping:'ch'		,type: 'string'},
        {name: 'ysdw'       ,mapping:'ysdw'		,type: 'string'},
        {name: 'ghdw'       ,mapping:'ghdw'	    ,type: 'string'},
        {name: 'hwmc'		,mapping:'hwmc' 	,type: 'string'},
        {name: 'gg'		    ,mapping:'gg'       ,type: 'string'},
        {name: 'shdw'		,mapping:'shdw'     ,type: 'string'},
        {name: 'ywlb'		,mapping:'ywlb'     ,type: 'string'},
        {name: 'mz'		    ,mapping:'mz'       ,type: 'float'},
        {name: 'pz'		    ,mapping:'pz'       ,type: 'float'},
        {name: 'jz'		    ,mapping:'jz'       ,type: 'float'},
        {name: 'lk'		    ,mapping:'lk'       ,type: 'float'},
        {name: 'jxzl'		,mapping:'jxzl'     ,type: 'float'},
        {name: 'sby'		,mapping:'sby'      ,type: 'string'},
        {name: 'bz'		    ,mapping:'bz'       ,type: 'string'},
        {name: 'cpzsj'		,mapping:'cpzsj'    ,type: 'string'},
        {name: 'cmzsj'		,mapping:'cmzsj'    ,type: 'string'},
        {name: 'jld'		,mapping:'jld'      ,type: 'string'},
        {name: 'wcbj'		,mapping:'wcbj'     ,type: 'string'}
    ]);

    var store = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy
        					({url:'yclCX!queryData.action',
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
            //totalProperty: 'totalCount',
            root: 'yclList'
        },splbRecord)
        //remoteSort: true
    });
 
	var checkbox = new Ext.grid.CheckboxSelectionModel({id:'checkbox',handleMouseDown:Ext.emptyFn,width:30}); //CheckBox选择列 
    var columns = new Ext.grid.ColumnModel([  
    	//checkbox,
    	new Ext.grid.RowNumberer(), //行号列
	    {header: '磅单号'    ,
       	 	dataIndex: 'bdh'   
       	 	,sortable :true
        },{header: '车号',
	        dataIndex: 'ch'
	        ,sortable :true
        },
        
        {header: '运输单位' 	,
        	dataIndex: 'ysdw'
        	,sortable :true
        },
        {header: '供货单位'   ,
        	dataIndex: 'ghdw'
        	,sortable :true
        	
        },
        {header: '货物名称',
        	dataIndex: 'hwmc'
        	,sortable :true
        },
        {header: '规格',
        	dataIndex: 'gg'
        	,sortable :true
        },
        {header: '收货单位',
        	dataIndex: 'shdw'
        	,sortable :true
        },
        {header: '业务类别',
        	dataIndex: 'ywlb'
        	,sortable :true
        },
        {header: '毛重',
        	dataIndex: 'mz'
        	,sortable :true
        },
        {header: '皮重',
        	dataIndex: 'pz'
        	,sortable :true
        },
        {header: '净重',
        	dataIndex: 'jz'
        	,sortable :true
        },
        {header: '另扣',
        	dataIndex: 'lk'
        	,sortable :true
        },
        {header: '结算重量',
        	dataIndex: 'jszl'
        	,sortable :true
        },
        {header: '司磅员',
        	dataIndex: 'sby'
        	,sortable :true
        },
        {header: '备注',
        	dataIndex: 'bz'
        	,sortable :true
        },
        {header: '称皮重时间',
        	dataIndex: 'cpzsj'
        	,sortable :true
        },
        {header: '称毛重时间',
        	dataIndex: 'cmzsj'
        	,sortable :true
        }
        ,
        {header: '计量点',
        	dataIndex: 'jld'
        	,sortable :true
        }
        ,
        {header: '完成标记',
        	dataIndex: 'wcbj'
        	,sortable :true
        }
    ]);
    //columns.defaultSortable = true;

    // grid start  GridPanel
    var grid = new Ext.grid.EditorGridPanel({
    	id:'grid',
        anchor:'81%',
        loadMask: true,
        height:350,
        store: store,
        cm: columns,
        sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
        //sm: checkbox,
        // 自动计算表格每列的宽度
//        viewConfig: {
//            forceFit: true
//        },
        autoScroll:true
        //autoWidth : true
      
//        bbar: new Ext.PagingToolbar({
//            pageSize: 10,
//            store: store,
//            displayInfo: true,
//			displayMsg: '显示第 {0} 条到 {1} 条记录，一共 {2} 条', 
//			emptyMsg: "没有记录" 
//        })
    });
    
       
 	// 初始化添加参数
	  store.on('beforeload', function() {

      Ext.apply(this.baseParams, {
         mzsjq : Ext.getCmp('mzsjq').getValue().format('Y-m-d'),
         mzsjz : Ext.getCmp('mzsjz').getValue().format('Y-m-d'),
         pzsjq : Ext.getCmp('pzsjq').getValue().format('Y-m-d'),
         pzsjz : Ext.getCmp('pzsjz').getValue().format('Y-m-d'),
         hwmc  : Ext.get('hwmc').dom.value
        });
     });
     

       /**
        * 
        */
       var fieldset2 = new Ext.form.FieldSet({
		title:'原材料报表查询',
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