
//被选中的节点
var checked_node = "";
// 上次被选中的节点的ui
var old_node_ui;

Ext.onReady(function(){
		//初始化信息提示功能
	Ext.QuickTips.init();
	//统一指定错误信息提示浮动显示方式
	Ext.form.Field.prototype.msgTarget = 'side';
	
 	Ext.BLANK_IMAGE_URL = 'pic/s.gif';
	Ext.lib.Ajax.defaultPostHeader += ";charset=utf-8";
	
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
							},'-',{
								text : "删除",
								iconCls : "delete",
								id : "delete",
								handler : function() {
									deleteData();
								},
								scope : this
							},{
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
								id: 'khgjz',
								name: 'khgjz', 
								emptyText: '请输入客户名称'
							}]
				});	 
	
			

	var jiaose = new Ext.tree.AsyncTreeNode
		({
			text:'单位类别',
			id:'DWLB000',
			leaf:false,
			draggable : false,
			//singleClickExpand : true,
			//是否展开子节点
			expanded : true
		});

      var shangPinPanl = new Ext.tree.TreePanel({
      	title: '单位类别',
      	id:'shangPinPanl',
      	region: 'east',
        frame: true,
        border:false,
        width: 300,
      	height:550,
      	rootVisible : false,
		autoScroll : true,
		enableDD : false,
		loader : new Ext.tree.TreeLoader({dataUrl : 'getDanWeiLBTree!getTree.action?treeClick=true&id=DWLB000'}),
		containerScroll : true,
		root:jiaose
		
	});
	
	
	shangPinPanl.on('click',showMessage,this);  
	shangPinPanl.on('beforeload',treeBeforeload,this);  
	
	
	
	 var splbRecord = Ext.data.Record.create([
        {name: 'lbbm' 		,mapping:'lbbm'			,type: 'string'},
        {name: 'lbmc' 		,mapping:'lbmc'			,type: 'string'},
        {name: 'mc' 		,mapping:'mc'			,type: 'string'},
        {name: 'fldj' 		,mapping:'fldj'			,type: 'string'},
        {name: 'bm' 		,mapping:'bm'			,type: 'string'},
        {name: 'lxr' 		,mapping:'lxr'			,type: 'string'},
        {name: 'gddh' 		,mapping:'gddh'			,type: 'string'},
        {name: 'yddh' 		,mapping:'yddh'			,type: 'string'},
        {name: 'fax' 		,mapping:'fax'			,type: 'string'},
        {name: 'email' 		,mapping:'email'		,type: 'string'},
        {name: 'yzbm' 		,mapping:'yzbm'			,type: 'string'},
        {name: 'dz' 		,mapping:'dz'			,type: 'string'},
        {name: 'bz' 		,mapping:'bz'			,type: 'string'},
         {name: 'xybj' 		,mapping:'xybj'			,type: 'string'}
    ]);

   var store = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy
        					({url:'wldwManager!queryData.action',
	        				   
							    failure:function()
								{	
									Ext.Msg.alert('错误提示','加载数据出错!');
								}
        					}),
        	reader: new Ext.data.JsonReader({
            totalProperty: 'totalCount',
            root: 'wldwXxList'
        },splbRecord),
        remoteSort: true
    });
 
    
 
     var columns = new Ext.grid.ColumnModel([  
    	new Ext.grid.RowNumberer(), //行号列
	    //{header: '类别编码'		,dataIndex: 'lbbm'},
        {header: '类别名称'    	,dataIndex: 'lbmc'  },
        //{header: '单位编码' 	    ,dataIndex: 'bm'},
        {header: '单位名称' 	 	,dataIndex: 'mc'},
        {header: '费用' 	 	,dataIndex: 'fldj'},
        {header: '联系人'   		,dataIndex: 'lxr'},
        {header: '固定电话'      ,dataIndex: 'gddh'},
        {header: '移动电话'      ,dataIndex: 'yddh'},
        {header: '传真'      	,dataIndex: 'fax'},
        {header: '邮箱'      	,dataIndex: 'email'},
        {header: '邮政编码'      ,dataIndex: 'yzbm'},
        {header: '地址'      	,dataIndex: 'dz'},
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
	  	var lbbm;
	  	var dwmc =Ext.getCmp('khgjz').getValue();
	  	if("" == checked_node)
	  	{
	  		lbbm = "";
	  	}else
	  	{
	  		lbbm = checked_node.id;
	  	}
      	Ext.apply(this.baseParams,{
          lbbm:lbbm,dwmc:dwmc
        });
     });
	
  store.load({params:{start:0, limit:20}}); //加载数据 	


 
    var form = new Ext.form.FormPanel({
        title: '往来单位信息',
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
    
    
		
	
    var viewport = new Ext.Viewport({
        renderTo: 'main',
        layout:'form',
        items: [tb,panl]
    });
    
});


function treeBeforeload(node) 
{
	if (!node.isExpanded()) 
 	{
		var tree = Ext.getCmp('shangPinPanl');
		var treeid = node.id;
		var url = 'getDanWeiLBTree!getTree.action?treeClick=true&id='+treeid;
		tree.loader.dataUrl = url;
    }	    
}


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
 		Ext.MessageBox.alert('错误!!!','请选择新增往来单位的所属类别！！');
 		return;
 	}else
 	{
 		openWindow();
 	}
 	
}


function openWindow(obj)
{
      
        
		var fieldset = new Ext.form.FieldSet({
		title:'客户信息',
		labelAlign: 'right',
        labelWidth: 60,
        buttonAlign: 'center',
        items: [
        		  {layout:'column',
                  items: 
                  [
                  	{columnWidth:.5,layout: 'form',defaults: {width: 180,xtype:'textfield'},
                  	 items:{fieldLabel: '类别名称',xtype:'textfield',name: 'lbmc',id:'lbmc'}},
                  	 {columnWidth:.5,layout: 'form', defaults: {width: 180,xtype:'textfield'}, items:{fieldLabel: '单位名称',allowBlank: false,   
		    blankText: "该输入项不能为空" ,maxLength: 200,name: 'dwmc',id:'dwmc'}}
                  ]
                 },
                  {layout:'column',
                  items: 
                  [
                  	{columnWidth:.5,layout: 'form', defaults: {width: 180,xtype:'textfield'}, items:{fieldLabel: '费用',xtype:"numberfield",
	        			allowNegative:false,//不能输入负数
	        			allowDecimals:true,//不能输入小数点
	        			decimalPrecision:2,//保留小数点后4位，默认两位
	        			//minValue:0,//输入范围
	        			//maxValue:1,//输入范围
	        			maskRe:/\d/,
	        			regexText:"该输入项必须是数字",maxLength:15,name: 'fldj',id:'fldj'}}
                   ,{columnWidth:.5,layout: 'form', defaults: {width: 180,xtype:'textfield'}, items:{fieldLabel: '拼音码',name: 'pym',id:'pym'}}
                  ]
                 }
                 ,{layout:'column',
                  items: 
                  [
                  	{columnWidth:.5,layout: 'form', defaults: {width: 180,xtype:'textfield'}, items:{fieldLabel: '联系人',maxLength: 20,name: 'lxr',id:'lxr'}}
                   ,{columnWidth:.5,layout: 'form', defaults: {width: 180,xtype:'textfield'}, items:{fieldLabel: '固定电话',maxLength: 20,name: 'gddh',id:'gddh'}}
                  ]
                 }
                 ,{layout:'column',
                  items: 
                  [
                  	{columnWidth:.5,layout: 'form', defaults: {width: 180,xtype:'textfield'}, items:{fieldLabel: '移动电话',maxLength: 20,name: 'yddh',id:'yddh'}}
                   ,{columnWidth:.5,layout: 'form', defaults: {width: 180,xtype:'textfield'}, items:{fieldLabel: '传真',maxLength: 20,name: 'fax',id:'fax'}}
                  ]
                 }
                 ,{layout:'column',
                  items: 
                  [
                  	{columnWidth:.5,layout: 'form', defaults: {width: 180,xtype:'textfield'}, items:{fieldLabel: '电子邮件',maxLength: 50,vtype:"email",name: 'email',id:'email'}}
                   ,{columnWidth:.5,layout: 'form', defaults: {width: 180,xtype:'textfield'}, items:{fieldLabel: '邮政编码',maxLength: 20,name: 'yzbm',id:'yzbm'}}
                  ]
                 }
                ,{layout:'column',
                  items: 
                  [
                  	{columnWidth:.5,layout: 'form', defaults: {width: 180}, 
                  	 items:{ fieldLabel: '地址',xtype:'textfield',maxLength: 200,name: 'dz',id:'dz'}}
                   ,{columnWidth:.5,layout: 'form', defaults: {width: 180,xtype:'textfield'}, 
                   	 items:{fieldLabel: '选用标记',name:'xybjradio' ,id:'xybjradio' ,xtype: 'radiogroup',width: 180
    	    	  	 		 ,items:[{boxLabel:'不选用',inputValue:'0',name:'xybj'},{boxLabel:'选用',inputValue:'1',name:'xybj',checked:true}]}}
                  ]
                 }
 
                ,{layout:'column',
                  items: 
                  [
                  	{columnWidth:1,layout: 'form',
                  	 items:{fieldLabel: '备注',height:40,width:'89%' ,xtype:'textarea',maxLength: 500,name: 'bz',id:'bz'}}
                  ]
                 }
                ,{xtype:'hidden',name: 'lbbm',id:'lbbm'},{xtype:'hidden',name: 'dwbm',id:'dwbm'}
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
		
		
			//单位名称添加触发拼音码事件
      Ext.getCmp('dwmc').on('blur', function(){
                Ext.getCmp('pym').setValue(myConvertToUpper(Ext.getCmp('dwmc').getValue()));
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
 	 title:'新增客户',
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
		Ext.getCmp('lbmc').setValue(checked_node.text);
 		Ext.getCmp('lbbm').setValue(checked_node.id);
 		Ext.getCmp('save').getText('保存');
 		
 		Ext.getCmp('lbmc').removeClass('noReadOnly');
  		Ext.getCmp('lbmc').addClass('readOnly');
	}else
	{
		Ext.getCmp('lbmc').setValue(obj.get("lbmc"));
 		Ext.getCmp('lbbm').setValue(obj.get("lbbm"));
 		Ext.getCmp('dwmc').setValue(obj.get("mc"));
 		Ext.getCmp('fldj').setValue(obj.get("fldj"));
 		Ext.getCmp('dwbm').setValue(obj.get("bm"));
 		Ext.getCmp('lxr').setValue(obj.get("lxr"));
 		Ext.getCmp('gddh').setValue(obj.get("gddh"));
 		Ext.getCmp('yddh').setValue(obj.get("yddh"));
 		Ext.getCmp('fax').setValue(obj.get("fax"));
 		Ext.getCmp('email').setValue(obj.get("email"));
 		Ext.getCmp('yzbm').setValue(obj.get("yzbm"));
 		Ext.getCmp('dz').setValue(obj.get("dz"));
 		Ext.getCmp('bz').setValue(obj.get("bz"));
 		Ext.getCmp('xybjradio').setValue(obj.get("xybj"));
 		Ext.getCmp('save').setText('修改');
 		
 		Ext.getCmp('lbmc').removeClass('noReadOnly');
  		Ext.getCmp('lbmc').addClass('readOnly');
	}
	
  win.show();
}




// 修改或新增弹出窗的保存按钮事件，保存后面板重新加载
function saveData()
{
if(!Ext.getCmp('form').form.isValid()){
		return ;
	}
else{		Ext.getCmp('save').setDisabled(true);
		var code;
		if(Ext.getCmp('save').getText() == '保存')
		{
			code = 'saveData';
		}else if(Ext.getCmp('save').getText() == '修改')
		{
			code = 'changeData';
		}
		 Ext.getCmp('form').getForm().submit
		({
			url: 'wldwManagerInit!saveOrChange.action',
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
		Ext.MessageBox.confirm("请确认!!!!!!", ",确认删除该往来单位信息吗？是否删除?" ,function(button)
		{
			if(button=="yes")
			{
				for(var i=0;i<selections.length;i++)
				{
					spbmStr += selections[i].get("bm")+","
				}
				
			   // 调用ajax 从后台获取列名
				Ext.Ajax.request
				({    
					url:'wldwManagerInit!deleData.action', 
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




function renderXybj(value) 
{
  	if (value == '0') {
		return "<span style='color:red;font-weight:bold;'>不选用</span>";
	} else {
    	return "<span style='color:green;font-weight:bold;'>选用</span>";
    }
}

function queryData(){

	Ext.getCmp("shangPinPanl").root.reload();
		//重新加载 如果没有数据提示
	checked_node="";
		Ext.getCmp('grid').getStore().reload({callback: function(records, options, success)
			{
				if(0 == Ext.getCmp('grid').getStore().getCount())
				{
					Ext.MessageBox.alert('消息!!!','没有对应的信息！！！');
				}
			}
		});

}
