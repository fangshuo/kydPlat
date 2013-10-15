
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
		text:'商品类别',
		id:'SPLB000',
		leaf:false,
		draggable : false,
		//singleClickExpand : true,
		//是否展开子节点
		expanded : true
	});

      var shangPinPanl = new Ext.tree.TreePanel({
      	title: '商品类别',
      	id:'shangPinPanl',
      	region: 'east',
        frame: true,
        border:false,
        width: 300,
      	height:550,
      	rootVisible : false,
		autoScroll : true,
		enableDD : false,
		loader : new Ext.tree.TreeLoader({dataUrl : 'getShangPinTree!getTree.action?treeClick=true&id=SPLB000'}),
		containerScroll : true,
		root:jiaose
		
	});
	
	
	shangPinPanl.on('click',showMessage,this);  
	shangPinPanl.on('beforeload',treeBeforeload,this);  
	
	
	 var RiZhixxRecord = Ext.data.Record.create([
        {name: 'sjmc' 		,mapping:'sjmc'},
        {name: 'sjbm' 		,mapping:'sjbm'},
        {name: 'spmc' 		,mapping:'spmc'},
        {name: 'spbm'       ,mapping:'spbm'},
        {name: 'jbdw'      	,mapping:'jbdw'},
        {name: 'gg'       	,mapping:'gg'},
        {name: 'hsbl'	    ,mapping:'hsbl'},
        {name: 'bz'		    ,mapping:'bz'},
        {name: 'splx'		    ,mapping:'splx'},
        {name: 'xybj'       ,mapping:'xybj'}
    ]);

    var store = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy
        					({url:'getSpxxList!queryData.action',
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
            root: 'spxxlist'
        },RiZhixxRecord),
        remoteSort: true
    });
 
//	var checkbox = new Ext.grid.CheckboxSelectionModel({id:'checkbox',handleMouseDown:Ext.emptyFn}); //CheckBox选择列 
    var columns = new Ext.grid.ColumnModel([  
    	//checkbox,
    	new Ext.grid.RowNumberer(), //行号列 
    	{header: '商品类别'         ,dataIndex: 'sjmc'},
        {header: '商品名称'    	  ,dataIndex: 'spmc'},
        {header: '商品编码' 		  ,dataIndex: 'spbm'},
        {header: '基本单位(吨/袋)'  ,dataIndex: 'jbdw',renderer:renderJbdw},
        {header: '规格' 			  ,dataIndex: 'gg'},
        {header: '换算比率'  		  ,dataIndex: 'hsbl'},
        {header: '备注'            ,dataIndex: 'bz'},
        {header: '商品类型'            ,dataIndex: 'splx',renderer:renderSplx},
        {header: '是否选用'         ,dataIndex: 'xybj',renderer:renderXybj}
    ]);


    // grid start
    var grid = new Ext.grid.GridPanel({
    	id:'grid',
        anchor:'99%',
        loadMask: true,
        height:410,
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
	  	var sjbm;
	  	if("" == checked_node)
	  	{
	  		sjbm = "";
	  	}else
	  	{
	  		sjbm = checked_node.id;
	  	}
      	Ext.apply(this.baseParams,{
          splbbm:sjbm
        });
     });
	
 store.load({params:{start:0, limit:20}}); //加载数据 	


 
    var form = new Ext.form.FormPanel({
        title: '商品类别信息',
        // baseCls:"x-plain,y-plain",
        id : 'form',
        region: 'east',
        frame: true,
        border:false,
        width:'100%',
        height:550,
       	items:grid
    });
    
    
    var panl = new Ext.Panel({
		//title:'商品信息',
    	baseCls:"x-plain,y-plain",
		layout:'column',
		items:[{columnWidth:.25,baseCls:"x-plain,y-plain",items:shangPinPanl},
			   {columnWidth:.75,baseCls:"x-plain,y-plain",items:form}]
	});	 	
    
    
	var tb = new Ext.Toolbar({
					baseCls:"x-plain,y-plain",
					//frame: true,
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
							}]
				});	 
	
				
	
      // layout start
    var viewport = new Ext.Viewport({
      //  layout: 'border',
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


function openWindow(obj)
{
		var fieldset = new Ext.form.FieldSet({
		title:'商品信息',
		labelAlign: 'right',
        labelWidth: 60,
        buttonAlign: 'center',
        items: [ {layout:'column',
                  items: 
                  [
                  	{columnWidth:.5,layout: 'form', defaults: {width: 180,xtype:'textfield'}, items:{fieldLabel: '商品类别',name:'sjmc',id:'sjmc'}}
                   ,{columnWidth:.5,layout: 'form', defaults: {width: 180,xtype:'textfield'}, items:{fieldLabel: '商品名称',allowBlank: false,maxLength: 200,name: 'spmc',id:'spmc'}}
                  ]
                 }
                 ,{layout:'column',
                  items: 
                  [
                  	{columnWidth:.5,layout: 'form', defaults: {width: 180}, 
                  	items:{fieldLabel: '基本单位',name: 'jbdwText',hiddenName: 'jbdw', xtype: 'combo',id:'jbdwcombo'
        					, store: new Ext.data.SimpleStore({fields: ['value','text'],data: [['0','吨'],['1','袋']]})
                			, mode: 'local',triggerAction: 'all',valueField: 'value',displayField: 'text'}
                	}
                   ,{columnWidth:.5,layout: 'form', defaults: {width: 180,xtype:'textfield'}, items:{fieldLabel: '商品规格',maxLength: 20,name: 'gg',id:'gg'}}
                  ]
                 }
                ,{layout:'column',
                  items: 
                  [
                  	{columnWidth:.5,layout: 'form', defaults: {width: 180}, 
                  	 items:{ fieldLabel: '换算比率',xtype:"numberfield",
	        			allowNegative:false,//不能输入负数
	        			allowDecimals:true,//不能输入小数点
	        			decimalPrecision:2,//保留小数点后4位，默认两位
	        			//minValue:0,//输入范围
	        			//maxValue:1,//输入范围
	        			maskRe:/\d/,
	        			regexText:"该输入项必须是数字",maxLength:8,name: 'hsbl',id:'hsbl'}}
                  ]
                 },
                 {layout:'column',
                  items: 
                  [
                   {columnWidth:.5,layout: 'form', defaults: {width: 180,xtype:'textfield'}, 
                   	 items:{fieldLabel: '商品类型',name:'splxradio' ,id:'splxradio' ,xtype: 'radiogroup',width: 180
    	    	  	 		 ,items:[{boxLabel:'散装',inputValue:'0',name:'splx'},{boxLabel:'袋装',inputValue:'1',name:'splx',checked:true}]}}
    	    	  	 ,{columnWidth:.5,layout: 'form', defaults: {width: 180,xtype:'textfield'}, 
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
                ,{xtype:'hidden',name: 'sjbm',id:'sjbm'},{xtype:'hidden',name: 'spbm',id:'spbm'}
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
 	 title:'商品新增',
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
		Ext.getCmp('sjmc').setValue(checked_node.text);
 		Ext.getCmp('sjbm').setValue(checked_node.id);
 		Ext.getCmp('save').getText('保存');
 		
 		Ext.getCmp('sjmc').removeClass('noReadOnly');
  		Ext.getCmp('sjmc').addClass('readOnly');
	}else
	{
		Ext.getCmp('sjmc').setValue(obj.get("sjmc"));
 		Ext.getCmp('sjbm').setValue(obj.get("sjbm"));
 		Ext.getCmp('spmc').setValue(obj.get("spmc"));
 		Ext.getCmp('spbm').setValue(obj.get("spbm"));
 		Ext.getCmp('jbdwcombo').setValue(obj.get("jbdw"));
 		Ext.getCmp('gg').setValue(obj.get("gg"));
 		Ext.getCmp('hsbl').setValue(obj.get("hsbl"));
 		Ext.getCmp('bz').setValue(obj.get("bz"));
 		Ext.getCmp('xybjradio').setValue(obj.get("xybj"));
 		Ext.getCmp('splxradio').setValue(obj.get("splx"));
 		Ext.getCmp('save').setText('修改');
 		
 		Ext.getCmp('sjmc').removeClass('noReadOnly');
  		Ext.getCmp('sjmc').addClass('readOnly');
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
			url: 'ShangPinXX!saveOrChange.action',
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
 		Ext.MessageBox.alert('错误!!!','请选择新增商品的所属类别！！');
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
					spbmStr += selections[i].get("spbm")+","
				}
				
			   // 调用ajax 从后台获取列名
				Ext.Ajax.request
				({    
					url:'ShangPinXX!deleData.action', 
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
	if(Ext.getCmp('spmc').getValue()=="")
	{
		Ext.Msg.alert("消息","商品名称不能为空！！");
		return false;
	}
	if(Ext.getCmp('jbdwcombo').getValue()=="")
	{
		Ext.Msg.alert("消息","基本单位不能为空");
		return false;
	}
	return true;
}
	 
function treeBeforeload(node) 
{
	if (!node.isExpanded()) 
 	{
		var tree = Ext.getCmp('shangPinPanl');
		var treeid = node.id;
		var url = 'getShangPinTree!getTree.action?treeClick=true&id='+treeid;
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



function renderSplx(value) 
{
  	if (value == '0') {
		return "<span style='color:red;font-weight:bold;'>散装</span>";
	} else {
    	return "<span style='color:green;font-weight:bold;'>袋装</span>";
    }
}


function renderJbdw(value) 
{
  	if (value == '0') {
		return "<span style='color:red;font-weight:bold;'>吨</span>";
	} else {
    	return "<span style='color:green;font-weight:bold;'>袋</span>";
    }
}
	
	
	 