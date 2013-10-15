Ext.onReady(function() {
 Ext.QuickTips.init();

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
									form.getForm().reset();
								},
								scope : this
							}]
				});	
 
//转出销售单
    var record1 = Ext.data.Record.create([
       
        {name: 'jhdh', type: 'string'},
        {name: 'sl', type: 'string'},
        {name: 'jc', type: 'string'}
    ]);
    
        var store1 = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy
        					({url:'xsdzc!findZcList.action',
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
            root: 'zcList'
        },record1)
        //remoteSort: true
    });

//    var store1 = new Ext.data.Store({
//        proxy: new Ext.data.HttpProxy({url:'xsdzcManager!findZcList.action'}),
//        reader: new Ext.data.JsonReader({
//            totalProperty: 'totalCount',
//            root: 'zcList'
//        },record1),
//       // remoteSort: false
//    });
 
   

    var columns1 = new Ext.grid.ColumnModel([     
        {header: '转出销售单', dataIndex: 'jhdh',sortable:true},
        {header: '计划量（吨）', dataIndex: 'sl',sortable:true},
        {header: '截存量（吨）', dataIndex: 'jc',sortable:true}
    ]);
    columns1.defaultSortable = true;

    // grid start
    var grid1 = new Ext.grid.GridPanel({
    	id:'grid1',
        title: '转出单号列表',
        region: 'center',
        loadMask: true,
        store: store1,
        cm: columns1,
        sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
        bbar: new Ext.PagingToolbar({
            pageSize: 50,
            store: store1,
            displayInfo: true,
			displayMsg: '显示第 {0} 条到 {1} 条记录，一共 {2} 条', 
			emptyMsg: "没有记录" 
        })
        });
    
     //  store.load({params:{start:0,limit:50}});
    // grid end
      
     store1.on('beforeload', function() {
        Ext.apply(this.baseParams,
        {     
        zkhbm : Ext.get('zkhmc').dom.value     
        }
        )
    });
    
    
//    
//    
//    
//    // 转入销售单
//    
//    var record2 = Ext.data.Record.create([
//       
//        {name: 'xsd2', type: 'string'},
//        {name: 'jhl2', type: 'string'},
//        {name: 'jcl2', type: 'string'}
//    ]);
//
//    var store2 = new Ext.data.Store({
//        proxy: new Ext.data.HttpProxy({url:'xsdzc!findZrList.action'}),
//        reader: new Ext.data.JsonReader({
//            totalProperty: 'totalCount2',
//            root: 'zrList'
//        },record2),
//        remoteSort: false
//    });
// 
//   
//
//    var columns2 = new Ext.grid.ColumnModel([     
//        {header: '转入销售单', dataIndex: 'xsd1',sortable:true},
//        {header: '计划量（吨）', dataIndex: 'jhl1',sortable:true},
//        {header: '截存量（吨）', dataIndex: 'jcl1',sortable:true}
//    ]);
//    columns2.defaultSortable = true;
//
//    // grid start
//    var grid2 = new Ext.grid.GridPanel({
//    	id:'grid2',
//        title: '转入单号列表',
//        region: 'center',
//        loadMask: true,
//        store: store2,
//        cm: columns2,
//        sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
//        bbar: new Ext.PagingToolbar({
//            pageSize: 50,
//            store: store2,
//            displayInfo: true,
//			displayMsg: '显示第 {0} 条到 {1} 条记录，一共 {2} 条', 
//			emptyMsg: "没有记录" 
//        })
//    });
//    
//     //  store.load({params:{start:0,limit:50}});
//    // grid end
//      
//     store2.on('beforeload', function() {
//        Ext.apply(this.baseParams,
//        {     
//			zkhbm : Ext.get('zkhmc').dom.value     
//        }
//        )
//    });

 var viewport = new Ext.Viewport({
            layout:'column',
            renderTo: 'head',
            items:[{
                region:'center',
                margins:'35 5 5 0',
                layout:'column',
                autoScroll:true,
                items:[{
                    columnWidth:1,
                    baseCls:'x-plain',
                    bodyStyle:'padding:5px 0 5px 5px',
                    items:[tb]
                },{
                    columnWidth:1,
                    baseCls:'x-plain',
                    layout:'form',
                    bodyStyle:'padding:5px 0 5px 5px',
                    items:[{id:'zkhmcCombo',
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
           				readOnly: true}]
                },{
                    columnWidth:.5,
                    baseCls:'x-plain',
                    bodyStyle:'padding:5px 0 5px 5px',
                    items:[grid1]
                }
//                ,{
//                    columnWidth:.5, 
//                    baseCls:'x-plain',
//                    bodyStyle:'padding:5px 0 5px 5px',
//                    items:[grid2]
//                }
                ]
            }]
        });
});


/**
 * 根据条件查询数据
 */
function queryData()
{	
		Ext.getCmp('grid1').getStore().reload({callback: function(records, options, success)
			{
				if(0 == Ext.getCmp('grid1').getStore().getCount())
				{
					Ext.MessageBox.alert('消息','没有您要查询的信息！！！');
				}
			}
		});
		
//		Ext.getCmp('grid2').getStore().reload({callback: function(records, options, success)
//			{
//				if(0 == Ext.getCmp('grid2').getStore().getCount())
//				{
//					Ext.MessageBox.alert('消息','没有您要查询的信息！！！');
//				}
//			}
//		});	
}
