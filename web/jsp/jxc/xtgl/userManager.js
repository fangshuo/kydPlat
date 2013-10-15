Ext.onReady(function() {
	//初始化信息提示功能
	Ext.QuickTips.init();
	//统一指定错误信息提示浮动显示方式
	Ext.form.Field.prototype.msgTarget = 'side';

		/**
	 * 工具栏
	 */
	var tb = new Ext.Toolbar({
					width: '100%',
					items : ['<span style="color:#336666;font-weight:bold;">用户信息列表</span>',
							{
								xtype: 'tbfill',//用来 将其后的组件推到工具栏的最右侧
								text :'最后侧'
							},{ 
							     xtype: 'tbbutton', // 
							     icon: 'pic/zoommenu.gif', 
								 text: ' ',
								 //
								 handler:function(){
									queryData();
								 }
							},{
								xtype: 'spacer',//分隔元素的空白
								width: '10'
							},{ 
								xtype: 'textfield',//编辑文本框 
								id: 'uid',
								name: 'uid', 
								emptyText: '请输入用户ID'
							}]
				});	
       var sexRenderer = function(value) {
        if (value == 1) {
            return '<span style="color:red;font-weight:bold;">男</span>';
        } else if (value == 2) {
            return '<span style="color:green;font-weight:bold;">女</span>';
        }
    };

    var StudentRecord = Ext.data.Record.create([
    	{name: 'pid', type: 'string'},
        {name: 'user_id', type: 'string'},
        {name: 'user', type: 'string'},
        {name: 'sex', type: 'int'},
        {name: 'email', type: 'string'}
    ]);

    var store = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({url:'userManager.action'}),
        reader: new Ext.data.JsonReader({
            totalProperty: 'totalCount',
            root: 'users'
        },StudentRecord),
        remoteSort: false
    });
 
   

    var columns = new Ext.grid.ColumnModel([  
    	new Ext.grid.RowNumberer(), //行号列
    	{header: '编号', dataIndex: 'pid',sortable:true,hidden:true},  
        {header: '工号', dataIndex: 'user_id',sortable:true},
        {header: '姓名', dataIndex: 'user',sortable:true},
        {header: '性别', dataIndex: 'sex', renderer: sexRenderer,sortable:true},
        {header: '邮箱', dataIndex: 'email',sortable:true}
    ]);
    columns.defaultSortable = true;

    // grid start
    var grid = new Ext.grid.GridPanel({
    	id:'grid',
        region: 'center',
        loadMask: true,
        store: store,
        cm: columns,
        sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
        viewConfig: {
            forceFit: true
        },
        tbar: tb,
        bbar: new Ext.PagingToolbar({
            pageSize: 20,
            store: store,
            displayInfo: true
        })
    });
    
    	 //参数传递
    store.on('beforeload', function() {
      	Ext.apply(this.baseParams,{
      		uid : Ext.getCmp('uid').getValue()
        });
     });
       store.load({params:{start:0,limit:20}});
    // grid end
    
    
    
    
    
    
    
    
    
    
    

    // form start
    var form = new Ext.form.FormPanel({
        title: '编辑用户信息',
        id: 'form',
        region: 'east',
        frame: true,
        width: 300,
        autoHeight: true,
        labelAlign: 'right',
        labelWidth: 60,
        defaultType: 'textfield',
        defaults: {
            width: 200
            //allowBlank: false
        },
        items: [{
            fieldLabel: '编号',
            xtype: 'hidden',
            name: 'pid'
        },{
            fieldLabel: '工号',
            name: 'user_id',
            allowBlank: false,   
		    blankText: "该输入项不能为空" ,
		    maxLength: 20,
            maxLengthText:'数字长度不能大于20位'
        },{
            fieldLabel: '姓名',
            name: 'user',
            allowBlank: false,   
		    blankText: "该输入项不能为空" ,
            maxLength: 80,
            maxLengthText:'数字长度不能大于80位'
        },{
            fieldLabel: '性别',
            name: 'sexText',
            hiddenName: 'sex',
            xtype: 'combo',
            store: new Ext.data.SimpleStore({
                fields: ['value','text'],
                data: [['1','男'],['2','女']]
            }),
            emptyText: '请选择',
            mode: 'local',
            triggerAction: 'all',
            valueField: 'value',
            displayField: 'text',
            readOnly: true,
            allowBlank: false,   
		    blankText: "该输入项不能为空" 
        },{
            fieldLabel: '邮箱',
            vtype:"email",
            name: 'email'
        }],
        buttons: [{
            text: '添加',
            handler: function() {
                if (!form.getForm().isValid()) {
                    return;
                }
                if (form.buttons[0].getText() == "添加") {
                    // 添加
                    form.getForm().submit({
                        url: 'userManager!saveUser.action',
                         success:function(form,action)
							{
								grid.getStore().reload();
                                form.reset();
                                //form.buttons[0].setText('添加');
								Ext.MessageBox.alert('信息提示',action.result.msg);
							},
                       // success: function() {
                          
                               // Ext.Msg.alert('消息提示','添加成功！', function() {
                                  //  grid.getStore().reload();
                                 //   form.getForm().reset();
                                   // form.buttons[0].setText('添加');
                                //});
                            
                        //},
                        failure: function() {
                            Ext.Msg.alert('错误提示', "添加失败！！！");
                        }
                    });
                } else {
                    // 修改
                    form.getForm().submit({
                        url: 'userManager!updateUser.action',
                        success: function() {
                         
                                Ext.Msg.alert('信息提示', '修改成功！！！', function() {
                                    grid.getStore().reload();
                                    form.getForm().reset();
                                    form.buttons[0].setText('添加');
                                });
                            
                        },
                        failure: function() {
                            Ext.Msg.alert('错误提示', "修改失败！！！");
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
        },{
            text: '删除',
            handler: function() {
                var id = form.getForm().findField('user_id').getValue();
                if (id == '') {
                    Ext.Msg.alert('信息提示', '请选择需要删除的信息！！！');
                } else {
                     form.getForm().submit({
                        url: 'userManager!deleteUser.action',
                        success: function() {                       
                                Ext.Msg.alert('信息提示','删除成功！！！');
                                 grid.getStore().reload();
                                 form.getForm().reset();
                            
                        },
                        failure: function() {
                            Ext.Msg.alert('错误提示', "删除失败！！！");
                        }
                    });
                }
            }
        }]
    });
    // form end

    // 单击修改信息 start
    grid.on('rowclick', function(grid, rowIndex, event) {
        var record = grid.getStore().getAt(rowIndex);
        
        form.getForm().loadRecord(record);
        form.buttons[0].setText('修改');
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



    	//查询数据信息
	function queryData(){

		
			Ext.getCmp('grid').getStore().reload({callback: function(records, options, success)
				{
					if(0 == Ext.getCmp('grid').getStore().getCount())
					{
						Ext.MessageBox.alert('信息提示','没有您要查询的信息！！！');
					}
				}
			});
	
	
	}





