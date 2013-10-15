Ext.onReady(function() {
 Ext.QuickTips.init();

 

    var StudentRecord = Ext.data.Record.create([
       
        {name: 'bm', type: 'string'},
        {name: 'mc', type: 'string'},
        {name: 'pym', type: 'string'},
        {name: 'fr', type: 'string'},
        {name: 'dz', type: 'string'},
        {name: 'gddh', type: 'string'},
        {name: 'yddh', type: 'string'},
        {name: 'yf', type: 'string'},
        {name: 'bz', type: 'string'},
        {name: 'xybj' 		,mapping:'xybj'			,type: 'string'}
    ]);

    var store = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({url:'cydwManager!findBy.action'}),
        reader: new Ext.data.JsonReader({
            totalProperty: 'totalCount',
            root: 'cydws'
        },StudentRecord),
        remoteSort: false
    });
 
   

    var columns = new Ext.grid.ColumnModel([     
        {header: '编码', dataIndex: 'bm',sortable:true},
        {header: '名称', dataIndex: 'mc',sortable:true},
        {header: '拼音码', dataIndex: 'pym',sortable:true,hidden:true},
        {header: '法人', dataIndex: 'fr',sortable:true},
        {header: '地址', dataIndex: 'dz',sortable:true},
        {header: '固定电话', dataIndex: 'gddh',sortable:true},
        {header: '移动电话', dataIndex: 'yddh',sortable:true},
        {header: '载重量', dataIndex: 'yf',sortable:true},
        {header: '备注', dataIndex: 'bz',sortable:true},
        {header: '选用标记', dataIndex: 'xybj',sortable:true,renderer:renderXybj}
    ]);
    columns.defaultSortable = true;

    // grid start
    var grid = new Ext.grid.GridPanel({
        title: '承运单位信息列表',
        region: 'center',
        loadMask: true,
        store: store,
        cm: columns,
        sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
        viewConfig: {
            forceFit: true
        },
        bbar: new Ext.PagingToolbar({
            pageSize: 50,
            store: store,
            displayInfo: true,
			displayMsg: '显示第 {0} 条到 {1} 条记录，一共 {2} 条', 
			emptyMsg: "没有记录" 
        })
    });
    
       store.load({params:{start:0,limit:50}});
    // grid end
    
    
    
    
    
    
    
    
    
    
    

    // form start
    var form = new Ext.form.FormPanel({
        title: '编辑承运单位信息',
        region: 'east',
        frame: true,
        width: 300,
        autoHeight: true,
        labelAlign: 'right',
        labelWidth: 60,
        defaultType: 'textfield',
        defaults: {
            width: 200,
            allowBlank: false
        },
        items: [{
            xtype: 'hidden',
            id:'action',
            name: 'action'
        },{
            xtype: 'hidden',
            name: 'bm'
        },{
            fieldLabel: '承运单位',
            allowBlank: false,maxLength: 200,
            id:'mc',
            name: 'mc'
        }
        ,{
            fieldLabel: '拼音码',
            id:'pym',
            name: 'pym',
            readOnly : true
        },{
            fieldLabel: '法人',
            maxLength: 20,
            id:'fr',
            name: 'fr',
            allowBlank: true
        },{
            fieldLabel: '地址',
            maxLength: 200,
            name: 'dz',
            allowBlank: true
        },{
            fieldLabel: '固定电话',
            maxLength: 20,
            name: 'gddh',
            allowBlank: true
        },{
            fieldLabel: '移动电话',
            maxLength: 20,
            name: 'yddh',
            allowBlank: true
        },{
            fieldLabel: '载重量',
            xtype:"numberfield",
	        			allowNegative:false,//不能输入负数
	        			allowDecimals:true,//不能输入小数点
	        			decimalPrecision:2,//保留小数点后4位，默认两位
	        			//minValue:0,//输入范围
	        			//maxValue:1,//输入范围
	        			maskRe:/\d/,
	        			regexText:"该输入项必须是数字",maxLength:15,
            name: 'yf',
            allowBlank: false
        },{
            fieldLabel: '备注',
            maxLength: 500,
            name: 'bz',
            allowBlank: true
        },{
            fieldLabel: '选用标记',
            name: 'xybjText',
            hiddenName: 'xybj',
            xtype: 'combo',
            store: new Ext.data.SimpleStore({
                fields: ['value','text'],
                data: [['1','选用'],['0','不选用']]
               }),
            emptyText: '请选择',
            mode: 'local',
            triggerAction: 'all',
            valueField: 'value',
            displayField: 'text',
            readOnly: true,
            allowBlank: false,   
		    blankText: "该输入项不能为空" 
        }],
        buttons: [{
            text: '添加',
            handler: function() {
                  form.getForm().findField('action').setValue("add");
                    
                if (!form.getForm().isValid()) {
                    return;
                }
                if (form.buttons[0].getText() == "添加") {
                    // 添加
                    form.getForm().submit({                   
                        url: 'cydwManager!saveCydw.action',
                        success: function() { 
                                               
                                Ext.Msg.alert('消息','添加成功', function() {
                                    grid.getStore().reload();
                                    form.getForm().reset();
                                    form.buttons[0].setText('添加');
                                });
                            
                        },
                        failure: function() {
                            Ext.Msg.alert('错误', "添加失败");
                        }
                    });
                } else {
                    // 修改
                    form.getForm().submit({
                        url: 'cydwManager!updateCydw.action',
                        success: function() {
                         
                                Ext.Msg.alert('消息', '修改成功', function() {
                                    grid.getStore().reload();
                                    form.getForm().reset();
                                    form.buttons[0].setText('添加');
                                });
                            
                        },
                        failure: function() {
                            Ext.Msg.alert('错误', "修改失败");
                        }
                    });
                }
            }
        },{
            text: '清空',
            handler: function() {
                form.getForm().reset();
                form.buttons[0].setText('添加');
            }
        },
//        	{
//            text: '删除',
//            handler: function() {
//            form.getForm().findField('action').setValue("del");
//                               var id = form.getForm().findField('bm').getValue();
//                if (id == '') {
//                    Ext.Msg.alert('提示', '请选择需要删除的信息。');
//                } else {
//                     form.getForm().submit({
//                        url: 'cydwManager!deleteCydw.action',
//                        success: function() {                       
//                                Ext.Msg.alert('提示信息','删除成功');
//                                 grid.getStore().reload();
//                                 form.getForm().reset();
//                            
//                        },
//                        failure: function() {
//                            Ext.Msg.alert('错误', "删除失败");
//                        }
//                    });
//                }
//            }
//        },
        	{
            text: '查询',
            handler: function() {
                                 form.getForm().findField('action').setValue("");
                                 //grid.getStore().proxy.conn.url='cydwManager!findBy.action'; 
                                 grid.getStore().reload();
                                 form.getForm().reset();;
               
            }
        }]
        
        
    });
    
    
    			//单位名称添加触发拼音码事件
      Ext.getCmp('mc').on('blur', function(){
                Ext.getCmp('pym').setValue(myConvertToUpper(Ext.getCmp('mc').getValue()));
       });
    // form end

    // 单击修改信息 start
    grid.on('rowclick', function(grid, rowIndex, event) {
        var record = grid.getStore().getAt(rowIndex);
        form.getForm().loadRecord(record);
        form.buttons[0].setText('修改');
    });
         
     grid.on('rowdblclick', function(grid, rowIndex, event) {
        var record = grid.getStore().getAt(rowIndex);
        form.getForm().loadRecord(record);
        form.buttons[0].setText('修改');
    });
   
     store.on('beforeload', function() {
     if(Ext.getCmp('action').getValue() == ""){
        Ext.apply(this.baseParams,
        {     
        mc:Ext.getCmp('mc').getValue(),    
        fr:Ext.getCmp('fr').getValue()       
        }
        )
        }
    });
    // 单击修改信息 end

    // layout start
    var viewport = new Ext.Viewport({
        layout: 'border',
        items: [{
            region: 'north',
            contentEl: 'head'
        }, grid, form]
    });
});

function renderXybj(value) 
{
  	if (value == '0') {
		return "<span style='color:red;font-weight:bold;'>不选用</span>";
	} else {
    	return "<span style='color:green;font-weight:bold;'>选用</span>";
    }
}

