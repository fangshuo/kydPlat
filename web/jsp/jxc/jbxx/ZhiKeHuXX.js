
//被选中的节点
var checked_node = "";
// 上次被选中的节点的ui
var old_node_ui;

Ext.onReady(function(){
 	Ext.BLANK_IMAGE_URL = 'pic/s.gif';
	Ext.QuickTips.init();
	Ext.lib.Ajax.defaultPostHeader += ";charset=utf-8";

	var wldwTree = new Ext.tree.AsyncTreeNode
	({
		text:'往来单位',
		id:'DWLB000',
		leaf:false,
		draggable : false,
		//singleClickExpand : true,
		//是否展开子节点
		expanded : true
	});

      var shangPinPanl = new Ext.tree.TreePanel({
      	title: '往来单位',
      	id:'shangPinPanl',
      	region: 'east',
        frame: true,
        border:false,
        width: 300,
      	height:550,
      	rootVisible : false,
		autoScroll : true,
		enableDD : false,
		loader : new Ext.tree.TreeLoader({dataUrl : 'getWldwTree!getTree.action?treeClick=true&id=DWLB000&wldw=%'}),
		containerScroll : true,
		root:wldwTree
	});
	
	
	shangPinPanl.on('click',showMessage,this);  
	shangPinPanl.on('beforeload',treeBeforeload,this);  
	

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
	
	
	 var RiZhixxRecord = Ext.data.Record.create([
        {name: 'dwmc' 		,mapping:'dwmc'},
        {name: 'khbm' 		,mapping:'khbm'},
        {name: 'khmc' 		,mapping:'khmc'},
        {name: 'yfdj' 		,mapping:'yfdj'},
        {name: 'lxr'        ,mapping:'lxr'},
        {name: 'gddh'      	,mapping:'gddh'},
        {name: 'yddh'       ,mapping:'yddh'},
        {name: 'fax'	    ,mapping:'fax'},
        {name: 'email'		 ,mapping:'email'},
        {name: 'yzbm'	    ,mapping:'yzbm'},
        {name: 'dz'		    ,mapping:'dz'},
        {name: 'bz'		    ,mapping:'bz'},
        {name: 'xybj'       ,mapping:'xybj'},
        {name: 'kpbj' 		,mapping:'kpbj'}
    ]);

    var store = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy
        					({url:'getKhxxList!queryData.action',
        				    success: function(resp,opts) 
						    { 
						    },
						    failure:function()
							{
								Ext.Msg.alert('错误','加载数据出错!!');
							}
        					}),
        reader: new Ext.data.JsonReader({
            totalProperty: 'totalCount',
            root: 'khxxlist'
        },RiZhixxRecord),
        remoteSort: true
    });
    
 
    var columns = new Ext.grid.ColumnModel([  
    	new Ext.grid.RowNumberer(), //行号列 
    	{header: '单位名称'         ,dataIndex: 'dwmc' ,width:150},
        {header: '客户名称'    	  ,dataIndex: 'khmc' ,width:150},
        {header: '客户编码' 		  ,dataIndex: 'khbm' ,width:150},
        {header: '运费' 		  ,dataIndex: 'yfdj' ,width:150},
        {header: '联系人'          ,dataIndex: 'lxr'  ,width:150},
        {header: '固定电话' 		  ,dataIndex: 'gddh' ,width:150},
        {header: '移动电话'  		  ,dataIndex: 'yddh' ,width:150},
        {header: '传真'            ,dataIndex: 'fax'  ,width:150},
        {header: '电子邮件'         ,dataIndex: 'email' ,width:150},
        {header: '邮政编码'         ,dataIndex: 'yzbm'  ,width:150},
        {header: '地址'            ,dataIndex: 'dz'  ,width:150},
        {header: '备注'            ,dataIndex: 'bz'  ,width:150},
        {header: '是否选用'         ,dataIndex: 'xybj' ,width:80 ,renderer:renderXybj},
        {header: '开票标记'         ,dataIndex: 'kpbj' ,width:80 ,renderer:renderXybj}
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
    
    
	


 
    var form = new Ext.form.FormPanel({
        title: '子客户信息',
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
    
         // 点击往上一页下一页中添加参数
	  store.on('beforeload', function() {
	  	var dwbm;
	  	var dwmc =Ext.getCmp('khgjz').getValue();

       
	  	if(checked_node=="" )
	  	{
	  		dwbm = "";
	  		
	  	}else
	  	{
	  		dwbm = checked_node.id;
	  	}

       
      	Ext.apply(this.baseParams,{
          dwbm:dwbm,dwmc:dwmc
          
        });
     });
	
 store.load({params:{start:0, limit:20}}); //加载数据 
    
    
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
	
}


function openWindow(obj)
{
		var fieldset = new Ext.form.FieldSet({
		title:'客户信息',
		labelAlign: 'right',
        labelWidth: 60,
        buttonAlign: 'center',
        items: [ {layout:'column',
                  items: 
                  [
                  	{columnWidth:.5,layout: 'form', defaults: {width: 180,xtype:'textfield'}, items:{fieldLabel: '单位名称',name:'dwmc',id:'dwmc'}}
                   ,{columnWidth:.5,layout: 'form', defaults: {width: 180,xtype:'textfield'}, items:{fieldLabel: '客户名称',allowBlank: false,   blankText: "该输入项不能为空" ,maxLength: 200,name: 'khmc',id:'khmc'}}
                  ]
                 }
                 ,{layout:'column',
                  items: 
                  [
                   {columnWidth:.5,layout: 'form', defaults: {width: 180,xtype:'textfield'}, items:{fieldLabel: '运费',allowBlank: false,xtype:"numberfield",
	        			allowNegative:false,//不能输入负数
	        			allowDecimals:true,//不能输入小数点
	        			decimalPrecision:2,//保留小数点后4位，默认两位
	        			//minValue:0,//输入范围
	        			//maxValue:1,//输入范围
	        			maskRe:/\d/,
	        			regexText:"该输入项必须是数字",maxLength:15,name: 'yfdj',id:'yfdj'}}
                   ,{columnWidth:.5,layout: 'form', defaults: {width: 180,xtype:'textfield'}, items:{fieldLabel: '拼音码',name: 'pym',id:'pym'}}
                  ]
                 }
                 ,{layout:'column',
                  items: 
                  [
					{columnWidth:.5,layout: 'form', defaults: {width: 180,xtype:'textfield'}, items:{fieldLabel: '联系人',maxLength: 20,allowBlank: false,name: 'lxr',id:'lxr'}}
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
                  	 items:{fieldLabel: '开票标记',name:'kpbjradio' ,id:'kpbjradio' ,xtype: 'radiogroup',width: 180
    	    	  	 		 ,items:[{boxLabel:'不选用',inputValue:'0',name:'kpbj'},{boxLabel:'选用',inputValue:'1',name:'kpbj',checked:true}]}}
                   , {columnWidth:.5,layout: 'form', defaults: {width: 180,xtype:'textfield'}, 
                   	 items:{fieldLabel: '选用标记',name:'xybjradio' ,id:'xybjradio' ,xtype: 'radiogroup',width: 180
    	    	  	 		 ,items:[{boxLabel:'不选用',inputValue:'0',name:'xybj'},{boxLabel:'选用',inputValue:'1',name:'xybj',checked:true}]}}
                  ]
                 }
                 ,{layout:'column',
                  items: 
                  [
                  	{columnWidth:1,layout: 'form',
                  	 items:{fieldLabel: '地址',height:40,width:'89%' ,xtype:'textarea',name: 'dz',id:'dz'}}
                  ]
                 }
                ,{layout:'column',
                  items: 
                  [
                  	{columnWidth:1,layout: 'form',
                  	 items:{fieldLabel: '备注',height:40,width:'89%' ,xtype:'textarea',name: 'bz',id:'bz'}}
                  ]
                 }
                ,{xtype:'hidden',name: 'dwbm',id:'dwbm'},{xtype:'hidden',name: 'khbm',id:'khbm'}
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
      Ext.getCmp('khmc').on('blur', function(){
                Ext.getCmp('pym').setValue(myConvertToUpper(Ext.getCmp('khmc').getValue()));
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
		Ext.getCmp('dwmc').setValue(checked_node.text);
 		Ext.getCmp('dwbm').setValue(checked_node.id);
 		Ext.getCmp('save').getText('保存');
 		
 		Ext.getCmp('dwmc').removeClass('noReadOnly');
  		Ext.getCmp('dwmc').addClass('readOnly');
	}else
	{
		Ext.getCmp('dwmc').setValue(obj.get("dwmc"));
 		Ext.getCmp('dwbm').setValue(obj.get("dwbm"));
 		Ext.getCmp('khmc').setValue(obj.get("khmc"));
 		Ext.getCmp('pym').setValue(myConvertToUpper(obj.get("khmc")));
 		Ext.getCmp('khbm').setValue(obj.get("khbm"));
 		Ext.getCmp('lxr').setValue(obj.get("lxr"));
 		Ext.getCmp('gddh').setValue(obj.get("gddh"));
 		Ext.getCmp('yddh').setValue(obj.get("yddh"));
 		Ext.getCmp('fax').setValue(obj.get("fax"));
 		Ext.getCmp('email').setValue(obj.get("email"));
 		Ext.getCmp('yzbm').setValue(obj.get("yzbm"));
 		Ext.getCmp('dz').setValue(obj.get("dz"));
 		Ext.getCmp('yfdj').setValue(obj.get("yfdj"));
 		Ext.getCmp('bz').setValue(obj.get("bz"));
 		Ext.getCmp('xybjradio').setValue(obj.get("xybj"));
 		Ext.getCmp('kpbjradio').setValue(obj.get("kpbj"));
 		Ext.getCmp('save').setText('修改');
 		
 		Ext.getCmp('dwmc').removeClass('noReadOnly');
  		Ext.getCmp('dwmc').addClass('readOnly');
	}
	
  win.show();
}



// 修改或新增弹出窗的保存按钮事件，保存后面板重新加载
function saveData()
{
	if(!Ext.getCmp('form').form.isValid()){return;}
	else
	{
		Ext.getCmp('save').setDisabled(true);
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
			url: 'ZhiKeHuXX!saveOrChange.action',
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

function newData()
{
 	if("" == checked_node)
 	{
 		Ext.MessageBox.alert('错误!!!','请选择新增子客户信息的所属类别！！');
 		return;
 	}else
 	{
 		openWindow();
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
		Ext.MessageBox.confirm("请确认!!!!!!", "删除会将该商品类别下的所有商品类别全部删除,是否删除?" ,function(button)
		{
			if(button=="yes")
			{
				for(var i=0;i<selections.length;i++)
				{
					spbmStr += selections[i].get("khbm")+","
				}
				
			   // 调用ajax 从后台获取列名
				Ext.Ajax.request
				({    
					url:'ZhiKeHuXX!deleData.action', 
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

	 
function treeBeforeload(node) 
{
	if (!node.isExpanded()) 
 	{
 		var treeid; 
 		var gjz = Ext.getCmp('khgjz').getValue();
		var tree = Ext.getCmp('shangPinPanl');
		if(gjz=="")
		treeid = node.id;
		else
		treeid = '%';		        
		var url = 'getWldwTree!getTree.action?treeClick=true&id='+treeid+'&wldw='+gjz;
		tree.loader.dataUrl = url;
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

	
	
	 