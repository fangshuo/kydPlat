
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
							}
							,'-',
							{
								text : "新增",
								iconCls : "add",
								id : "add",
								handler : function() {
									addBgd();
								},
								scope : this
							},'-',
							{
								text : "打印",
								iconCls : "reset",
								id : "havedata",
								handler : function() {
									Print();
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
							}
							]
				});	
	
				
				
				
	// 客户名称下拉框			
//	 var khCombo = new Ext.form.ComboBox({
//        id:'khCombo',
//        width:220,
//        name: 'khmcText',
//        fieldLabel: '客户名称',
//		hiddenName: 'khbm',
//		xtype: 'combo',
//		store: new Ext.data.Store({
//							 autoLoad:false,
//							 proxy: new Ext.data.HttpProxy({url:'ComboboxAction!queryKhxx.action'}),
//							reader: new Ext.data.JsonReader({
//							  root:'combobox',
//   							fields:['value','text']}), 
//						remoteSort: true  }) ,
//		emptyText: '请选择',  
//		mode: 'remote',
//		triggerAction: 'all',
//		valueField: 'value',
//		displayField: 'text',
//		readOnly: true
//    });			
	
    
    
		
	      /**
       * 品种下拉框
       */			
	 var pzCombo = new Ext.form.ComboBox({
        id:'pzCombo',
        width:220,
        name: 'pzText',
        fieldLabel: '品种类型',
		hiddenName: 'pzdm',
		xtype: 'combo',
		store: new Ext.data.SimpleStore({
                          fields: ['value','text'],
                          data: [['%','全部'],['01','普通硅酸盐水泥'],['02','复合硅酸盐水泥']]}),
		emptyText: '请选择',  
		mode: 'local',
		triggerAction: 'all',
		valueField: 'value',
		displayField: 'text',
		readOnly: true
    });		
     
    
    
	/**
	 * 查询条件fieldset框
	 */			
	var fieldset = new Ext.form.FieldSet({
		title:'查询条件',
		height:100,
		border: true,
       	labelWidth: 100,
       	labelAlign: 'right',
        buttonAlign: 'center',
        items: [
                  {layout:'column',
                  items: 
                  [
                  	{columnWidth:1,layout: 'form',  items:pzCombo}
//                   ,{columnWidth:.5,layout: 'form',  items:khCombo}
                  ]
                 }
                 ,{layout:'column',
                  items: 
                  [
                  	{columnWidth:.5,layout: 'form'
                  	,items:{fieldLabel : '填表日期起'	,id : 'tbrqq',xtype:"datefield",format:"Ymd",width: 220,emptyText: '请选择日期 ...' ,allowBlank:false ,name : 'ssrqq'}
           			}
                   ,{columnWidth:.5,layout: 'form'
                   	,items:{fieldLabel : '填表日期止'	,id : 'tbrqz',xtype:"datefield",format:"Ymd",width: 220,emptyText: '请选择日期 ...' ,allowBlank:false ,name : 'ssrqz'}
                   	}
                  ]
                 }
                 
               ]        
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
	  	{name: 'NO' 			,mapping:'NO'				,type: 'string'},
	  	{name: 'ghdw' 			,mapping:'ghdw'				,type: 'string'},
	  	{name: 'ghdw_dm' 		,mapping:'ghdw_dm'			,type: 'string'},
        {name: 'ghrq' 			,mapping:'ghrq'				,type: 'string'},
        {name: 'pz' 			,mapping:'pz'				,type: 'string'},
        {name: 'pz_dm' 			,mapping:'pz_dm'			,type: 'string'},
        {name: 'ccbh' 		    ,mapping:'ccbh'			    ,type: 'string'},
        {name: 'slsc' 			,mapping:'slsc'				,type: 'string'},
        {name: 'xy' 		    ,mapping:'xy'				,type: 'string'},
        {name: 'ghsl' 		    ,mapping:'ghsl'				,type: 'string'},
        {name: 'cyr' 			,mapping:'cyr'				,type: 'string'},
	  	{name: 'tbr' 			,mapping:'tbr'				,type: 'string'},
        {name: 'tbrq' 			,mapping:'tbrq'				,type: 'string'},
        {name: 'flag' 			,mapping:'flag'				,type: 'string'}
        
    ]);

   var store = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy
        					({url:'JianYanbbdTWO!queryJybgd.action',
							    failure:function()
								{	
									Ext.Msg.alert('错误提示','加载数据出错!');
								}
        					}),
        	reader: new Ext.data.JsonReader({
            totalProperty: 'totalCount',
            root: 'tableList'
        },splbRecord),
        remoteSort: false
    });
 
    
 
     var columns = new Ext.grid.ColumnModel([  
    	new Ext.grid.RowNumberer(), //行号列
    	{header: 'NO'    		,dataIndex: 'NO'},
        {header: '购货单位'    	,dataIndex: 'ghdw'},
        {header: '购货日期'    	,dataIndex: 'ghrq'},
        {header: '水泥品种' 	 	,dataIndex: 'pz'},
        {header: '出厂编号'   	,dataIndex: 'ccbh'},
        {header: '熟料生产'       ,dataIndex: 'slsc'},
        {header: '旋窑'      	,dataIndex: 'xy'},
        {header: '购入数量'      ,dataIndex: 'ghsl'},
        {header: '承运人'      	,dataIndex: 'cyr'},
        {header: '填表人'      	,dataIndex: 'tbr'},
        {header: '填表日期'       ,dataIndex: 'tbrq'},
        {header: '28天强度'       ,dataIndex: 'flag',   hidden:'true'}
    ]);



    var grid = new Ext.grid.EditorGridPanel({
    	id:'grid',
        loadMask: true,
        height:360,
        store: store,
        cm: columns,
        //每次只能选择一行new Ext.grid.RowSelectionModel({singleSelect:true}),，如果sm：checkbox 则可以多选
        sm:new Ext.grid.RowSelectionModel(),
           // 自动计算表格每列的宽度
        viewConfig: {
            forceFit: true
        },
        bbar: new Ext.PagingToolbar({
            pageSize: 10,
            store: store,
            displayInfo: true,
			displayMsg: '显示第 {0} 条到 {1} 条记录，一共 {2} 条', 
			emptyMsg: "没有记录" 
        })
    });
    

    
      store.on('beforeload', function() {
      	Ext.apply(this.baseParams,{
          pzdm:Ext.getCmp('pzCombo').getValue(),
          //khbm:Ext.getCmp('khCombo').getValue(),
          tbrqq:Ext.getCmp('tbrqq').getValue().format('Ymd'),
          tbrqz:Ext.getCmp('tbrqz').getValue().format('Ymd')
        });
     });
    
    
    
    
    
       /**
        * 
        */
       var fieldset2 = new Ext.form.FieldSet({
		title:'详细信息',
		region: 'center',
		autoHeight:true, 
		height:280,
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


function queryData()
{
	if(Ext.getCmp('pzCombo').getValue() == "")
	{
		Ext.MessageBox.alert('错误','请选择查询条件品种类型！！！');
		return;
	}
	
//	if(Ext.getCmp('khCombo').getValue() == "")
//	{
//		Ext.MessageBox.alert('错误','请选择查询条件客户名称！！！');
//		return;
//	}
	
	if(Ext.getCmp('tbrqq').getValue() == "")
	{
		Ext.MessageBox.alert('错误','请选择查询条件填表日期起！！！');
		return;
	}
	
	if(Ext.getCmp('tbrqz').getValue() == "")
	{
		Ext.MessageBox.alert('错误','请选择查询条件填表日期止！！！');
		return;
	}
	
	 Ext.getCmp('grid').getStore().load({params:{start:0, limit:10}},{
		    	callback: function(records, options, success)
				{
					if(0 ==  Ext.getCmp('grid').getStore().getCount())
					{
						Ext.MessageBox.alert('消息','没有您要查询的信息！！！');
					}
				}
			})
}


/**
 * 新增检验报告单
 */
function addBgd()
{
    var selections = Ext.getCmp('grid').getSelectionModel().getSelections();
	if(selections.length!=1)
	{
		Ext.Msg.alert('错误','请选择一条记录进行打印');
		return;
	}
	var record = selections[0];
	var NO = record.get("NO");
	var flag = record.get("flag");
	if(flag == '2'){
		Ext.Msg.alert('提醒','已新增过28天强度补报单');
		return;		
	}
	var url = "JianYanbbdTWO!Addbbd.action?NO="+NO;
	openMaxWindow(url);
}


// open新页面可以抽出放在公共js中
function openMaxWindow(url) 
{
	var winheight = screen.availHeight - 55;
	var winwidth = screen.availWidth - 10;
	var param = "height="
			+ winheight
			+ ",width="
			+ winwidth
			+ ",top=0,left=0,toolbar=no,menubar=no,scrollbars=yes,resizable=no,location=no,status=no,titlebar=no";
	 return window.open(url, "", param);
}


function Print()
{
	
	var selections = Ext.getCmp('grid').getSelectionModel().getSelections();
	if(selections.length!=1)
	{
		Ext.Msg.alert('错误','请选择一条记录进行打印');
		return;
	}
	var record = selections[0];
	var NO = record.get("NO");
	
	var url = "JianYanbbdTWO!addPrint.action?NO="+NO;
	var sonWin = openMaxWindow(url);
	
}



