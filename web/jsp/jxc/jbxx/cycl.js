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
								text : "添加",
								iconCls : "add",
								id : "add",
								handler : function() {
									addData();
								},
								scope : this
							},'-',
							{
								text : "修改",
								iconCls : "edit",
								id : "edit",
								handler : function() {
									this.editData();
								},
								scope : this
							},'-',
							{
								text : "删除",
								iconCls : "delete",
								id : "delete",
								handler : function() {
									delData();										
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
		layout: 'column',//从左往右布局
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
            			hiddenName: 'cydw_bm',
            			allowBlank: false,
            			
            			store: new Ext.data.Store({
            									// 
       										 proxy: new Ext.data.HttpProxy({url:'ComboboxAction!getComboxList.action'}),
        									 reader: new Ext.data.JsonReader({
        									  root:'combobox',
        		   							fields:['value','text']}), 
        								remoteSort: true  }) ,
            			emptyText: '请选择',  
            			mode: 'remote',
            			triggerAction: 'all',
            			width:220,
            			valueField: 'value',
            			displayField: 'text',
           				readOnly: true
					},{
						id:'cz',
						xtype:"textfield",
						fieldLabel:"车主",
						allowBlank: true,
						width:220,
						name:'cz'
				    }]
       		  },
       		  {
        	   	//defaults: {width: 200,allowBlank: false},
            	columnWidth:.5,
            	border: false,
            	layout:'form',
            	items:[{
            			id:'ch',
						xtype:"textfield",
						fieldLabel:"车号",
						allowBlank: false,
						width:220,
						name:'ch'
					},{id:'bz',
						xtype:"textfield",
						fieldLabel:"备注",
						width:220,
						name:'bz'
            			}]
       		  }]
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
        {name: 'cydw_bm' 		,mapping:'cydw_bm'		,type: 'string'},
        {name: 'cydw_mc' 		,mapping:'cydw_mc'		,type: 'string'},
        {name: 'ch' 		,mapping:'ch'		,type: 'string'},
        {name: 'cz' 		,mapping:'cz'		,type: 'string'},
        {name: 'bz' 		,mapping:'bz'		,type: 'string'}
    ]);

    var store = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy
        					({url:'cyclManager!queryData.action',
	        				   
							    failure:function()
								{	
									Ext.Msg.alert('错误提示','加载数据出错!');
								}
        					}),
        	reader: new Ext.data.JsonReader({
            totalProperty: 'totalCount',
            root: 'cyclList'
        },splbRecord),
        remoteSort: true
    });
 
	var checkbox = new Ext.grid.CheckboxSelectionModel({id:'checkbox',handleMouseDown:Ext.emptyFn,width:30}); //CheckBox选择列 
    var columns = new Ext.grid.ColumnModel([  
    	checkbox,
    	new Ext.grid.RowNumberer(), //行号列
	        {header: '承运单位编码',
	        dataIndex: 'cydw_bm'
        },
        {header: '承运单位'    ,
        dataIndex: 'cydw_mc'   ,
        //可编辑框
			editor: new Ext.form.TextField({   
			                    allowBlank: false,   
			                    blankText: "编号不能为空，必须输入"  
			                })	
        },
        {header: '车号' 	,
        dataIndex: 'ch', 
        //可编辑框
			editor: new Ext.form.TextField({   
			                    allowBlank: false,   
			                    blankText: "编号不能为空，必须输入"  
			                })
        },
        {header: '车主'   ,
        dataIndex: 'cz',
        //可编辑框
			editor: new Ext.form.TextField({   

			                })
        },
        {header: '备注'      ,
        dataIndex: 'bz',
        //可编辑框
			editor: new Ext.form.TextField({   

			                })
        }
    ]);
    //columns.defaultSortable = true;

    // grid start  GridPanel
    var grid = new Ext.grid.EditorGridPanel({
    	id:'grid',
        anchor:'99%',
        loadMask: true,
        height:300,
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
         cydw_bm : Ext.get('cydw_bm').dom.value,
         ch : Ext.getCmp('ch').getValue()
        });
     });

     

       /**
        * 
        */
       var fieldset2 = new Ext.form.FieldSet({
		title:'商品类别信息',
		region: 'center',
		autoHeight:true, 
		height:220,
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
	  //alert(Ext.getCmp('gsqm').getValue());
      //alert(Ext.getCmp('pym').getValue());
	//重新加载
	//Ext.getCmp('grid').getStore().load({params:{start:0, limit:10}});
	//重新加载 如果没有数据提示
	Ext.getCmp('grid').getStore().reload({callback: function(records, options, success)
		{
			if(0 == Ext.getCmp('grid').getStore().getCount())
			{
				Ext.MessageBox.alert('消息!!!','没有对应的信息！！！');
			}
		}
	});
      
    // Ext.getCmp('grid').getStore().load({params:{start:0, limit:10,rzmc:'text.txt', cjsj:'2011-02-28 23:56:02'}});
}

/**
 * 保存数据
 */
function addData()
{
		//去除左右空格
		 function trimStr(str)
		{
			var s =str.replace(/(^[\\s]*)|([\\s]*$)/g,"")
			return s;
		}
		
	//Ext.Ajax.request
    if (!Ext.getCmp('form').getForm().isValid()) {
                    return;
                }
	Ext.getCmp('form').getForm().submit
	({    
		url:'cyclManager!saveData.action', 
		params: 'cydw_mc='+encodeURIComponent(Ext.get('cydw_mc').dom.value)
				+'&cydw_bm='+encodeURIComponent(Ext.get('cydw_bm').dom.value)
				+'&ch='+encodeURIComponent(Ext.getCmp('ch').getValue())
				+'&cz='+encodeURIComponent(Ext.getCmp('cz').getValue())
				+'&bz='+encodeURIComponent(Ext.getCmp('bz').getValue()),
		method:'POST',
		//options : Object 请求所调用的参数。
		success: function(resp,opts) 
	    { 
	     	//var result = Ext.decode(resp.responseText);
	     	//重新加载grid
	     	Ext.getCmp('grid').getStore().load({params:{start:0, limit:10}});
	       //msg 是从后台返回的如果程序出错执行不到这一步，msg为空	     	
	        //Ext.Msg.alert('信息提示',result.msg);
	    },
	    failure:function()
		{
			Ext.Msg.alert('错误提示','保存出错！！！');
		}
	});	
}

 /**
 * 修改数据
 */
function editData(){	

	var records = Ext.getCmp('grid').getSelectionModel().getSelections();
	if(records.length>1){
		Ext.MessageBox.alert('提示','一次不能修改多条记录！！！');
		return;
	}else if(records.length==0){
		Ext.MessageBox.alert('提示','选择需要修改的一条记录！！！');
		return;
	}else{
			
		var jsonArray = [];
		for (var i = 0; i < records.length; i++) {
			var record = records[i];
			Ext.each(record,function(item)
			{
				jsonArray.push(item.data);
			});
		}
				
		data = Ext.encode(jsonArray);
//		alert(jsonArray.length);
//		alert(data);
		
		Ext.Ajax.request
		({    
			url:'cyclManager!editData.action', 
			params: 'data='+encodeURIComponent(data), 
			method:'POST',
			//options : Object 请求所调用的参数。
			success: function(resp,opts) 
		    { 
		    },
		    failure:function()
			{
				Ext.Msg.alert('错误提示','操作失败！！！');
			}
		});	  
	}          
}

/**
 * 根据条件删除数据
 */
  function delData(){
       if(Ext.getCmp('grid').getSelectionModel().getSelections().length>0){
			Ext.MessageBox.confirm('消息','确认要删除所选的记录？',this.removeCompanyInfo);
		}else {
			Ext.MessageBox.alert("警告","最少需要选择一条记录！！！");
		}
    }
    
    function removeCompanyInfo(btnText) {   
        if (btnText == "yes"){   
           if(Ext.getCmp('grid').getSelectionModel().hasSelection()){
			var ids = '';
			var records = Ext.getCmp('grid').getSelectionModel().getSelections();
			for(var i = 0;i<records.length;i++){
				if(i==0){
					ids = records[0].data["ch"];
				}else{
					ids+=','+records[i].data["ch"];
				}
			}
			Ext.Ajax.request({
				method:'POST',
				url:'cyclManager!deleteData.action',
				params:'ids='+encodeURIComponent(ids),
				success:function(resp,opts){
					//var result = Ext.decode(resp.responseText);			     	
			       //msg 是从后台返回的如果程序出错执行不到这一步，msg为空	
			       //重新加载grid
			     	Ext.getCmp('grid').getStore().load({params:{start:0, limit:10}});
			        //Ext.Msg.alert('提示',result.msg);		        
				},
				failure:function(){
					Ext.MessageBox.alert('提示','数据删除失败！！！');
					Ext.getCmp('store').reload();
					Ext.getCmp('grid').getStore().load({params:{start:0, limit:10}});
				}
				
			});
   		}
   }       
} 
  


    

  