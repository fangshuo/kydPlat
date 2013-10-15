
//被选中的节点
var checked_node = "";
// 上次被选中的节点的ui
var old_node_ui;

Ext.onReady(function(){
 	Ext.BLANK_IMAGE_URL = 'pic/s.gif';
	Ext.QuickTips.init();
	Ext.lib.Ajax.defaultPostHeader += ";charset=utf-8";

	var jiaose = new Ext.tree.AsyncTreeNode
		({
			text:'承运单位',
			id:'CYDW000',
			leaf:false,
			draggable : false,
			//singleClickExpand : true,
			//是否展开子节点
			expanded : true
		});

      var shangPinPanl = new Ext.tree.TreePanel({
      	title: '承运单位',
      	id:'shangPinPanl',
      	region: 'east',
        frame: true,
        border:false,
        width: 300,
      	height:550,
      	rootVisible : false,
		autoScroll : true,
		enableDD : false,
		loader : new Ext.tree.TreeLoader({dataUrl : 'getCydwTree!getTree.action'}),
		containerScroll : true,
		root:jiaose
		
	});
	
	
	shangPinPanl.on('click',showMessage,this);  		
    
    var splbRecord = Ext.data.Record.create([
        {name: 'cydw_mc' 		,mapping:'cydw_mc'		,type: 'string'},
        {name: 'ch' 		,mapping:'ch'		,type: 'string'},
        {name: 'cz' 		,mapping:'cz'		,type: 'string'},
        {name: 'bz' 		,mapping:'bz'		,type: 'string'},
        {name: 'xybj' 		,mapping:'xybj'		,type: 'string'}
    ]);

   var store = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy
        					({url:'cyclManager2!queryData.action',
	        				   
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
 
    
 
     var columns = new Ext.grid.ColumnModel([  
 
    	new Ext.grid.RowNumberer(), //行号列
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
        },
        {header: '选用标记'      	,dataIndex: 'xybj' ,renderer:renderXybj}
    ]);



    var grid = new Ext.grid.GridPanel({
    	id:'grid',
        loadMask: true,
        height:500,
        store: store,
        cm: columns,
        //每次只能选择一行new Ext.grid.RowSelectionModel({singleSelect:true}),，如果sm：checkbox 则可以多选
        sm:new Ext.grid.RowSelectionModel(),
        // 自动计算表格每列的宽度
        viewConfig: {
            forceFit: true
        },
        bbar: new Ext.PagingToolbar({
            pageSize: 20,
            store: store,
            displayInfo: true,
			displayMsg: '显示第 {0} 条到 {1} 条记录，一共 {2} 条', 
			emptyMsg: "没有记录" 
        })
    });
    
    
     // 点击往上一页下一页中添加参数
	  store.on('beforeload', function() {
	  	var cydw_bm;
	  	if("" == checked_node)
	  	{
	  		cydw_bm = "";
	  	}else
	  	{
	  		cydw_bm = checked_node.id;
	  	}
      	Ext.apply(this.baseParams,{
          cydw_bm:cydw_bm
        });
     });
	
  store.load({params:{start:0, limit:20}}); //加载数据 	


 
    var form = new Ext.form.FormPanel({
        title: '车辆信息',
        id : 'form',
        region: 'east',
        autoScroll:true, 
        frame: true,
        border:false,
        width:'100%',
        height:550,
       	items:grid
    });
    
    
    var panl = new Ext.Panel({
    	baseCls:"x-plain,y-plain",
    	autoScroll:true,
		layout:'column',
		items:[{columnWidth:.25,baseCls:"x-plain,y-plain",items:shangPinPanl},
			   {columnWidth:.75,baseCls:"x-plain,y-plain",items:form}]
	});	 	
    
    
	var tb = new Ext.Toolbar({
					baseCls:"x-plain,y-plain",
					items : [{
				  				text : "新增",
								iconCls : "new",
								id : "new",
								handler : function() {
									newData();
								},
								scope : this
							},'-',{
								text : "修改",
								iconCls : "change",
								id : "change",
								handler : function() {
									changeData();
								},
								scope : this
							}
//							,'-',{
//								text : "删除",
//								iconCls : "delete",
//								id : "delete",
//								handler : function() {
//									deleteData();
//								},
//								scope : this
//							}
							]
				});	 
	
				
	
    var viewport = new Ext.Viewport({
        renderTo: 'main',
        layout:'form',
        items: [tb,panl]
    });
    
});



/*点击菜单改变被选中的菜单的样式* */
function showMessage(node)
{
	
	var ui= node.ui;
	
	
	//不是主节点才可以新增加
	if(node!=Ext.getCmp('shangPinPanl').getRootNode())
	{
		if(""== checked_node )
		{
			ui.addClass("big");
			
		}else
		{
			old_node_ui.removeClass("big");
			ui.addClass("big");
		}
		old_node_ui = ui;
		checked_node = node;
	}

		
	//重新加载 如果没有数据提示
	Ext.getCmp('grid').getStore().reload({callback: function(records, options, success)
		{
			if(0 == Ext.getCmp('grid').getStore().getCount())
			{
				Ext.MessageBox.alert('消息!!!','没有对应的信息！！！');
			}
		}
	});
}


function newData()
{
 	if("" == checked_node)
 	{
 		Ext.MessageBox.alert('错误!!!','请选择新增车辆的承运单位！');
 		return;
 	}else
 	{
 		openWindow();
 	}
 	
}


function openWindow(obj)
{
      
        
		var fieldset = new Ext.form.FieldSet({
		title:'车辆信息',
		labelAlign: 'right',
        labelWidth: 60,
        buttonAlign: 'center',
        items: [
        		  {layout:'column',
                  items: 
                  [
                  	{columnWidth:1,layout: 'form',defaults: {width: 180,xtype:'textfield'},items:{fieldLabel: '承运单位',xtype:'textfield',name: 'cydw_mc',id:'cydw_mc'}}
                  ]
                 },
                  {layout:'column',
                  items: 
                  [
                  	{columnWidth:.5,layout: 'form', defaults: {width: 180,xtype:'textfield'}, items:{fieldLabel: '车号',allowBlank: false,maxLength: 10,name: 'ch',id:'ch'}}
                   ,{columnWidth:.5,layout: 'form', defaults: {width: 180,xtype:'textfield'}, items:{fieldLabel: '车主',maxLength: 20,name: 'cz',id:'cz'}}
                  ]
                 }
                 ,{layout:'column',
                  items: 
                  [
                  	{columnWidth:1,layout: 'form',
                  	 items:{fieldLabel: '选用标记',name:'xybjradio' ,id:'xybjradio' ,xtype: 'radiogroup',width: 180
    	    	  	 		 ,items:[{boxLabel:'不选用',inputValue:'0',name:'xybj'},{boxLabel:'选用',inputValue:'1',name:'xybj',checked:true}]}}
                  ]
                 }
                ,{layout:'column',
                  items: 
                  [
                  	{columnWidth:1,layout: 'form',
                  	 items:{fieldLabel: '备注',height:40,width:'89%' ,xtype:'textarea',name: 'bz',id:'bz'}}
                  ]
                 }

                ,{xtype:'hidden',name: 'cydw_bm',id:'cydw_bm'}
               ]
    	,buttons: [
        	{
            	text: '保存',
            	id:'save',
            	width:55, 
            	handler: function()
            			{
	 						saveData();
	 					},
            	scope : this
        	} ]
		});
		
 	
	   // form start
    var form = new Ext.form.FormPanel({
       // title: '商品类别信息',
       // baseCls:"x-plain,y-plain",
        id : 'form',
        region: 'east',
        frame: true,
        border:false,
        width:'100%',
        height:450,
       	items:fieldset
    });	
		
 	
 	var win=new Ext.Window({
  	 id:'win',
  	 width:'60%',
     modal : true,
    // maximizable:true,
     labelAlign: 'right',
     labelWidth: 80,
     layout:'column',
     items: form
	});
	
	if(obj == null)
	{
		Ext.getCmp('cydw_mc').setValue(checked_node.text);
 		Ext.getCmp('cydw_bm').setValue(checked_node.id);
 		Ext.getCmp('save').getText('保存');
 		
 		Ext.getCmp('cydw_mc').removeClass('noReadOnly');
  		Ext.getCmp('cydw_mc').addClass('readOnly');
	}else
	{
		Ext.getCmp('cydw_mc').setValue(obj.get("cydw_mc"));
 		Ext.getCmp('cydw_bm').setValue(obj.get("cydw_bm"));
 		Ext.getCmp('ch').setValue(obj.get("ch"));
 		Ext.getCmp('cz').setValue(obj.get("cz"));
 		Ext.getCmp('bz').setValue(obj.get("bz"));
 		Ext.getCmp('xybjradio').setValue(obj.get("xybj"));
 		//Ext.getCmp('ysbjradio').setValue(obj.get("ysbj"));
 		Ext.getCmp('save').setText('修改');
 		Ext.getCmp('cydw_mc').removeClass('noReadOnly');
  		Ext.getCmp('cydw_mc').addClass('readOnly');
  		Ext.getCmp('ch').addClass('readOnly');
	}
	
  win.show();
}




// 修改或新增弹出窗的保存按钮事件，保存后面板重新加载
function saveData()
{
if(!Ext.getCmp('form').form.isValid()){return;}
	else{        
		Ext.getCmp('save').setDisabled(true);
		var code;
		var url;
		if(Ext.getCmp('save').getText() == '保存')
		{
			code = 'saveData';
			url = 'cyclManager2!saveData.action';
		}else if(Ext.getCmp('save').getText() == '修改')
		{
			code = 'changeData';
			url = 'cyclManager2!editData.action';
		}
		 Ext.getCmp('form').getForm().submit
		({
			url:url,
			params:{handleCode:code},
			success:function(form,action)
			{
				Ext.MessageBox.alert('信息!!!',action.result.msg);
				//重新加载
				Ext.getCmp('grid').getStore().reload();
				Ext.getCmp('save').setDisabled(false);
			},
			failure:function()
			{
				Ext.MessageBox.alert('错误!!!','数据保存出错!!!!!');
				Ext.getCmp('save').setDisabled(false);
			}
		});
	}
}



// 修改 弹出窗口回显数据
function changeData()
{
	//var store = Ext.getCmp('grid').getStore();
	var selections = Ext.getCmp('grid').getSelectionModel().getSelections();
	if(selections.length != 1 )
	{
		Ext.MessageBox.alert('错误!!!','请选择一条要修改的记录');
	}else
	{
		var record = selections[0];
		openWindow(record);
	}
	
}

function deleteData()
{
	var selections = Ext.getCmp('grid').getSelectionModel().getSelections();
	
	var spbmStr = "";
	if(selections.length == 0)
	{
		Ext.MessageBox.alert('错误!!!','请选择一条或多条要删除的记录！！！');
	}else
	{
		Ext.MessageBox.confirm("请确认!!!!!!", "确认删除所选车辆信息?" ,function(button)
		{
			if(button=="yes")
			{
				for(var i=0;i<selections.length;i++)
				{
					spbmStr += selections[i].get("ch")+","
				}
				
			   // 调用ajax 从后台获取列名
				Ext.Ajax.request
				({    
					url:'cyclManager2!deleteData.action', 
					params: 'spbmStr='+spbmStr, 
					method:'POST',
					success: function(resp,opts) 
				    { 
				        var result = Ext.decode(resp.responseText);
		           		//msg 是从后台返回的如果程序出错执行不到这一步，msg为空
		            	Ext.Msg.alert('信息',result.msg);    
		            	//重新加载
						Ext.getCmp('grid').getStore().reload();
				    },
				    failure:function()
					{
						 Ext.Msg.alert("消息","删除数据出错");
					}
				});	 
			}
		});
	}
	
}

function baseCheck()
{
	if(Ext.getCmp('ch').getValue()=="")
	{
		Ext.Msg.alert("消息","车号不能为空！！");
		return false;
	}
	
	return true;
}



function renderXybj(value) 
{
  	if (value == '0') {
		return "<span style='color:red;font-weight:bold;'>不选用</span>";
	} else {
    	return "<span style='color:green;font-weight:bold;'>选用</span>";
    }
}

